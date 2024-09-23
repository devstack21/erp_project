import { Article } from '../db/models/article.models';
import dbInstance from '../db/ormconfig';
import { DomainError } from '../exception/domainException';
import { ArticleDto } from '../dto/article.dto';
import { StoreRepository } from './storeRepository';
import { TypeArticleRepository } from './typeArticleRepository';
import { UnitMeasureRepository } from './unitMeasureRepository';
import { SupplierRepository } from './supplierRepository';
import { AppException } from '../exception/AppException';
import articleMapper from '../mapper/article.mapper';
import { filteredFieldArticle } from '../domain/type.domain.filtered';
import { EntityManager } from 'typeorm';

export const ArticleRepository = dbInstance.getRepository(Article).extend({

    async createArticle(transactionalEntity : EntityManager, data : ArticleDto , storeId : number){
        try {    
            let articleExist = await transactionalEntity.withRepository(this).findByName(storeId , data.name)
            if(articleExist) throw new DomainError('Le nom associé a cet article dans cette boutique existe déja', 400,'Article', 'name article exist already')
             
            const store = await transactionalEntity.withRepository(StoreRepository).findOne({where : {id : storeId}})
            if(!store) throw new DomainError("L'identifiant de la boutique n'existe pas", 400,'Store', 'ID store not found')
            
            const typeArticle = await transactionalEntity.withRepository(TypeArticleRepository).findOne({where : {libelle: data.typeArticle }})
            if(!typeArticle) throw new DomainError("Le type de cet article n'existe pas", 400,'Type Article', 'type article not found')
            
            const unitMeasure = await transactionalEntity.withRepository(UnitMeasureRepository).findOne({where : {libelle: data.unitMeasure }})
            if(!unitMeasure) throw new DomainError("L'unité de mesure n'existe pas", 400,'unitMeasure', 'unit measure not found')
            
            const supplier = await transactionalEntity.withRepository(SupplierRepository).findOne({where : {name: data.supplier }})
            if(!supplier) throw new DomainError("Ce fournisseur n'existe pas", 400,'Supplier', 'supplier not found')
            
            //create new article    
            const newArticle = new Article()

            newArticle.name = data.name  
            newArticle.code = data.code
            newArticle.selling_price = data.selling_price
            newArticle.purchase_price = data.purchase_price
            newArticle.quantity = data.quantity 
            newArticle.store = store
            newArticle.typeArticle = typeArticle
            newArticle.unitMeasure = unitMeasure
            newArticle.supplier = supplier

            const articleSaved = await transactionalEntity.withRepository(this).save(newArticle)
            .catch((error)=>{
                console.error(error)
                throw new  AppException("Echec de création de l'article" ,400,"APP_ERR_00",error.reason)
            })
            transactionalEntity.withRepository(StoreRepository).addArticleStore(articleSaved , store)
            return articleSaved 
            
        } catch (error) {
            console.error(error)
            throw error
        }
    },
    async updateArticle(transactionalEntity : EntityManager ,storeId : number , articleId : number, filteredField : filteredFieldArticle){
        try {
            const store = await transactionalEntity.withRepository(StoreRepository).findOne({where : {id : storeId}})
            if(!store) throw new DomainError("L'identifiant de la boutique n'existe pas", 400,'Store', 'ID store not found')
            
            const article = await transactionalEntity.withRepository(this).findOneByArticleIdStore(articleId , storeId)
            if(!article) throw new DomainError("L'article n'existe pas dans ce magasin", 400,'Article', 'article not associated with this store')
            
            if (filteredField.name ) article.name = filteredField.name;
            if (filteredField.code) article.code = filteredField.code;
            if (filteredField.selling_price) article.selling_price = filteredField.selling_price;
            if (filteredField.purchase_price) article.purchase_price = filteredField.purchase_price;
            if (filteredField.quantity) article.quantity = filteredField.quantity;
            if (filteredField.typeArticle) {
                const typeArticle = await transactionalEntity.withRepository(TypeArticleRepository).findOne({ where: { libelle: filteredField.typeArticle } });
                if (typeArticle) 
                    article.typeArticle = typeArticle;
                else throw new DomainError("Type d'article inconnu", 400, 'TypeArticle', 'Type article not found');   
            }
            if (filteredField.unitMeasure ) {
                const unitMeasure = await transactionalEntity.withRepository(UnitMeasureRepository).findOne({ where: { libelle: filteredField.unitMeasure } });
                if(unitMeasure) article.unitMeasure = unitMeasure
                else throw new DomainError("Unité de mesure inconnu", 400, 'Unit Measure', 'Unit Measure not found');
            }
            if (filteredField.supplier) {
                const supplier = await transactionalEntity.withRepository(SupplierRepository).findOne({ where: { name: filteredField.supplier } });
                if (supplier) article.supplier = supplier;
                else throw new DomainError("Fournisseur inconnu", 400, 'Supplier', 'Supplier not found');     
            }
            return await transactionalEntity.withRepository(this).save(article).catch((error) => {
                throw new AppException("Échec de mise à jour de l'article", 400, "APP_ERR_01", error.reason);
            });
            
        } catch (error) {
            throw error
        }  
    },
    async deleteArticle(storeId : number, articleId : number) {
        try {
            const store = await StoreRepository.findOne({where : {id : storeId}});
            if (!store) throw new DomainError("Le store n'existe pas", 404, 'Store', 'store not found');
            const article = await ArticleRepository.findOneByArticleIdStore(articleId , storeId)
            if(!article) throw new DomainError("L'article n'existe pas dans ce magasin", 400,'Article', 'ID article not found')
            await this.remove(article).catch((error) => {
                    throw new AppException("Échec de suppression de l'article", 400, "APP_ERR_01", error.reason);
            });
            return true
        } catch (error) {
            throw error
        }
    }
    ,
    async getArticle(storeId :  number , articleId? : number , nameArticle?:string){
        try {
            const store = await StoreRepository.findOne({where : {id : storeId}})
            if(!store) throw new DomainError("L'identifiant de la boutique n'existe pas", 400,'Store', 'ID store not found')
            if(articleId) {
                const article = await ArticleRepository.findOneByArticleIdStore(articleId , storeId)
                if(!article) throw new DomainError("L'article n'existe pas dans ce magasin", 400,'Article', 'ID article not found')
                return Promise.all([articleMapper.toDto(article)])
            }
            if(nameArticle){
                const article = await ArticleRepository.findOneByNameArticleStore(nameArticle , storeId)
                if(!article) throw new DomainError("L'article n'existe pas dans ce magasin", 400,'Article', 'ID article not found')
                return Promise.all([articleMapper.toDto(article)])
            }
            const articles = await ArticleRepository.findByStoreId(storeId)
            return articleMapper.toDtoArray(articles)
            
        } catch (error) {
            throw error
        }
    },
    async findByArticleIds(articleIds: number[]): Promise<Article[]> {
        if (articleIds.length === 0) {
            return []; // Retourne un tableau vide si aucun ID n'est fourni
        }

        try {
            const articles = await this.createQueryBuilder('article')
                .where('article.id IN (:...articleIds)', { articleIds })
                .getMany();
            
            return articles;
        } catch (error) {
            throw new DomainError("Une erreur de récupération des articles", 404, 'Article', 'Articles get error');
        }
    }
    ,
    async findOneByArticleIdStore(articleId : number , storeId : number) : Promise<Article | undefined>{
        const article = await this.findOne({where : {id :articleId , store : {id : storeId} } ,
        relations : ['unitMeasure','typeArticle','supplier']})
        return article ? article : undefined
    },
    async findByStoreId(storeId : number) : Promise<Article[]>{
        const article = await this.find({where : {store : {id : storeId} } ,
            relations : ['unitMeasure','typeArticle','supplier']})
            return article ? article : []

    },
    async findByArticleId(articleId : number) :  Promise<Article | undefined>{
        const article = await this.findOne({where : {id : articleId}  ,
            relations : ['unitMeasure','typeArticle','supplier']})
            return article ? article : undefined
    },
    async findOneByNameArticleStore(nameArticle : string , storeId : number) : Promise<Article | undefined>{
        const article = await this.findOne({where : {name : nameArticle , store : {id : storeId} } ,
        relations : ['unitMeasure','typeArticle','supplier']})
        return article ? article : undefined
    },
    
    async findByCode(code: string): Promise<Article | undefined> {
        const article = await this.findOne({ where: { code : code } });
        return article ? article : undefined 
    }, 
    async findByStore(storeId: number): Promise<Article[]> {
        return this.find({ where: { store: { id: storeId } } });
    },
    async findByTypeArticle(typeArticleId: number): Promise<Article[]> {
        return this.find({ where: { typeArticle: { id: typeArticleId } } });
    },

    async findByUnitMeasure(unitMeasureId: number): Promise<Article[]> {
        return this.find({ where: { unitMeasure: { id: unitMeasureId } } });
    },
    async findBySupplier(supplierId: number): Promise<Article[]> {
        return this.find({ where: { supplier: { id: supplierId } } });
    },
    async findByName(storeId : number , name : string){
        const article = await this.findOne({where : {name : name , store : {id : storeId}}})
        return article ? article : undefined
    }
});
