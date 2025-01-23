import { Router } from "express";
import { v4 as uuidv4 } from 'uuid'
import cM from "./cartManager.js";

const cartRouter = Router()

cartRouter.post('/cart', async (req, res) => {
    // CREACION DEL ARRAY 👆
    //http://localhost:8080/api/cart 👈
    const { body } = req
    const obj = {
        id: uuidv4(),
        products: body.products
    }
    const cartProducts = await cM.createArray(obj)
    if (cartProducts) {
        res.status(201).json(cartProducts)
        console.log(cartProducts)
    }
    else {
        res.status(404).json({ message: "cart not created" })
    }
})

cartRouter.get('/cart/:cartID', async (req, res) => {
    // 👆 ARRAY CON LOS OBJETOS
    const { cartID } = req.params
    const products = await cM.getProducts() // 👈 PRODUCTOS DEL JSON
    const parseObjects = JSON.parse(products)
    const arrayFound = parseObjects.find(obj => obj.id === cartID)
    if (arrayFound) {
        res.status(200).json(arrayFound)
        console.log(arrayFound)
    }
    else {
        res.status(404).json({ message: "the are not products in the array or the id is not correct" })
        console.log(arrayFound)
    }
})

cartRouter.post('/cart/:cartID/products/:prodID', async (req, res) => {
    // 👆 BUSCO EL ARRAY CREADO Y EL PRODUCTO, SI EXSITE,
    // SI NO EXISTE SE CREA UN NUEVO OBJETO CON UNA CANTIDAD.
    // HAY QUE PASAR EL ID DEL OBJETO QUE SE CREA PARA SABER SI EXISTE O NO.
    const { cartID } = req.params
    const { prodID } = req.params
    const { newQuantity } = req.body
    const products = await cM.getProducts()
    const parseObjects = JSON.parse(products)
    const arrayFound = parseObjects.find(obj => obj.id === cartID)
    const prod = arrayFound.products.find(obj => obj.id === prodID)
    if (prod) {
        const obj = {
            newQuantity 
        }
        const product = await cM.addProduct(obj)// 👈 ACTUALIZO LA CANTIDAD
        res.status(200).json({ message: "Object exists" })
        console.log(product)
        return
    }
    if (arrayFound) {
        // 👇 CREO UN PRODUCTO
        const obj = {
            id:uuidv4(),
            quantity
        }
        const product = await cM.addProduct(obj)
        res.status(200).json(obj)
        console.log(product)
        return
    }

    else {
        res.status(404).json({ message: "not added" })
        console.log(products)
        return
    }
})

export default cartRouter