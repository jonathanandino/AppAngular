var express = require("express"), cors = require('cors');
var app = express();

app.use(express.json());
app.use(cors());
app.listen(3000, () => console.log("server running on port 3000"));

let noticias = [
    "literatura Paris", "Futbol Barcelona", "Futbol Barranquilla",
    "Politica Montevideo", "Economia Santiago de chile", "cocina Mexico DF",
    "Finanzas Nueva York"
];

app.get("/get", (req,res, next) =>
    res.json(noticias.filter((c)=> c.toLowerCase().indexOf( req.query.q.toString().toLowerCase()) > -1)));

var misFavoritos= [];
app.get("/favs", (req,res, next) => res.json(misFavoritos));
app.post("/favs", (req, res,next) => {
    console.log(req.body);
    misFavoritos.push(req.body.nuevo);
    res.json(misFavoritos);
})    