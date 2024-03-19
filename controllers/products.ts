import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import Product from '../models/product'

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
    type SortOrder = 'asc' | 'desc';
    type SortObject = {
        [key: string]: SortOrder;
    }
    const title = req.query.title as string;
    const sortBy = req.query.sortBy as string;
    const order = req.query.order as SortOrder;
    const sortObject: SortObject = {
        [sortBy || 'title']: order || 'asc'
    }
    Product.find(
        {
            title: {
                $regex: new RegExp(title, 'i')
            },
        }
    )
        .sort(sortObject)
        .then(products => {
            res.status(200).json({
                products
            })
        })
        .catch(err => console.log(err))
}

export const getSingleProduct = (req: Request, res: Response) => {
    const productId = req.params.id;
    Product.findById(productId)
        .then(product => {
            res.status(200).json({
                product
            })
        })
        .catch(err => console.log(err))
}

export const deleteSingleProduct = (req: Request, res: Response) => {
    const productId = req.params.id;
    Product.findByIdAndDelete(productId)
    .then(() => {
        res.status(200).json({
            message: 'Product deleted!'
        })
    })
    .catch(err => console.log(err))
}

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        res.status(422).json({
            message: 'Validation failed',
            errors: errors.array()
        })
    }
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    
    const product = new Product({
        title,
        price,
        imageUrl,
        description
    })
    product.save()
        .then(result => {
            res.status(201).json({
                message: 'Product created!',
                product: result,
            })
        })
        .catch(err => console.log(err))
    
}

export const editProduct = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        res.status(422).json({
            message: 'Validation failed',
            errors: errors.array()
        })
    }
    const id = req.params.id;
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;

    Product.findByIdAndUpdate(id, {title, price, imageUrl, description})
    .then(() => {
        res.status(204).json({
            message: 'Product edited!'
        })
    })
    .catch(err => console.log(err))
}