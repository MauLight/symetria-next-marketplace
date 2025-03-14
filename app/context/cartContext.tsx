"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { toast } from "react-toastify"

export interface ProductProps {
    id: string;
    title: string;
    discount: number;
    price: number;
    image: string;
    quantity: number;
}

interface CartContextType {
    cart: ProductProps[];
    addToCart: (product: Omit<ProductProps, "quantity">) => void;
    subtractFromCart: (product: Omit<ProductProps, "quantity">) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
    const [cart, setCart] = useState<ProductProps[]>([])

    // Initialize cart from localStorage when component mounts
    useEffect(() => {
        const storedCart = localStorage.getItem("marketplace-cart")
        if (storedCart) {
            setCart(JSON.parse(storedCart))
        }
    }, [])

    // Persist cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("marketplace-cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = (product: Omit<ProductProps, "quantity">) => {
        setCart((prevCart) => {
            const productIndex = prevCart.findIndex(item => item.id === product.id)
            if (productIndex === -1) {
                toast.success("Product added to cart.")
                return [...prevCart, { ...product, quantity: 1 }]
            } else {
                toast.success("Product quantity updated.")
                return prevCart.map((item, idx) =>
                    idx === productIndex ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
        })
    }

    const subtractFromCart = (product: Omit<ProductProps, "quantity">) => {
        setCart((prevCart) => {
            const productIndex = prevCart.findIndex(item => item.id === product.id)
            if (productIndex === -1) {
                return prevCart
            } else {
                toast.success("Product quantity updated.")
                return prevCart.map((item, idx) =>
                    idx === productIndex ? { ...item, quantity: item.quantity === 1 ? 1 : item.quantity - 1 } : item
                )
            }
        })
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, subtractFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}