"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CheckCircle, XCircle, Clock, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface OrderItem {
  id: string
  quantity: number
  price: number
  product: {
    name: string
    image_url: string
    price: number
    description: string
  }
}

interface Order {
  id: string
  total_amount: number
  status: string
  created_at: string
  updated_at: string
  shipping_address: string
  order_items: OrderItem[]
}

interface OrderDetailsProps {
  order: Order
}

const statusConfig = {
  pending: {
    label: "Order Pending",
    description: "Your order has been received and is being processed",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  processing: {
    label: "Processing",
    description: "Your order is being prepared for shipment",
    color: "bg-blue-100 text-blue-800",
    icon: Package,
  },
  shipped: {
    label: "Shipped",
    description: "Your order is on its way to you",
    color: "bg-purple-100 text-purple-800",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    description: "Your order has been delivered successfully",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    description: "This order has been cancelled",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
  },
}

export function OrderDetails({ order }: OrderDetailsProps) {
  const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending
  const StatusIcon = status.icon

  const subtotal = order.order_items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const shipping = subtotal > 50 ? 0 : 9.99

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/orders">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Order #{order.id.slice(0, 8)}</h1>
          <p className="text-muted-foreground">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Order Status */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${status.color}`}>
              <StatusIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{status.label}</h3>
              <p className="text-muted-foreground">{status.description}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Last updated: {new Date(order.updated_at).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.order_items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  <div className="relative h-20 w-20 overflow-hidden rounded border">
                    <Image
                      src={item.product.image_url || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.product.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">
                        Quantity: {item.quantity} × ${item.price.toFixed(2)}
                      </span>
                      <span className="font-semibold">${(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary & Shipping */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${order.total_amount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{order.shipping_address}</p>
            </CardContent>
          </Card>

          {/* Order Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Order Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {order.status === "delivered" && <Button className="w-full">Reorder Items</Button>}
              {(order.status === "pending" || order.status === "processing") && (
                <Button variant="destructive" className="w-full">
                  Cancel Order
                </Button>
              )}
              <Button variant="outline" className="w-full bg-transparent">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
