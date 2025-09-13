"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, Minus, Plus } from "lucide-react"
import { AddToCartButton } from "@/components/add-to-cart-button"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  images: string[]
  categories: { name: string } | null
  brands: { name: string } | null
  stock_quantity: number
}

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(product.image_url)
  const [quantity, setQuantity] = useState(1)
  const isOutOfStock = product.stock_quantity === 0

  const images = product.images && product.images.length > 0 ? product.images : [product.image_url]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square relative overflow-hidden rounded-lg border">
          <Image src={selectedImage || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`aspect-square relative overflow-hidden rounded border-2 transition-colors ${
                  selectedImage === image ? "border-primary" : "border-border"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          {product.brands && <p className="text-muted-foreground mb-2">{product.brands.name}</p>}
          <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</span>
            {product.categories && <Badge variant="secondary">{product.categories.name}</Badge>}
          </div>
          {isOutOfStock ? (
            <Badge variant="destructive">Out of Stock</Badge>
          ) : (
            <p className="text-muted-foreground">{product.stock_quantity} items in stock</p>
          )}
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        <Separator />

        {/* Quantity and Add to Cart */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                disabled={quantity >= product.stock_quantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <AddToCartButton product={product} quantity={quantity} size="lg" />
            </div>
            <Button variant="outline" size="lg">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Free shipping</span>
                <span>On orders over $50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Return policy</span>
                <span>30 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Warranty</span>
                <span>1 year</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
