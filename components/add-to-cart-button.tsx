"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface Product {
  id: string
  name: string
  stock_quantity: number
}

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  size?: "sm" | "default" | "lg"
}

export function AddToCartButton({ product, quantity = 1, size = "sm" }: AddToCartButtonProps) {
  const { addToCart, isLoading } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const isOutOfStock = product.stock_quantity === 0

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      await addToCart(product.id, quantity)
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Button size={size} disabled={isOutOfStock || isLoading || isAdding} onClick={handleAddToCart}>
      <ShoppingCart className="h-4 w-4 mr-2" />
      {isAdding ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
