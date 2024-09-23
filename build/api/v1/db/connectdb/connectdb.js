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
exports.connectDatabaseWithRetry = void 0;
const ormconfig_1 = __importDefault(require("../ormconfig"));
const MAX_RETRY = 5;
const TIMEOUT_RETRY = 5000;
let retries = 0;
function connectDatabaseWithRetry() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield ormconfig_1.default.initialize();
            console.log('Connection database successfully ');
        }
        catch (error) {
            if (retries < MAX_RETRY) {
                retries++;
                console.log(`Retrying to connect to database (${retries}/${MAX_RETRY})...`);
                setTimeout(connectDatabaseWithRetry, TIMEOUT_RETRY); // Attendre 5 secondes avant de réessayer
            }
            else {
                console.error('Failed to connect to the database after multiple attempts:', error);
                process.exit(1);
            }
        }
    });
}
exports.connectDatabaseWithRetry = connectDatabaseWithRetry;
