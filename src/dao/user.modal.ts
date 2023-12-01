import { Request, Response } from "express";
import {db} from '../db/db';


export const signupUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email } = req.body;
        if (!firstName || !lastName || !email) {
            return res.status(400).json({ error: `All the fields are required` });
        }
        const existingEmail = await db('user').where({ email }).first();
        if (existingEmail) {
            return res.status(400).json({ error: `Email already exists` });
        }
        const signedUpUser = await db('user').insert({ first_name: firstName, last_name: lastName, email });
        res.status(201).json({ id: signedUpUser[0], firstName, lastName, email });
    }
    catch (err) {
        console.error(err);
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const emailExists = await db('user').where({ email }).first();

        if (!emailExists) {
            return res.status(401).json({ error: `Invalid credentials` });
        }
        res.status(201).json({ message: "welcome to the journey" });
    }
    catch (err) {
        console.error(err);
    }
}

// todo -- get,post, update, delete using  db js
// get all users
export const allUsers = async (req: Request, res: Response) => {
    try {
        const getAllUsers = await db('user').select();
        return res.status(200).json({ user: getAllUsers });
    } catch (error) {
        console.error(error);
    }
}

// post || add user
export const addUser = async (req: Request, res: Response) => {
    try {
        const { email, firstName, lastName } = req.body;

        if (!email || !firstName || !lastName) {
            return res.status(400).json({ error: `All the fields are required` });
        }

        const user = await db('user').select({email});
        if(user) {
            res.status(400).json({success: false, error: "User already exists"})
        }

         await db('user').insert({ email, first_name: firstName, last_name: lastName });
        res.status(200).json({email, firstName, lastName});

    } catch (error) {
        console.error(error);
    }
}

// get user by id
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const getUserById = await db('user').where("id", id).first();
        if (!getUserById) {
            return res.status(400).json({ error: `No user found with the id ${id}` });
        }
        return res.status(200).json({ user: getUserById });
    } catch (error) {
        console.error(error);
    }
}

// update the user value with id
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { firstName, lastName } = req.body;
        const updatedUser = await db('user').where({ id }).update({ first_name: firstName, last_name: lastName });
        if (!updatedUser) {
            return res.status(400).json({ error: `No user found with the id ${id}` });
        }
        return res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.error(error);
    }
}

// delete the user with id and also the products related to the user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const allUsers = await db('user').select();

        const products = await db("products").where("user_id", id).select();
        if (products.length > 0) {
            await db('products').where("user_id", id).delete().then(
                await db('user').where({ id }).delete()
            )
            return;
        }
        await db('user').where({ id }).delete()

        const remainingUser = allUsers.filter((ID: string) => { return ID !== id })

        return res.status(201).json({ remainingUser: remainingUser });
    } catch (error) {
        console.error(error);
    }
}