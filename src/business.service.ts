import mysql from 'mysql2/promise';

export default class BusinessService {
    private connection: mysql.Connection
    private tableName = 'businesses'
    constructor(connection: mysql.Connection) {
        this.connection = connection
    }

    async listTable(tableName: string) {
        const [results, data] = await this.connection.query(`
            SELECT * from ${this.tableName}
            LIMIT 6
        `)
        return results
    }

    async getByDistance(long: string, lat: string, limit: string, type: string) {
        const [results, data] = await this.connection.query(`
            SELECT *, ST_Distance_Sphere(point(${long}, ${lat}), point(longitude, latitude)) as distance
            FROM  ${this.tableName}
            ${type ? `WHERE type='${type}'`:''}
            ORDER BY distance ASC
            ${limit ? 'LIMIT ' + limit : ''}
        `)
        return results
    }
}
