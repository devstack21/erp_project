import { AlertStockServiceI } from "./serviceI/alertStockServiceI";
import { ResponseHttp } from "../domain/http.domain";
import ExceptionHandler from "../handlerException/handlerException";
import { AlertRepository } from "../repository/alertRepository";

export default class AlertStockService implements AlertStockServiceI {
    private readonly alertRepository = AlertRepository
    async getAlertStore(storeId : number , alertId?:number){
        try {
            const alerts = await this.alertRepository.getAlertStore(storeId , alertId)
            return {
                status : 200,
                response_data : alerts 
            } as ResponseHttp
        } catch (error) {
            return ExceptionHandler.handleError(error) 
        }
        
    }
}