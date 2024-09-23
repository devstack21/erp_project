import { EntityManager, Repository } from 'typeorm';
import { Alert } from '../db/models/alert.models';
import dbInstance from '../db/ormconfig';
import { AlertDto } from '../dto/alert.dto';
import { DomainError } from '../exception/domainException';
import { StoreRepository } from './storeRepository';
import alertMapper from '../mapper/alert.mapper';

export const AlertRepository = dbInstance.getRepository(Alert).extend({
  
  async createAlert(transactionalEntity: EntityManager, alertDto : AlertDto): Promise<Alert> {
    const alert = new Alert();
    alert.reason = alertDto.reason;
    alert.article = alertDto.article
    return await transactionalEntity.withRepository(this).save(alert)
  },

  async findById(id: number): Promise<Alert | undefined> {
    const alert = await this.findOne({where : {id : id}});
    if(!alert) throw new DomainError("L'identifiant de cette alert n'existe pas", 400,'Alert', 'ID alert not found')
    return alert
  }, 
  async findAll(): Promise<Alert[]> {
    return this.find();
  },
  async getAlertStore(storeId : number, alertId? : number){
    try {
        const store = await StoreRepository.findOne({ where: { id: storeId } });
        if (!store) {
            throw new DomainError("Le store n'existe pas", 400, 'Store', 'store not found');
        }
        let query =  this.createQueryBuilder('alert')
                    .where('alert.storeId = :storeId', {storeId})
        if(alertId){
            query = query.andWhere('alert.id = :alertId', {alertId})
        }
        const alerts = await query.getMany()

        return alertMapper.toDtoArray(alerts)
    } catch (error) {
        throw error
    }
    
  }

});
