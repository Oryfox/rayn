const { app } = require('electron');
const express = require('express');
const DataStore = require('nedb');
const path = require('path');
const lastFmSecret = 'abf7626b0ae925ff1ed6ba562b64487b';
const fetch = require('node-fetch');
const storage = app.getPath('userData') + '/storage.json'
const fs = require('fs');
const imagePath = app.getPath('userData') + '/images/'
fs.mkdir(imagePath, { recursive: false }, (err) => { })
async function setup() {
    const app = express();
    app.use(express.json());
    const port = 34356;
    const db = new DataStore({ filename: storage, autoload: true });

    app.get("/records", (req, res) => {
        db.find({}, (err, docs) => {
            res.json(docs);
        })
    })

    app.get('/record/image', (req, res) => {
        const id = req.query.id;
        if (fs.existsSync(imagePath + id)) {
            res.sendFile(imagePath + id);
        } else {
            db.findOne({ _id: id }, (err, rDoc) => {
                fetch('https://ws.audioscrobbler.com/2.0/?method=album.search&api_key=' + lastFmSecret + '&album=' + rDoc.artist + ' ' + rDoc.title + '&format=json')
                    .then(response => response.json())
                    .then(json => {
                        const images = json.results.albummatches.album[0].image
                        const imageUrl = images[images.length - 1]['#text']
                        downloadFile(imageUrl, imagePath + id)
                            .then(() => {
                                res.sendFile(imagePath + id)
                            })
                    })
            })
        }
    })

    const downloadFile = (async (url, path) => {
        const res = await fetch(url);
        const fileStream = fs.createWriteStream(path);
        await new Promise((resolve, reject) => {
            res.body.pipe(fileStream);
            res.body.on("error", reject);
            fileStream.on("finish", resolve);
        });
    });

    app.get('/record', (req, res) => {
        db.find({ _id: req.query.id }, (err, docs) => {
            res.json(docs[0]);
        })
    })

    app.post("/record", (req, res) => {
        console.log(req.body);
        db.insert(req.body, (err, newDoc) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(newDoc)
            }
        })
    })

    app.listen(port, () => {
        console.log(`API started on port ${port}`)
    })
}

module.exports = {
    startAPI: setup
}