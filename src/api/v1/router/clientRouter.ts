import express from 'express'
import clientControler from '../controler/client.controler'
import AuthJwtMiddleware from '../middleware/AuthJwtMiddleware'
import { RouterI } from './routerI/routerI'

class ClientRouter implements RouterI{

   public router : express.Router
   constructor(){
      this.router = express.Router()  
   }
   getInstanceRouter() : express.Router{
    this.router.use(AuthJwtMiddleware.authorizeRequest)
         .get('/connected', clientControler.getClientConnected)
        
      return this.router 
   }
   
   getRouters()
   { }
}

export default new ClientRouter()