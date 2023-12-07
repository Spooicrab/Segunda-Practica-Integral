import { ProductsService } from "../services/Product.services.js"
import { CartService } from "../services/Cart.services.js"

class ViewController {

    Home =
        async (req, res) => {
            let Productos = await ProductsService.GetAll(req.query)
            console.log(req.user);
            res.render('allproducts', (
                {
                    Productos,
                    first_name: req.user.first_name,
                    email: req.user.email,
                    role: req.user.role,
                    cart: req.user.cart
                }
            ))
        }

    Carrito =
        async (req, res) => {
            const { cid } = req.params
            try {
                let cartid = await CartService.findByID(cid)
                const CarritoUsuario = cartid.Products
                // console.log(CarritoUsuario)
                res.render('cartId', { products: CarritoUsuario })
            } catch (error) { console.log(error) }
        }

    AñadirProducto =
        async (req, res) => {
            const { title, description, price, stock, code, thumbail, } = req.body;
            if (!title || !price || !code || !stock) {
                return res.status(400).json({ message: "Faltan datos" })
            }
            if (!stock) {
                delete req.body.stock;
            }
            try {
                const Add = await ProductManager.Add(req.body);
                res
                    .status(200)
                    .json({ message: "Añadido", product: Add });
            } catch (err) { res.status(500).json({ error: err.message }) }
        }

    login =
        async (req, res) => {
            res.render('login')
        }

    error =
        async (req, res) => {
            res.render('error')
        }

    signup =
        async (req, res) => {
            res.render('registro')
        }
}

export const ViewsController = new ViewController()