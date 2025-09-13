"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface CartItemProps {
  item: {
    id: string
    product_id: string
    quantity: number
    product: {
      id: string
      name: string
      price: number
      image_url: string
      stock_quantity: number
    }
  }
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.product_id)
    } else {
      updateQuantity(item.product_id, newQuantity)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
            <Image
              src={item.product.image_url || "/placeholder.svg"}
              alt={item.product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 space-y-2">
            <Link href={`/products/${item.product.id}`}>
              <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                {item.product.name}
              </h3>
            </Link>
            <p className="text-lg font-semibold">${item.product.price.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">{item.product.stock_quantity} in stock</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product_id)}>
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-3 py-2 min-w-[3rem] text-center">{item.quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={item.quantity >= item.product.stock_quantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
