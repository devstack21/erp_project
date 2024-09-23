import { RouterI } from "./routerI/routerI"
import express from 'express'
import AuthJwtMiddleware from "../middleware/AuthJwtMiddleware"
import alertStockControler from "../controler/alertStockControler"

class AlertRouter implements RouterI{

    public router : express.Router
    constructor(){
       this.router = express.Router()  
    }
    getInstanceRouter() : express.Router{
     this.router.use(AuthJwtMiddleware.authorizeRequest) 
          .get('/:storeId', alertStockControler.getAlertStore)
         
       return this.router 
    }
    
    getRouters()
    { }
 }
 export default new AlertRouter()