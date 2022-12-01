const {
    DATABASES,
    handleError,
    getPoste,
    getDebutPoste,
    getDate,
    dateToString,
} = require("../utils");
const async = require("async");
const success = true;

const connect = (req, res) => {
    try {
        const { matricule, password } = req.body;
        const { machine } = req.params;
        let query = `SELECT COUNT(id) AS id FROM users WHERE matricule = ? AND password = ?`;
        async.series([
            (callback) => {
                DATABASES.cnp.query(
                    query,
                    [matricule, password],
                    (error, rows) => {
                        if (handleError(res, error)) {
                            if (rows[0].id) {
                                callback();
                            } else {
                                res.json({
                                    success,
                                    data: { connected: false },
                                });
                            }
                        }
                    }
                );
            },
            (callback) => {
                query = `UPDATE users SET machine = '-' WHERE machine = ?`;
                DATABASES.cnp.query(query, [machine], (error) => {
                    if (handleError(res, error)) {
                        callback();
                    }
                });
            },
            () => {
                query = `UPDATE users SET machine = ? WHERE matricule = ?`;
                DATABASES.cnp.query(query, [machine, matricule], (error) => {
                    if (handleError(res, error)) {
                        res.json({ success, data: { connected: true } });
                    }
                });
            },
        ]);
    } catch (err) {
        res.json({ success: false, error: err.toString() });
    }
};

const connectQuality = (req, res) => {
    try {
        const { matricule } = req.body;
        let query = `SELECT COUNT(id) AS id FROM quality_team WHERE matricule = ?`;
        DATABASES.cnp.query(query, [matricule], (error, rows) => {
            if (handleError(res, error)) {
                if (rows[0].id) {
                    res.json({
                        success,
                        data: { connected: true },
                    });
                } else {
                    res.json({
                        success,
                        data: { connected: false },
                    });
                }
            }
        });
    } catch (err) {
        res.json({ success: false, error: err.toString() });
    }
};

const disconnect = (req, res) => {
    const { machine } = req.params;
    let query = `UPDATE users SET machine = '-' WHERE machine = ?`;
    DATABASES.cnp.query(query, [machine], (error) => {
        if (handleError(res, error)) {
            res.json({ success, data: { disconnected: true } });
        }
    });
};

const checkUser = (req, res) => {
    const { machine } = req.params;
    const QUERY = `SELECT COUNT(id) AS id FROM users WHERE machine = ?`;
    DATABASES.cnp.query(QUERY, [machine], (error, rows) => {
        if (handleError(res, error)) {
            res.json({ success, data: { connected: !!rows[0].id } });
        }
    });
};

const navbar = (req, res) => {
    const { machine } = req.params;
    let data = {
        of: "-",
        qp: 0,
        operateur: "-",
        poste: getPoste(true),
    };
    if (
        [
            "macchi1",
            "macchi2",
            "varex",
            "miraflex",
            "complexage",
            "decoupage",
        ].includes(machine)
    ) {
        query = `SELECT of.N_OF AS of, IFNULL(SUM(historique.consommation1) + SUM(historique.consommation2) + SUM(historique.consommation3) - SUM(historique.qt_dechets) - SUM(historique.qt_non_conf), 0) AS qp FROM of INNER JOIN historique ON of.N_OF = historique.of WHERE of.enprod = 1`;
        async.series([
            (callback) => {
                DATABASES[machine].query(query, (error, rows) => {
                    if (handleError(res, error)) {
                        data.of = rows[0].of;
                        data.qp = rows[0].qp.toFixed(2);
                        callback();
                    }
                });
            },
            () => {
                query = `SELECT CONCAT(prenom, ' ', nom) AS name FROM users WHERE machine = ?`;
                DATABASES.cnp.query(query, [machine], (error, rows) => {
                    if (handleError(res, error)) {
                        if (rows.length) {
                            data.operateur = rows[0].name;
                        }
                        res.json({ success, data });
                    }
                });
            },
        ]);
    } else {
        res.json({ success: false, error: "Section n'est pas fini" });
    }
};

const resultatInstantanee = (req, res) => {
    const { machine } = req.params;
    let data = {
        debit: 0,
        qp: 0,
        tf: "00:00:00",
        ta: "00:00:00",
        trs: 0,
        tq: 0,
        td: 0,
        tp: 0,
        arret: [],
        dechets: [],
    };
    if (
        [
            "macchi1",
            "macchi2",
            "varex",
            "miraflex",
            "complexage",
            "decoupage",
        ].includes(machine)
    ) {
        let query = `SELECT debit FROM realtime WHERE machine = ?`;
        async.series([
            (callback) => {
                DATABASES.cnp.query(query, [machine], (error, rows) => {
                    if (handleError(res, error)) {
                        if (rows.length) {
                            data.debit = rows[0].debit;
                        }
                        callback();
                    }
                });
            },
            (callback) => {
                query = `SELECT IFNULL(SUM(consommation1) + SUM(consommation2) + SUM(consommation3) - SUM(qt_dechets) - SUM(qt_non_conf), 0) AS qp FROM historique WHERE of = (SELECT N_OF FROM of WHERE enprod = 1)`;
                DATABASES[machine].query(query, (error, rows) => {
                    if (handleError(res, error)) {
                        data.qp = rows[0].qp;
                        callback();
                    }
                });
            },
            (callback) => {
                query = `SELECT trs, tq, d AS td, tp FROM historique WHERE datte = (SELECT MAX(datte) FROM historique WHERE datte >= '${getDebutPoste()}')`;
                DATABASES[machine].query(query, (error, rows) => {
                    if (handleError(res, error)) {
                        if (rows.length) {
                            data.trs = rows[0].trs;
                            data.tq = rows[0].tq;
                            data.td = rows[0].td;
                            data.tp = rows[0].tp;
                        }
                        callback();
                    }
                });
            },
            (callback) => {
                query = `SELECT IFNULL(SEC_TO_TIME(SUM(TIME_TO_SEC(duree)) + (SELECT IFNULL(SEC_TO_TIME(SUM(TIME_TO_SEC(duree)) - TIME_TO_SEC(TIMEDIFF('${getDebutPoste()}', datte))), "00:00:00") FROM arret WHERE ADDTIME(datte, duree) > '${getDebutPoste()}' AND datte < '${getDebutPoste()}')), '00:00:00') AS ta, IFNULL(SUBTIME(SEC_TO_TIME(TIMESTAMPDIFF(SECOND, '${getDebutPoste()}', '${getDate(
                    "y-m-d h:i:s"
                )}')), SEC_TO_TIME(IFNULL(SUM(TIME_TO_SEC(duree)), 0) + (SELECT IFNULL(SEC_TO_TIME(SUM(TIME_TO_SEC(duree)) - TIME_TO_SEC(TIMEDIFF('${getDebutPoste()}', datte))), "00:00:00") FROM arret WHERE ADDTIME(datte, duree) > '${getDebutPoste()}' AND datte < '${getDebutPoste()}'))), '00:00:00') AS tf FROM arret WHERE datte >= '${getDebutPoste()}'`;
                DATABASES[machine].query(query, (error, rows) => {
                    if (handleError(res, error)) {
                        data.ta = rows[0].ta.split(".")[0];
                        data.tf = rows[0].tf.split(".")[0];
                        callback();
                    }
                });
            },
            (callback) => {
                query = `SELECT datte, duree FROM arret WHERE queue > 0`;
                DATABASES[machine].query(query, (error, rows) => {
                    if (handleError(res, error)) {
                        for (const arret of rows) {
                            data.arret.push({
                                ...arret,
                                datte: dateToString(arret.datte),
                            });
                        }
                        callback();
                    }
                });
            },
            () => {
                query = `SELECT datte, quantite, type FROM dechets WHERE valide = 0`;
                DATABASES[machine].query(query, (error, rows) => {
                    if (handleError(res, error)) {
                        for (const dechet of rows) {
                            data.dechets.push({
                                ...dechet,
                                datte: dateToString(dechet.datte),
                            });
                        }
                        res.json({ success, data });
                    }
                });
            },
        ]);
    }
};

const saveArret = (req, res) => {
    try {
        const { cause } = req.body;
        const { machine, datte } = req.params;
        const QUERY = `UPDATE arret SET cause = ?, queue = 0 WHERE datte = ?`;
        DATABASES[machine].query(QUERY, [cause, datte], (error) => {
            if (handleError(res, error)) {
                res.json({ success });
            }
        });
    } catch (err) {
        res.json({ success: false, error: err.toString() });
    }
};

const validerDechet = (req, res) => {
    try {
        const { machine, datte } = req.params;
        const QUERY = `UPDATE dechets SET valide = 1 WHERE datte = ?`;
        DATABASES[machine].query(QUERY, [datte], (error) => {
            if (handleError(res, error)) {
                res.json({ success });
            }
        });
    } catch (err) {
        res.json({ success: false, error: err.toString() });
    }
};

const saveNonConforme = (req, res) => {
    try {
        const { machine } = req.params;
        const { quantite, motif } = req.body;
        let query = `SELECT COUNT(id) AS id FROM historique WHERE datte = '${getDate(
            "y-m-d h:00:00"
        )}'`;
        let insert = true,
            user = "Personne";
        async.series([
            (callback) => {
                DATABASES[machine].query(query, (error, rows) => {
                    if (handleError(res, error)) {
                        if (rows[0].id) {
                            insert = false;
                        }
                        callback();
                    }
                });
            },
            (callback) => {
                if (insert) {
                    query = `INSERT INTO historique(datte, poste, of, consommation1, consommation2, consommation3, qt_dechets, qt_non_conf, trs, tq, tp, d, td, tp_moy, num) VALUES('${getDate(
                        "y-m-d h:00:00"
                    )}', '${getPoste(
                        true
                    )}', IFNULL((SELECT N_OF FROM of WHERE enprod = 1), 0), 0, 0, 0, 0, ?, 0, 0, 0, 0, 0, 0, 0)`;
                } else {
                    query = `UPDATE historique SET qt_non_conf = ? WHERE datte = '${getDate(
                        "y-m-d h:00:00"
                    )}'`;
                }
                DATABASES[machine].query(query, [quantite], (error) => {
                    if (handleError(res, error)) {
                        callback();
                    }
                });
            },
            (callback) => {
                query = `SELECT CONCAT(prenom, ' ', nom) AS name FROM users WHERE machine = ?`;
                DATABASES.cnp.query(query, [machine], (error, rows) => {
                    if (handleError(res, error)) {
                        if (rows.length) {
                            user = rows[0].name;
                        }
                        callback();
                    }
                });
            },
            () => {
                query = `INSERT INTO non_conf(datte, poste, quantite, motif, operateur) VALUES('${getDate(
                    "y-m-d h:i:s"
                )}', '${getPoste(true)}', ?, ?, '${user}')`;
                DATABASES[machine].query(query, [quantite, motif], (error) => {
                    if (handleError(res, error)) {
                        res.json({ success });
                    }
                });
            },
        ]);
    } catch (err) {
        res.json({ success: false, error: err.toString() });
    }
};

const saveDechet = (req, res) => {
    try {
        const { machine } = req.params;
        const { quantite, type } = req.body;
        let query = `SELECT COUNT(id) AS id FROM historique WHERE datte = '${getDate(
            "y-m-d h:00:00"
        )}'`;
        let insert = true,
            user = "Personne";
        async.series([
            (callback) => {
                DATABASES[machine].query(query, (error, rows) => {
                    if (handleError(res, error)) {
                        if (rows[0].id) {
                            insert = false;
                        }
                        callback();
                    }
                });
            },
            (callback) => {
                if (insert) {
                    query = `INSERT INTO historique(datte, poste, of, consommation1, consommation2, consommation3, qt_dechets, qt_non_conf, trs, tq, tp, d, td, tp_moy, num) VALUES('${getDate(
                        "y-m-d h:00:00"
                    )}', '${getPoste(
                        true
                    )}', IFNULL((SELECT N_OF FROM of WHERE enprod = 1), 0), 0, 0, 0, ?, 0, 0, 0, 0, 0, 0, 0, 0)`;
                } else {
                    query = `UPDATE historique SET qt_dechets = ? WHERE datte = '${getDate(
                        "y-m-d h:00:00"
                    )}'`;
                }
                DATABASES[machine].query(query, [quantite], (error) => {
                    if (handleError(res, error)) {
                        callback();
                    }
                });
            },
            (callback) => {
                query = `SELECT CONCAT(prenom, ' ', nom) AS name FROM users WHERE machine = ?`;
                DATABASES.cnp.query(query, [machine], (error, rows) => {
                    if (handleError(res, error)) {
                        if (rows.length) {
                            user = rows[0].name;
                        }
                        callback();
                    }
                });
            },
            () => {
                query = `INSERT INTO dechets(datte, poste, quantite, type, operateur, valide) VALUES('${getDate(
                    "y-m-d h:i:s"
                )}', '${getPoste(true)}', ?, ?, '${user}', 0)`;
                DATABASES[machine].query(query, [quantite, type], (error) => {
                    if (handleError(res, error)) {
                        res.json({ success });
                    }
                });
            },
        ]);
    } catch (err) {
        res.json({ success: false, error: err.toString() });
    }
};

const deleteDechet = (req, res) => {
    try {
        const { machine, datte } = req.params;
        const QUERY = `DELETE FROM dechets WHERE datte = ?`;
        DATABASES[machine].query(QUERY, [datte], (error) => {
            if (handleError(res, error)) {
                res.json({ success });
            }
        });
    } catch (err) {
        res.json({ success: false, error: err.toString() });
    }
};

const historique = (req, res) => {
    const { machine } = req.params;
    if (
        [
            "macchi1",
            "macchi2",
            "varex",
            "miraflex",
            "complexage",
            "decoupage",
        ].includes(machine)
    ) {
        let data = [];
        const QUERY = `SELECT SUBSTRING(datte, 1, 10) AS date, SUBSTRING(datte, 11) AS heure, SUM(consommation1) + SUM(consommation2) + SUM(consommation3) - SUM(qt_dechets) - SUM(qt_non_conf) AS qp, SUM(qt_dechets) AS qdech, SUM(qt_non_conf) AS qnc, AVG(trs) AS trs, AVG(tq) AS tq, AVG(d) AS td, AVG(tp) AS tp FROM historique WHERE datte >= DATE_SUB('${getDate(
            "y-m-d"
        )}', INTERVAL 7 DAY) GROUP BY datte`;
        DATABASES[machine].query(QUERY, (error, rows) => {
            if (handleError(res, error)) {
                data = rows;
                res.json({ success, data });
            }
        });
    } else {
        res.json({ success: false, error: "Section n'est pas fini" });
    }
};

module.exports = {
    connect,
    connectQuality,
    disconnect,
    checkUser,
    navbar,
    resultatInstantanee,
    historique,
    saveArret,
    validerDechet,
    saveDechet,
    deleteDechet,
    saveNonConforme,
};
