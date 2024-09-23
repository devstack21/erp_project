
import 'reflect-metadata'
import express  from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import session from 'express-session'
import env from 'dotenv'
import { connectDatabaseWithRetry } from '../db/connectdb/connectdb'
import ErrorMiddlewareHttp from '../middleware/ErrorMiddlewareHttp'
import authRouter from '../router/authRouter'
import storeRouter from '../router/storeRouter'
import controlArticleRouter from '../router/controlArticleRouter'
import saleRouter from '../router/saleRouter'
import billingRouter from '../router/billingRouter'
import alertRouter from '../router/alertRouter'
import supplierRouter from '../router/supplierRouter'
import apiStaticDataRouter from '../router/apiStaticDataRouter'
import clientRouter from '../router/clientRouter'

env.config()

class App {
    
    public app : express.Application
   
    constructor(){
        this.app = express()
        this.initializeMiddlewares()
        this.initializeRoutes()
        this.initializeDatabase()
    }
    private initializeMiddlewares(){
        this.app.use(cors());
        this.app.use(session({
            secret: process.env.SECRET_SESSION as string,
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false }
        }));
        this.app.use(express.static('public'));
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.json());
       
    }
    private initializeRoutes(){
        this.app.use('/ws/auth/v1', authRouter.getInstanceRouter() )
        this.app.use('/ws/api/v1/store', storeRouter.getInstanceRouter());
        this.app.use('/ws/api/v1/article', controlArticleRouter.getInstanceRouter())
        this.app.use('/ws/api/v1/sale', saleRouter.getInstanceRouter())
        this.app.use('/ws/api/v1/invoice', billingRouter.getInstanceRouter())
        this.app.use('/ws/api/v1/alert', alertRouter.getInstanceRouter())
        this.app.use('/ws/api/v1/supplier', supplierRouter.getInstanceRouter())
        this.app.use('/ws/api/v1/data', apiStaticDataRouter.getInstanceRouter())
        this.app.use('/ws/api/v1/client', clientRouter.getInstanceRouter())
        this.app.use(ErrorMiddlewareHttp.NotFoundErrorsHttp)
        this.app.use(ErrorMiddlewareHttp.GlobalErrorHandlerHttp)
    }
    private async initializeDatabase(){
        try {
            await connectDatabaseWithRetry();
            this.runServer();
        } catch (err) {
            process.exit(1);   
        }
    }
    private runServer(){
        const port = process.env.PORT as string 
        this.app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }
}

export default new App().app