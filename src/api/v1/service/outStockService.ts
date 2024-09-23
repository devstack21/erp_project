import { ArticleDto } from "../dto/article.dto";
import { AlertRepository } from "../repository/alertRepository";
import { ArticleRepository } from "../repository/articleRepository";
import { Alert } from "../db/models/alert.models";
import { AppException } from "../exception/AppException";
import { StoreRepository } from "../repository/storeRepository";
import { DomainError } from "../exception/domainException";

class OutOfStockService {
  private alertRepository = AlertRepository
  private articleRepository = ArticleRepository
  async checkingStockAlert(storeId :  number){
    try {
      const store = await StoreRepository.findOne({where : {id : storeId}});
      if (!store) throw new DomainError("Le store n'existe pas", 404, 'Store', 'store not found');
      const articleStock : ArticleDto[] = await this.articleRepository.getArticle(storeId);
     
      // Filtrer les articles avec un stock nul
      const outOfStockArticles = articleStock.filter(article => article.quantity === 0);

      if (outOfStockArticles.length > 0) {
              const alerts = outOfStockArticles.map(article => {
                  const alertStock = new Alert();
                  alertStock.reason = `Out of stock of article ${article.name}`;
                  alertStock.article = article.name;
                  alertStock.store = store
                  return alertStock;
          });
          //save alerts
          await this.alertRepository.save(alerts)
          .then(() =>{
            // send sms or email 
            console.log('ALERT GENERATED...');
          })
          .catch((error)=>{
            throw new AppException("Échec de la vérification des alertes de stock", 400, "APP_ERR_01", error.reason);

          })
      }    
     
  } catch (error) {
      throw error
  }

}}

export default new OutOfStockService()