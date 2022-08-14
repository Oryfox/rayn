const { app } = require('electron');
const express = require('express');
const DataStore = require('nedb');
const multer = require('multer');
const upload = multer({ dest: app.getPath('userData') + '/uploads/' });
const path = require('path');
const lastFmSecret = 'abf7626b0ae925ff1ed6ba562b64487b';
const fetch = require('electron-fetch').default;
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

    app.post('/record/image', upload.single('file'), (req, res) => {
        if (req.file.mimetype.startsWith('image/')) {
            fs.unlinkSync(imagePath + req.query.id)
            fs.renameSync(req.file.path, imagePath + req.query.id)
            res.sendStatus(200);
        } else {
            res.sendStatus(415);
        }
    })

    app.delete('/record/image', (req, res) => {
        fs.unlinkSync(imagePath + req.query.id)
        res.sendStatus(200);
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

    app.get('/record/auto', async (req, res) => {
        getAlbumInfo(req.query.artist, req.query.title)
            .then(response => response.json())
            .then(json => {
                const album = json.album
                const record = {
                    artist: album.artist,
                    title: album.name,
                    releaseYear: 1980,
                    tracks: album.tracks.track.map(t => {
                        return {
                            title: t.name,
                            rank: t['@attr'].rank
                        }
                    }),
                    limited: false,
                    bootleg: false,
                    color: 'Black'
                }
                res.json(record)
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

    app.put('/record', (req, res) => {
        db.update({ _id: req.body._id }, { $set: req.body }, {}, (err, numReplaced) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.sendStatus(200)
            }
        })
    })

    app.delete('/record', (req, res) => {
        fs.unlinkSync(imagePath + req.query.id)
        db.remove({ _id: req.query.id }, {}, (err) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.sendStatus(200)
            }
        })
    })

    app.listen(port, () => {
        console.log(`API started on port ${port}`)
    })
}

function getAlbumInfo(artist, album) {
    return fetch('https://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key=' + lastFmSecret + '&artist=' + artist + '&album=' + album + '&format=json')
}

module.exports = {
    startAPI: setup
}