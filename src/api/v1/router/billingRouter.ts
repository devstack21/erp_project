import express from 'express'
import billingControler from '../controler/billingControler'
import AuthJwtMiddleware from '../middleware/AuthJwtMiddleware'
import { RouterI } from './routerI/routerI'

class BillingRouter implements RouterI{

   public router : express.Router
   constructor(){
      this.router = express.Router()  
   }
   getInstanceRouter() : express.Router{
    this.router.use(AuthJwtMiddleware.authorizeRequest) 
         .get('/day/:storeId', billingControler. getInvoiceByStoreThisDay)
         .get('/:storeId', billingControler.getInvoiceByStore )
         .get('/status/:storeId', billingControler.getInvoiceByStatus)
         .put('/update/status/:storeId', billingControler.updateStatusInvoice)
         .put('/update/details/:storeId', billingControler.updateDetailsInvoiceNotPaid)
      return this.router 
   }
   
   getRouters()
   { }
}
export default new BillingRouter()