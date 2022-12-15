export function currentTime() {
    var date = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Africa/Tunis" })
    );
    var minutes = date.getMinutes();
    let current_time;
    if (minutes < 10) {
        current_time =
            date.getHours() +
            ":" +
            (date.getMinutes() < 10 ? "0" : "") +
            date.getMinutes();
    } else {
        current_time = date.getHours() + ":" + date.getMinutes();
    }
    return current_time;
}
export function currentDate() {
    var date = new Date();
    var current_date =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        (date.getDate() < 10 ? "0" : "") +
        date.getDate();
    var date_time = current_date;
    return date_time;
}
export const fetchData = (url, method, body = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            let requestOptions = {};
            if (method === "GET" || method === "DELETE") {
                requestOptions = {
                    method: method,
                    headers: myHeaders,
                    redirect: "follow",
                };
            } else {
                const raw = JSON.stringify(body);
                requestOptions = {
                    method: method,
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                };
            }
            const response = await fetch(
                "http://192.168.0.204:5000" + url,
                requestOptions
            );
            resolve(await response.json());
        } catch (err) {
            resolve({ success: false, error: err });
        }
    });
};
export const fetchPHP = (url, body = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let myHeaders = new Headers();
            myHeaders.append(
                "Content-Type",
                "application/x-www-form-urlencoded; charset=UTF-8"
            );
            let requestOptions = {};
            const raw = Object.entries(body)
                .map(([k, v]) => {
                    return k + "=" + v;
                })
                .join("&");
            requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };
            const response = await fetch(
                "http://192.168.0.204:7681" + url,
                requestOptions
            );
            resolve(await response.text());
        } catch (err) {
            resolve({ success: false, error: err });
        }
    });
};
