import fs from 'fs'

class ProductManager {
    constructor() {
        this.path = []
    }
    async getProducts() {
        try {

            return fs.readFileSync('./src/products.json', 'utf-8')
            // 👆 PRODUCTOS DEL JSON.
        } catch (error) {
            console.log('error 👉', error)
        }
    }
    async addProduct(newProduct) {
        let array = this.path
         const products = fs.readFileSync('./src/products.json', 'utf-8')
         array = JSON.parse(products)
        array.push(newProduct)
        fs.writeFileSync('./src/products.json', JSON.stringify(array, null, 2), 'utf-8')
        return array
    }
    async updateProduct(newProduct) {
        let array = this.path
        const products = fs.readFileSync('./products.json', 'utf-8')
        array = JSON.parse(products)
        const newObject = array.find(prod => prod.id == newProduct.id)
        const position = array.indexOf(newObject)
        array.splice(position, 1)
        array.push(newProduct)
        array.sort((a, b) => a.id - b.id)
        fs.writeFileSync('./products.json', JSON.stringify(array, null, 2), 'utf-8')
    }
    async deleteProduct(newProduct) {
        let array = this.path
        const products = fs.readFileSync('./products.json', 'utf-8')
        array = JSON.parse(products)
        const newObject = array.find(prod => prod.id == newProduct.id)
        const position = array.indexOf(newObject)
        array.splice(position, 1)
        array.sort((a, b) => a.id - b.id)
        fs.writeFileSync('./products.json', JSON.stringify(array, null, 2), 'utf-8')
    }
}

const productManager = new ProductManager()
export default productManager
// 👆 EXPORTO LA CONSTANTE QUE INSTANCIA A LA CLASE.