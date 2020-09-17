const fs = require("fs");
const path = require("path");
// const { v4: uuidv4 } = require("uuid");
import {v4 as uuidv4} from `uuid`;

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    let notes = readFile();
    res.json(notes);
  });

  app.post("/api/notes", function (req, res) {
    let notes = readFile();
    let filePath = path.join("db", "db.json");
    let note = { id: uuidv4() };
    Object.assign(note, req.body);
    notes.push(note);
    fs.writeFileSync(filePath, JSON.stringify(notes));
    res.json(notes);
  });

  function readFile() {
    let filePath = path.join("db", "db.json");
    let rawdata = fs.readFileSync(filePath);
    let notes = JSON.parse(rawdata);
    return notes;
  }

  app.delete("/api/notes/:id", function (req, res) {
    let notes = readFile();
    let filePath = path.join("db", "db.json");
    for (let i = 0; i < notes.length; i++) {
      let note = notes[i];
      if (notes[i].id === req.params.id) {
        notes.splice(i, 1);
        break;
      }
    }
    fs.writeFileSync(filePath, JSON.stringify(notes));
    res.json({ message: "DELETED" });
  });
};
