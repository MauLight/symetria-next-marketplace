import { toast } from "react-toastify"
import { ProductProps } from "../types/types"

interface DescriptionProps {
    id: string;
    title: string;
    discount: number;
    price: number;
}


export function getPercentage(discount: number, price: number) {
    const percentage = discount ? (discount / 100) * price : 0
    return (price - percentage)
}


//* Save product list in localStorage ('marketplace-cart')
//* If the product is already in the cart, update the quantity
//* If the product is not in the cart, add it
//* Show a toast message
export function addToCart({ id, title, discount, price }: DescriptionProps) {

    const product = {
        id,
        title,
        discount,
        price
    }

    const cart = localStorage.getItem('marketplace-cart')

    if (cart) {
        const cartItems = JSON.parse(cart)
        const productIndex = cartItems.findIndex((item: ProductProps) => item.id === product.id)
        if (productIndex === -1) {
            cartItems.push(product)
        } else {
            cartItems[productIndex] = product
        }
        localStorage.setItem('marketplace-cart', JSON.stringify(cartItems))
    } else {
        localStorage.setItem('marketplace-cart', JSON.stringify([product]))
    }

    toast.success('Product added to cart.')
}