import { StoreDto } from "./store.dto"

export class ClientConnectDto {
    
    id!:number 
    
    username!:string

    email!:string 

    phone!:string 
    
    stores!: StoreDto[]

}