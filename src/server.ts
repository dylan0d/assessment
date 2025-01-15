import App from './app';
import connection from './connection';

connection.then((c) => {
    const app = new App(c)
    app.server.listen(3333);
})
