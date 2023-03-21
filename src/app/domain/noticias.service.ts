import {Injectable} from "@angular/core";
// import{getJSON, request} from "tns-core-modules/http";
import {Http} from "@nativescript/core"
const Sqlite=  require("nativescript-sqlite") ;



@Injectable()
export class NoticiasService {
    api: string = "https://ef72-200-71-1-106.sa.ngrok.io"

    constructor() {
        this.getDb((db) => {
            console.dir(db);
            db.each("select * from logs",
            (err,fila) => console.log("fila: ", fila),
            (err, totales) => console.log("Filas totales: ", totales));
        }, () => console.log("error on getDB"));
    }

    getDb(fnOk, fnError) {
        return new Sqlite("mi_db_logs", (err,db) => {
            if(err) {
                console.error("error al abrir db!", err);
            } else {
                console.log("Esta la db abierta: ", db.isOpen() ? "si" : "no");
                db.execSQL("CREATE TABLE IF NOT EXISTIS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, texto TEXT)")
                    .then((id) => {
                        console.log("CREATE TABLE OK");
                        fnOk(db);
                    }, (error) => {
                        console.log("CREATE TABLE ERROR", error);
                        fnError(error);
                    });
            }
        });
    }

    agregar(s: string) {
        return Http.request({
            url: this.api + "/favs",
            method: "POST",
            headers: {"Content-Type": "application/json"},
            content: JSON.stringify({
                nuevo: s
            })
        });
    }

    favs() {
        return Http.getJSON(this.api + "/favs");
    }

    buscar(s: string) {
        this.getDb((db) => {
            db.execSQL("insert into logs (texto) values (?)", [s],
            (err, id) => console.log("nuevo id: ", id));
        }, () => console.log("erros on getDB"));

        return Http.getJSON(this.api + "/get?q=" + s);
        
    }

}