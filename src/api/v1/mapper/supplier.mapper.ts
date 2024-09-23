
import { MapperI } from "./mapperI/mapperI";
import { Supplier } from "../db/models/supplier.models";
import { SupplierDto } from "../dto/supplier.dto";

class SupplierMapper implements MapperI{

    async toDto (supplier : Supplier) : Promise<SupplierDto> {
        const supplierDto = new SupplierDto
        supplierDto.id = supplier.id
        supplierDto.name = supplier.name
        supplierDto.phone = supplier.phone
        return supplierDto
    }
    async toDtoArray(suppliers: Supplier[]): Promise<SupplierDto[]> {
        return Promise.all(suppliers.map(supplier => this.toDto(supplier)));
    }
   
}
export default new SupplierMapper()