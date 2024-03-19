import express, {Express, Request, Response, NextFunction} from 'express'
import { router } from './routes/products';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'

const app: Express = express()
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(router)

mongoose.connect('mongodb+srv://lucaslema91:1tfSlsax84VOu554@cluster0.rjniuux.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        app.listen(port)
    })
    .catch(err => console.log(err))