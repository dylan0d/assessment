import mysql from 'mysql2/promise';

export default class BusinessService {
    private connection: mysql.Connection
    constructor(connection: mysql.Connection) {
        this.connection = connection
    }

    async listTable(tableName: string) {
        const [results, data] = await this.connection.query(`
            SELECT * from ${tableName}
            LIMIT 6
        `)
        console.log(results)
        return results
    }
}
