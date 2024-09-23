import express from 'express'
import controlArticleControler from '../controler/controlArticleControler'
import AuthJwtMiddleware from '../middleware/AuthJwtMiddleware'
import { RouterI } from './routerI/routerI'

class ControlArticleRouter implements RouterI{

   public router : express.Router
   constructor(){
      this.router = express.Router()  
   }
   getInstanceRouter() : express.Router{
    this.router.use(AuthJwtMiddleware.authorizeRequest)
        .post('/add/:storeId', controlArticleControler.createArticle)
        .get('/:storeId', controlArticleControler.getArticle)
        .put('/update/:storeId', controlArticleControler.updateArticle)
        .delete('/delete/:storeId', controlArticleControler.deleteArticle)
         
      return this.router 
   }
   
   getRouters()
   {}
}

export default new ControlArticleRouter()