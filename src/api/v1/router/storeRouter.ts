import express from 'express'
import storeControler from '../controler/storeControler'
import AuthJwtMiddleware from '../middleware/AuthJwtMiddleware'
import { RouterI } from './routerI/routerI'

class StoreRouter implements RouterI{

   public router : express.Router
   constructor(){
      this.router = express.Router()  
   }
   getInstanceRouter() : express.Router{
    this.router.use(AuthJwtMiddleware.authorizeRequest)
         .get('/', storeControler.getStore)
         .post('/add' , storeControler.addStore)
         .put('/update/:storeId', storeControler.updateStore)
         .delete('/delete/:storeId', storeControler.deleteStore)
      return this.router 
   }
   
   getRouters()
   { }
}

export default new StoreRouter()