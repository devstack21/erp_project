import cron from 'node-cron';
import { Store } from '../v1/db/models/store.models';
import outStockService from '../v1/service/outStockService';

class OutStockCronManager {
    private static instance: OutStockCronManager;
    private cronJobs: Map<number, cron.ScheduledTask> = new Map();
   
    public static getInstance(): OutStockCronManager {
        if (!OutStockCronManager.instance) {
            OutStockCronManager.instance = new OutStockCronManager();
        }
        return OutStockCronManager.instance;
    }
    startCronJob(store: Store) {
        if (this.cronJobs.has(store.id)) {
            console.log(`Cron job for Store ${store.id} is already running.`);
            return;
        }
        const task = cron.schedule('* * * * *', async () => { // execution 9h-16h all day
            //'0 9,16 * * 1-5'
            console.log('Cron started with success')
            await outStockService.checkingStockAlert(store.id)         
        });
        this.cronJobs.set(store.id, task);
        task.start();
    }
    stopCronJob(storeId: number) {
        const task = this.cronJobs.get(storeId);
        if (task) {
            task.stop();
            this.cronJobs.delete(storeId);
            console.log(`Cron job for Store ${storeId} has been stopped.`);
        } else {
            console.log(`No cron job found for Store ${storeId}.`);
        }
    }
}
export default OutStockCronManager;


