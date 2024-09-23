import { ResponseHttp } from "../../domain/http.domain";

export interface AlertStockServiceI {
    getAlertStore(storeId: number, alertId?: number): Promise<ResponseHttp | {
        status: number;
        message: string;
    }>
}