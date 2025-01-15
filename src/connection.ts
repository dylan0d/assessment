import mysql from 'mysql2/promise';
export default mysql.createConnection({
    host     : 'localhost',
    user     : 'dylan',
    password : 'secret',
    database : 'squid'
});
