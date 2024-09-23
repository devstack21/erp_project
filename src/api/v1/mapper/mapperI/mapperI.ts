import { Store } from "../../db/models/store.models"
export interface MapperI {
    toDto : (model : any) => void 
    toDtoArray : (model: any[]) => void
}