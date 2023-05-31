const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Toma4ever!',
    database: 'proiect-mds',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/get', (req, res) =>{
    const sqlSelect = "SELECT * FROM songs"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post('/api/insert', (req,res)=>{

    const songName = req.body.songName
    const songArtist = req.body.songArtist
    const fileData = req.body.fileData

    const sqlInsert = "INSERT INTO songs (songName, songArtist, fileData) VALUES (?, ?, ?)"
    db.query(sqlInsert, [songName, songArtist, fileData], (err, result) => {
        console.log(result)
    })
})

app.delete('/api/delete/:songName', (req, res) => {
    const name = req.params.songName;

    const sqlDelete = "DELETE FROM songs WHERE songName = ?"
    db.query(sqlDelete, name, (err, result) => {
        if (err) console.log(err);
    })
})

app.listen(3001, () =>{
    console.log("running");
})