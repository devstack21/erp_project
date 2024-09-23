"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const outStockService_1 = __importDefault(require("../v1/service/outStockService"));
class OutStockCronManager {
    constructor() {
        this.cronJobs = new Map();
    }
    static getInstance() {
        if (!OutStockCronManager.instance) {
            OutStockCronManager.instance = new OutStockCronManager();
        }
        return OutStockCronManager.instance;
    }
    startCronJob(store) {
        if (this.cronJobs.has(store.id)) {
            console.log(`Cron job for Store ${store.id} is already running.`);
            return;
        }
        const task = node_cron_1.default.schedule('* * * * *', () => __awaiter(this, void 0, void 0, function* () {
            //'0 9,16 * * 1-5'
            console.log('Cron started with success');
            yield outStockService_1.default.checkingStockAlert(store.id);
        }));
        this.cronJobs.set(store.id, task);
        task.start();
    }
    stopCronJob(storeId) {
        const task = this.cronJobs.get(storeId);
        if (task) {
            task.stop();
            this.cronJobs.delete(storeId);
            console.log(`Cron job for Store ${storeId} has been stopped.`);
        }
        else {
            console.log(`No cron job found for Store ${storeId}.`);
        }
    }
}
exports.default = OutStockCronManager;
