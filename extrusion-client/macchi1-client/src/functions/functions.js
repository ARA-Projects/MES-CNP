const ip = "localhost";
//const ip = "192.168.0.204"

export function currentTime() {
    const date = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Africa/Tunis" })
    );
    const minutes = date.getMinutes();
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
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedDay = day < 10 ? "0" + day : day;
    const current_date = `${year}-${formattedMonth}-${formattedDay}`;
    return current_date;
}

export const fetchData = async (url, method, body = {}) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
            method,
            headers: myHeaders,
            redirect: "follow",
        };

        if (method !== "GET" && method !== "DELETE") {
            const raw = JSON.stringify(body);
            requestOptions.body = raw;
        }

        const response = await fetch(`http://${ip}:5000${url}`, requestOptions);
        return await response.json();
    } catch (err) {
        return { success: false, error: err };
    }
};

export const fetchPHP = async (url, body = {}) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8"
        );

        const raw = Object.entries(body)
            .map(
                ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
            )
            .join("&");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        const response = await fetch(`http://${ip}:7681${url}`, requestOptions);
        return await response.text();
    } catch (err) {
        return { success: false, error: err };
    }
};
