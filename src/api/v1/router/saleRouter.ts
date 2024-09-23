import express from 'express'
import saleControler from '../controler/saleControler'
import AuthJwtMiddleware from '../middleware/AuthJwtMiddleware'
import { RouterI } from './routerI/routerI'

class SaleRouter implements RouterI{

   public router : express.Router
   constructor(){
      this.router = express.Router()  
   }
   getInstanceRouter() : express.Router{
    this.router.use(AuthJwtMiddleware.authorizeRequest)
         .post('/add/:storeId' , saleControler.createSale)     
         .get('/day/:storeId', saleControler.getDataSaleStoreThisDay)
         .get('/:storeId', saleControler.getDataSaleByStore)
      return this.router 
   }
   
   getRouters()
   { }
}

export default new SaleRouter()