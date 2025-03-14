import { ProductProps } from "../types/types"

export function getPercentage(product: ProductProps) {
    const percentage = product.discount
    const price = product.price
    const discount = percentage ? (percentage / 100) * price : 0
    return (price - discount)
}