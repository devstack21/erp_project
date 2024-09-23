import express from 'express'
import apiStaticDataControler from '../controler/apiStaticDataControler'
import AuthJwtMiddleware from '../middleware/AuthJwtMiddleware'
import { RouterI } from './routerI/routerI'

class ApiStaticDataRouter implements RouterI{

   public router : express.Router
   constructor(){
      this.router = express.Router()  
   }
   getInstanceRouter() : express.Router{
    this.router.use(AuthJwtMiddleware.authorizeRequest)
         .get('/cities' ,apiStaticDataControler.getListCity)
         .get('/countries' ,apiStaticDataControler.getListCountry)  
         .get('/districts' ,apiStaticDataControler.getListDistrict)
         .get('/type/articles' ,apiStaticDataControler.getListTypeArticle)
         .get('/type/stores' ,apiStaticDataControler.getListTypeStore)
         .get('/units' ,apiStaticDataControler.getListUnitMeasure)
        
     return this.router 
   }
   
   getRouters()
   { }
}

export default new ApiStaticDataRouter()