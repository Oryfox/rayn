import router from "../router";
import Cookies from "js-cookie";

let baseurl = import.meta.env.VITE_HOST;

async function get(uri) {
    return fetch(baseurl + uri).catch(error => console.log(error))
}

async function post(uri, body) {
    if (Cookies.get("token") === undefined) {
        router.push("/login")
    } else
        return fetch(baseurl + uri, {
            headers: {
                "token": Cookies.get("token"),
                "Content-Type": "application/json"
            },
            method: "POST",
            body: body
        })
}

async function put(uri, body) {
    if (Cookies.get("token") === undefined) {
        router.push("/login")
    } else
        return fetch(baseurl + uri, {
            headers: {
                "token": Cookies.get("token"),
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: body
        })
}


async function hDelete(uri) {
    if (Cookies.get("token") === undefined) {
        router.push("/login")
    } else
        return fetch(baseurl + uri, {
            headers: {
                "token": Cookies.get("token")
            },
            method: "DELETE"
        })
}

export default {
    getRecords() {
        return get("records")
    },
    getRecordsSorted(sort) {
        return get("record?sort=" + sort)
    },
    getRecord(id) {
        return get("record?id=" + id)
    },
    postRecord(record) {
        return post("record", JSON.stringify(record))
    },
    putRecord(record) {
        return put("record", JSON.stringify(record))
    },
    deleteRecord(id) {
        return hDelete("record?id=" + id)
    },
    login(login) {
        return fetch(baseurl + "user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(login)
        })
    },
    register(register) {
        return fetch(baseurl + "user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(register)
        })
    },
    logout() {
        return put("user/logout", null)
    },
    getAutoRecord(artist, title) {
        return get("record/auto?artist=" + encodeURI(artist) + "&title=" + encodeURI(title))
    },
    getUser() {
        return get("user");
    },
    getArtists() {
        return get("artist");
    },
    getRecordsForArtist(artist) {
        return get("artist/" + encodeURI(artist));
    },
    postUserImage(formdata) {
        if (Cookies.get("token") === undefined) {
            router.push("/login")
        } else
            return fetch(baseurl + "user/image?token=" + Cookies.get("token"), {
                headers: {
                    "token": Cookies.get("token"),
                },
                method: "POST",
                body: formdata
            })
    },
    postRecordImage(id, formdata) {
        if (Cookies.get("token") === undefined) {
            router.push("/login")
        } else
            return fetch(baseurl + "record/image?token=" + Cookies.get("token") + "&id=" + id, {
                headers: {
                    "token": Cookies.get("token"),
                },
                method: "POST",
                body: formdata
            })
    },
    deleteUserImage() {
        return hDelete("user/image");
    },
    updateDisplayName(name) {
        return put("user/name", name);
    },
    deleteRecordImage(id, none) {
        return hDelete("record/image?id=" + id + "&none=" + none);
    },
    getApiVersion() {
        return fetch(baseurl + "user/version")
    },
    logoutAll() {
        return put("user/logout/all", null)
    },
    getCount() {
        return get("record/count");
    },
    youtubeSearch(query) {
        return fetch("https://yt.oryfox.de/?query=" + encodeURI(query));
    }
}