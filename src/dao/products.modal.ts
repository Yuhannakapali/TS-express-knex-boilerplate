import { Request, Response } from 'express';
import {db} from '../db/db';
export const addProductInfo = async (req: Request, res: Response) => {
    try {
        const { product_category, product_name, userId } = req.body;
        if (!product_category || !product_name || !userId) {
            return res.status(400).json({ error: `Please fill all the fields required` })
        }
        // Insert into Product table
        await db('products').insert({ product_category, product_name, user_id: userId }).where({ userId })
        res.status(200).json({ success: true, userId, product_category, product_name })
    } catch (error) {
        console.error(error)
    }
}

export const getUserProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;  
        const user = await db('user').where("id", id).first();

        if (!user) {
            return res.status(404).json({ error: `User with id ${id} doesnot exist` });
        }
        const product = await db('products').where('user_id', user.id).select();
        res.status(200).json({ success: true, user,product });
    } catch (error) {
        console.error(error);
    }   
}
