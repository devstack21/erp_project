"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const typeorm_1 = require("typeorm");
const district_models_1 = require("./district.models");
const client_models_1 = require("./client.models");
const type_store_models_1 = require("./type.store.models");
const article_models_1 = require("./article.models");
const sale_models_1 = require("./sale.models");
const enum_cte_1 = require("../../enum/enum.cte");
const alert_models_1 = require("./alert.models");
const supplier_models_1 = require("./supplier.models");
let Store = class Store {
};
exports.Store = Store;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Store.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Store.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_cte_1.AlertConfig,
        default: enum_cte_1.AlertConfig.DESACTIVED
    }),
    __metadata("design:type", String)
], Store.prototype, "alertConfig", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_models_1.Client, client => client.stores),
    __metadata("design:type", client_models_1.Client)
], Store.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => district_models_1.District, district => district.stores),
    __metadata("design:type", district_models_1.District)
], Store.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => type_store_models_1.TypeStore, typeStore => typeStore.stores),
    __metadata("design:type", type_store_models_1.TypeStore)
], Store.prototype, "typeStore", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => article_models_1.Article, article => article.store),
    __metadata("design:type", Array)
], Store.prototype, "articles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sale_models_1.Sale, sale => sale.store),
    __metadata("design:type", Array)
], Store.prototype, "sales", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => alert_models_1.Alert, alert => alert.store),
    __metadata("design:type", Array)
], Store.prototype, "alertes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => supplier_models_1.Supplier, supplier => supplier.store),
    __metadata("design:type", Array)
], Store.prototype, "suppliers", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Store.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Store.prototype, "updatedAt", void 0);
exports.Store = Store = __decorate([
    (0, typeorm_1.Entity)()
], Store);
