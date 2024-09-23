import { Client } from "../db/models/client.models";
import { ClientConnectDto } from "../dto/clientConnect.dto";
import { MapperI } from "./mapperI/mapperI";
import storeMapper from "./store.mapper";

class ClientConnectMapper implements MapperI{
    async toDto(client : Client) : Promise<ClientConnectDto>{
        const clientConnectDto = new ClientConnectDto()
        clientConnectDto.id = client.id
        clientConnectDto.username = client.username
        clientConnectDto.email = client.email
        clientConnectDto.phone = client.phone
        clientConnectDto.stores = await this.getStoresClient(client)
        return clientConnectDto
    }
    async toDtoArray(clients : Client[]) : Promise<ClientConnectDto[]> {
        return Promise.all(clients.map(client => this.toDto(client)));
    }
    private async getStoresClient(client : Client){
        return storeMapper.toDtoArray(client.stores)}
}

export default new ClientConnectMapper()