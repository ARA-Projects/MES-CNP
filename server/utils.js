const mysql = require("mysql");

process.env.TZ = "Tunis/Africa";

const DATABASE_PASSWORD = "";
const DATABASES = {
    cnp: mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: DATABASE_PASSWORD,
        database: "cnp",
    }),
    macchi1: mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: DATABASE_PASSWORD,
        database: "macchi_1",
    }),
    macchi2: mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: DATABASE_PASSWORD,
        database: "macchi_2",
    }),
    varex: mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: DATABASE_PASSWORD,
        database: "varex",
    }),
    miraflex: mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: DATABASE_PASSWORD,
        database: "miraflex",
    }),
    complexage: mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: DATABASE_PASSWORD,
        database: "complexage",
    }),
    decoupage: mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: DATABASE_PASSWORD,
        database: "decoupage",
    }),
    consommation: mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: DATABASE_PASSWORD,
        database: "consommation",
    }),
    sage: mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: DATABASE_PASSWORD,
        database: "sage",
    }),
};

const getDate = (format, add = 0) => {
    let yearsToAdd = 0,
        monthsToAdd = 0,
        daysToAdd = 0,
        hoursToAdd = 0,
        minutesToAdd = 0,
        secondsToAdd = 0;
    if (add > 0) {
        yearsToAdd = ~~(add / 31557600);
        monthsToAdd = ~~((add - yearsToAdd) / 2629800);
        daysToAdd = ~~((add - yearsToAdd - monthsToAdd) / 86400);
        hoursToAdd = ~~((add - daysToAdd - yearsToAdd - monthsToAdd) / 3600);
        minutesToAdd = ~~(
            (add - hoursToAdd - daysToAdd - yearsToAdd - monthsToAdd) /
            60
        );
        secondsToAdd =
            add -
            hoursToAdd -
            daysToAdd -
            yearsToAdd -
            monthsToAdd -
            minutesToAdd;
    } else if (add < 0) {
        yearsToAdd = ~~(add / 31557600);
        monthsToAdd = ~~((add + yearsToAdd) / 2629800);
        daysToAdd = ~~((add + yearsToAdd + monthsToAdd) / 86400);
        hoursToAdd = ~~((add + daysToAdd + yearsToAdd + monthsToAdd) / 3600);
        minutesToAdd = ~~(
            (add - hoursToAdd + daysToAdd + yearsToAdd + monthsToAdd) /
            60
        );
        secondsToAdd =
            add +
            hoursToAdd +
            daysToAdd +
            yearsToAdd +
            monthsToAdd +
            minutesToAdd;
    }
    const date = new Date();
    const year = date.getFullYear() + yearsToAdd;
    const month = date.getMonth() + 1 + monthsToAdd;
    const day = date.getDate() + daysToAdd;
    const hour = date.getHours() + hoursToAdd;
    const minute = date.getMinutes() + minutesToAdd;
    const second = date.getSeconds() + secondsToAdd;
    let formattedDate = format.replace("y", year);
    formattedDate = formattedDate.replace("m", twoNumbers(month));
    formattedDate = formattedDate.replace("d", twoNumbers(day));
    formattedDate = formattedDate.replace("h", twoNumbers(hour));
    formattedDate = formattedDate.replace("i", twoNumbers(minute));
    formattedDate = formattedDate.replace("s", twoNumbers(second));
    return formattedDate;
};

const dateToString = (date) => {
    if (date instanceof Date) {
        return `${date.getFullYear()}-${twoNumbers(
            date.getMonth() + 1
        )}-${twoNumbers(date.getDate())} ${twoNumbers(
            date.getHours()
        )}:${twoNumbers(date.getMinutes())}:${twoNumbers(date.getSeconds())}`;
    } else {
        return getDate("y-m-d h:i:s");
    }
};

const twoNumbers = (number) => {
    if (number < 10 && number > -10) {
        return `0${number}`;
    }
    return number;
};

const getPoste = (string = false, current = true) => {
    const postes = ["Matin", "Apres_midi", "Nuit"];
    if (typeof current != "number") {
        if (
            getDate("h:i:s") >= getDate("05:00:00") &&
            getDate("h:i:s") < getDate("13:00:00")
        ) {
            return string ? postes[0] : 0;
        } else if (
            getDate("h:i:s") >= getDate("13:00:00") &&
            getDate("h:i:s") < getDate("21:00:00")
        ) {
            return string ? postes[1] : 1;
        } else if (
            getDate("h:i:s") >= getDate("21:00:00") ||
            getDate("h:i:s") < getDate("05:00:00")
        ) {
            return string ? postes[2] : 2;
        }
    } else {
        return string ? postes[current] : current;
    }
};

const getDebutPoste = () => {
    const getNuit = () => {
        if (getDate("h:i:s") >= getDate("21:00:00")) {
            return getDate("y-m-d 21:00:00");
        } else {
            return getDate("y-m-d 21:00:00", -86400);
        }
    };
    const DEBUTS = [
        getDate("y-m-d 05:00:00"),
        getDate("y-m-d 13:00:00"),
        getNuit(),
    ];
    return DEBUTS[getPoste()];
};

//Mysql Error
const handleError = (res, error) => {
    if (error) {
        res.json({ success: false, error: error.toString() });
        return false;
    }
    return true;
};

const percentage = (number) => {
    if (number < 0) {
        return 0;
    } else if (number > 100) {
        return 100;
    } else {
        return number;
    }
};

const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};

const addTimes = (time1, time2) => {
    let times1 = time1.split(":");
    let times2 = time2.split(":");

    let seconds = Number(times1[2]) + Number(times2[2]),
        minutes = 0,
        hours = 0;
    if (seconds >= 60) {
        minutes = Math.floor(seconds / 60);
        seconds %= 60;
    }

    minutes += Number(times1[1]) + Number(times2[1]);
    if (minutes >= 60) {
        hours = Math.floor(minutes / 60);
        minutes %= 60;
    }

    hours += Number(times1[0]) + Number(times2[0]);
    return (
        twoNumbers(hours) +
        ":" +
        twoNumbers(minutes) +
        ":" +
        twoNumbers(seconds)
    );
};

const fetchData = (url, method, body = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify(body);
            let requestOptions = {};
            if (method === "GET" || method === "DELETE") {
                requestOptions = {
                    method: method,
                    headers: myHeaders,
                    redirect: "follow",
                };
            } else {
                requestOptions = {
                    method: method,
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                };
            }
            const response = await fetch(url, requestOptions);
            resolve(await response.json());
        } catch (err) {
            resolve({ success: false, error: err.toString() });
        }
    });
};

const getPer = (qt, total) => {
    return (qt / total) * 100;
};

module.exports = {
    getDate,
    getPoste,
    getDebutPoste,
    handleError,
    dateToString,
    DATABASES,
    percentage,
    capitalize,
    addTimes,
    fetchData,
    getPer,
};
