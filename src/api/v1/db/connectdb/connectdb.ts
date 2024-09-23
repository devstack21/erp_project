import dbInstance from "../ormconfig";
const MAX_RETRY = 5;
const TIMEOUT_RETRY = 5000
let retries = 0;

export async function connectDatabaseWithRetry() {
    try {
        await dbInstance.initialize();
        console.log('Connection database successfully ');
    } catch (error) {
        if (retries < MAX_RETRY) {
            retries++;
            console.log(`Retrying to connect to database (${retries}/${MAX_RETRY})...`);
            setTimeout(connectDatabaseWithRetry, TIMEOUT_RETRY
            ); // Attendre 5 secondes avant de réessayer
        } else {
            console.error('Failed to connect to the database after multiple attempts:', error);
            process.exit(1);
        }
    }
}


