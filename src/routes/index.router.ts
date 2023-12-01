import express from 'express';

export const router = express.Router();
import { signupUser, loginUser, allUsers, addUser, getUserById, updateUser, deleteUser } from '../dao/user.modal';
import { addProductInfo, getUserProduct } from "../dao/products.modal";
router.post('/signup', signupUser)
router.post('/login', loginUser)


// todo --get,post, update, delete  
// user
router.get("/allUsers",allUsers )
router.post("/addUser", addUser)
router.get("/getUserById/:id", getUserById)
router.put("/updateUser/:id", updateUser)
router.delete("/deleteUser/:id", deleteUser)

// todo --relations, join column, foreign key, constraints

// products
router.post("/addProductInfo",addProductInfo )
router.get("/getUserProduct/:id", getUserProduct)   
module.exports = {router}