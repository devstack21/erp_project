import express from 'express'
import supplierControler from '../controler/supplierControler'
import AuthJwtMiddleware from '../middleware/AuthJwtMiddleware'
import { RouterI } from './routerI/routerI'

class SupplierRouter implements RouterI{

   public router : express.Router
   constructor(){
      this.router = express.Router()  
   }
   getInstanceRouter() : express.Router{
    this.router.use(AuthJwtMiddleware.authorizeRequest)
         .post('/add/:storeId' ,supplierControler.createSupplierStore ) 
         .put('/update/:storeId',supplierControler.updateSupplierStore )    
         .get('/:storeId', supplierControler.getSupplierStore)
         .delete('/delete/:storeId', supplierControler.deleteSupplierStore)
      return this.router 
   }
   
   getRouters()
   { }
}

export default new SupplierRouter()