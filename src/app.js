"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const path = __importStar(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
let port = 3000;
function startApp() {
    let app = express_1.default();
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
    app.use(cookie_parser_1.default());
    app.use("/", function (req, res, next) {
        if (req.cookies.myCookie === undefined) {
            res.cookie("myCookie", 12);
        }
        else {
            console.log("is logged in");
        }
        next(); // <-- important!
    });
    app.use(express_1.default.static(path.join(__dirname, "public")));
    app.get("/", (req, res) => {
        res.send();
    });
    app.listen(port, () => {
        console.log(`Listening on port: ${port}`);
    });
}
;
startApp();
db_1.con.query("select * from users", function (err, result) {
    if (err)
        throw err;
    else {
        console.log(result[0].name);
    }
});
db_1.con.end();
