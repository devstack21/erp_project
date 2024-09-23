import express from 'express'
import AuthControler from '../controler/authControler'
import AuthJwtMiddleware from '../middleware/AuthJwtMiddleware'
import { RouterI } from './routerI/routerI'

class AuthRouter implements RouterI{

   public router : express.Router
   constructor(){
      this.router = express.Router()  
   }
   
   getInstanceRouter(){
      this.router
         .post('/signup' , AuthControler.signup)
         .post('/login', AuthControler.login)
         .post('/logout', AuthJwtMiddleware.authorizeRequest,AuthControler.logout)
      
      return this.router 
   }
   
   getRouters(){}
}

export default new AuthRouter()