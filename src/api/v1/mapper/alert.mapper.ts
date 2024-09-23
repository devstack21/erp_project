import { Alert } from "../db/models/alert.models";
import { AlertDto } from "../dto/alert.dto";
import { MapperI } from "./mapperI/mapperI";

class AlertMapper implements MapperI {

    async toDto(alert : Alert){
        const alertDto = new AlertDto()
        alertDto.id = alert.id
        alertDto.article = alert.article
        alertDto.reason = alert.reason
        return alertDto
    }
    async toDtoArray(alerts : Alert[]) : Promise<AlertDto[]>{
        return Promise.all(alerts.map(alert => this.toDto(alert)));
    }
}

export default new AlertMapper()