import App from "./app";
import connection from "./connection";
import mysql from "mysql2/promise";

connection.then((c: mysql.Connection) => {
  const app = new App(c);
  app.server.listen(3333);
});
