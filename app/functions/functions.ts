import { toast } from "react-toastify"
import { DecodedProps, ProductProps } from "../types/types"
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { jwtDecode } from "jwt-decode"
import CryptoJS from 'crypto-js'

const cloudinaryApiSecret = process.env.VITE_CLOUDINARY_APISECRET
const CloudinaryCloudName = process.env.VITE_CLOUDINARY_CLOUDNAME

interface DescriptionProps {
    id: string;
    title: string;
    discount: number;
    price: number;
    image: string;
}

interface CloudinaryResponseData {
    secure_url: string;
    public_id: string;
    // add additional response fields as needed
}


export function getPercentage(discount: number, price: number) {
    const percentage = discount ? (discount / 100) * price : 0
    return (price - percentage)
}


//* Save product list in localStorage ('marketplace-cart')
//* If the product is already in the cart, update the quantity
//* If the product is not in the cart, add it
//* Show a toast message
export function addToCart({ id, title, discount, price, image }: DescriptionProps) {

    const product = {
        id,
        title,
        discount,
        price,
        image,
        quantity: 1
    }

    const cart = localStorage.getItem('marketplace-cart')

    if (cart) {
        const cartItems = JSON.parse(cart)
        const productIndex = cartItems.findIndex((item: ProductProps) => item.id === product.id)
        if (productIndex === -1) {
            cartItems.push(product)
        } else {
            cartItems[productIndex] = { ...product, quantity: cartItems[productIndex].quantity + 1 }
        }
        localStorage.setItem('marketplace-cart', JSON.stringify(cartItems))
    } else {
        localStorage.setItem('marketplace-cart', JSON.stringify([product]))
    }

    toast.success('Product added to cart.')
}

export const postToCloudinary = async (formData: FormData, setError?: Dispatch<SetStateAction<string | null>>): Promise<CloudinaryResponseData | unknown> => {
    try {
        const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${CloudinaryCloudName}/image/upload`, formData)
        return data
    } catch (error) {
        console.log(error)
        if (setError) {
            setError((error as Record<string, string>).message)
        }
        return error
    }
}

export function handleDecodeToken(token: string) {

    const decoded: DecodedProps = jwtDecode(token)
    const currentTime = Date.now() / 1000

    if (decoded.role !== 'admin') {
        toast.error('Wrong credentials.')
        return false
    }

    if (decoded.exp < currentTime) {
        toast.error('Token expired, please try again.')
        return false
    }

    return true
}

export function generateSignature(params: { public_id: string, timestamp: number }): string {
    const sortedParams = Object.keys(params).sort().map(key => `${key}=${params[key as keyof typeof params]}`).join('&')
    const stringToSign = `${sortedParams}${cloudinaryApiSecret}`
    const hash = CryptoJS.SHA1(stringToSign)

    return hash.toString(CryptoJS.enc.Hex)
}