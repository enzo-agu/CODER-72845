import fs from 'fs'

class CartManager {
    constructor() {
        this.path = []
    }
    async createArray(obj) {
        try {
            this.path.push(obj)
            fs.writeFileSync('./cart.json', JSON.stringify(this.path, null, 2), 'utf-8')
            return this.path
            // 👆 CREO EL ARRAY
        } catch (error) {
            console.log('error 👉', error)
        }
    }
    async getProducts() {
        // ENVÍO LOS OBJETOS 👇, SI EXISTE EL ARRAY, SINO UN MENSAJE
        try {
            if (!fs.readFileSync('./cart.json', 'utf-8')) {
                return console.log('You have to create the array')
            }
            return fs.readFileSync('./cart.json', 'utf-8')
        } catch (error) {
            console.log('error 👉', error)

        }
    }
    async addProduct(obj) {
        // 👇 MÉTODO PARA CREAR EL NUEVO OBJETO Y ACTUALIZAR LA CANTIDAD.
        const products = fs.readFileSync('./cart.json', 'utf-8')
        let array = JSON.parse(products)
        array[0].products.push(obj)
        const newArray=[...array]
        fs.writeFileSync('./cart.json', JSON.stringify(newArray, null, 2), 'utf-8')
        return console.log(array)
    }
}

const cartManager = new CartManager()
export default cartManager
// 👆 EXPORTO LA CONSTANTE QUE INSTANCIA A LA CLASE.