import * as dotenv from 'dotenv';
import { createConnection } from 'mysql2';

dotenv.config();

export const connection = createConnection({

    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    multipleStatements: true
});

connection.connect(function(err: any){
    if (err){
        console.error(`error: ${err} `);
    } else {
        console.info("Connected to Database")
    }
});

export default connection;