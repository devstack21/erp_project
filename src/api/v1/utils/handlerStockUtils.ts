import { MessageStockError } from "../domain/error.domain";
import { OutStockException } from "../exception/outStockException";
import { InsufficientStockException } from "../exception/insufficientStockException";

class HandlerStockUtils {

      getCheckingTransactionStock(article : string , initial_stock : number , saleItem_quantity : number) : number{

        const messageStockError : MessageStockError = {
            initial_stock,
            article
        }

        if(initial_stock === 0) {
           throw new OutStockException(messageStockError , 
            `Rupture de stock de l'article ${article}`, 
            'Initial stock 0')
        }
        if(initial_stock - saleItem_quantity <0){
            
            messageStockError.status_stock = true
            throw new InsufficientStockException(messageStockError , 
                `Stock insuffisant de l'article ${article}`, 
                `not enough stock`)
        }
        return initial_stock - saleItem_quantity

    }
    


}
export default new HandlerStockUtils()