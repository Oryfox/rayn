import router from "../router";
import Cookies from "js-cookie";

let baseurl = import.meta.env.VITE_HOST;

async function get(uri) {
    return fetch(baseurl + uri).catch(error => console.log(error))
}

async function post(uri, body) {
    return fetch(baseurl + uri, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: body
    })
}

async function put(uri, body) {
    return fetch(baseurl + uri, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: body
    })
}


async function hDelete(uri) {
    return fetch(baseurl + uri, {
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
    register(register) {
        return fetch(baseurl + "user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(register)
        })
    },
    getAutoRecord(artist, title) {
        return get("record/auto?artist=" + encodeURI(artist) + "&title=" + encodeURI(title))
    },
    getArtists() {
        return get("artist");
    },
    getRecordsForArtist(artist) {
        return get("artist/" + encodeURI(artist));
    },
    postRecordImage(id, formdata) {
        return fetch(baseurl + "record/image?id=" + id, {
            method: "POST",
            body: formdata
        })
    },
    resetRecordImage(id) {
        return fetch(baseurl + "record/image?id=" + id, {
            method: "DELETE"
        })
    },
    deleteRecordImage(id, none) {
        return hDelete("record/image?id=" + id + "&none=" + none);
    },
    getCount() {
        return get("record/count");
    },
    youtubeSearch(query) {
        return fetch("https://yt.oryfox.de/?query=" + encodeURI(query));
    }
}