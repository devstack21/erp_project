import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

const dbInstance = new DataSource({
    type: "postgres",
    url: process.env.PG_URL_REMOTE,
    database: process.env.DB_DATABASE,
    entities: [
        'src/api/v1/db/models/*.ts'   
    ],
    synchronize: true, 
    
});

export default dbInstance;
