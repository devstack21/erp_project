"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supplierService_1 = __importDefault(require("../service/supplierService"));
const validationError_supplier_1 = __importDefault(require("../utils/validationError.supplier"));
const class_transformer_1 = require("class-transformer");
const supplier_dto_1 = require("../dto/supplier.dto");
class SupplierControler {
    constructor(supplierService) {
        this.createSupplierStore = (request, response) => {
            const storeId = parseInt(request.params.storeId, 10);
            if (!storeId)
                return response.json({ status: 400, message: "L'identifiant de la boutique n'est pas defini" });
            const supplierDto = (0, class_transformer_1.plainToClass)(supplier_dto_1.SupplierDto, request.body);
            this.supplierService.createSupplierStore(storeId, supplierDto)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.updateSupplierStore = (request, response) => {
            const storeId = parseInt(request.params.storeId, 10);
            if (!storeId)
                response.json({ status: 400, message: "l'identifiant de la boutique n'est pas défini" });
            const supplierId = request.query.supplier ? parseInt(request.query.supplier, 10) : 0;
            if (!supplierId)
                return response.json({ status: 400, message: "L'identifiant du fournisseur n'est pas défini" });
            const name = request.query.name;
            const phone = request.query.phone;
            const fieldUpdated = {
                name: name,
                phone: phone
            };
            this.supplierService.updateSupplierStore(storeId, supplierId, fieldUpdated)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.getSupplierStore = (request, response) => {
            const storeId = parseInt(request.params.storeId, 10);
            if (!storeId)
                response.json({ status: 400, message: "l'identifiant de la boutique n'est pas défini" });
            const supplier = request.query.supplier ? parseInt(request.query.supplier, 10) : 0;
            this.supplierService.getSupplierStore(storeId, supplier)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.deleteSupplierStore = (request, response) => {
            const storeId = parseInt(request.params.storeId, 10);
            if (!storeId)
                response.json({ status: 400, message: "l'identifiant de la boutique n'est pas défini" });
            const supplier = parseInt(request.query.supplier, 10);
            if (!supplier)
                return response.json({ status: 400, message: "L'identifiant du fournisseur n'est pas defini" });
            this.supplierService.deleteSupplierStore(storeId, supplier)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.supplierService = supplierService;
    }
}
exports.default = new SupplierControler(new supplierService_1.default(new validationError_supplier_1.default()));
