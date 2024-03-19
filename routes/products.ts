import express, {Router, Request, Response} from 'express';
import {body} from 'express-validator';
import { getProducts, createProduct, getSingleProduct, deleteSingleProduct, editProduct } from '../controllers/products';


export const router: Router = express.Router();

router.get('/products', getProducts)
router.get('/products/:id', getSingleProduct)
router.post('/products', [
    body('title').trim().isLength({min: 3}),
    body('price').trim().isNumeric(),
], createProduct)
router.delete('/products/:id', deleteSingleProduct)
router.put('/products/:id', editProduct)