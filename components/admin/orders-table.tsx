"use client"

import { useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

interface Order {
  id: string
  total_amount: number
  status: string
  created_at: string
  shipping_address: string
  profiles: {
    first_name: string
    last_name: string
    email: string
  } | null
}

interface OrdersTableProps {
  orders: Order[]
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId)
    try {
      const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", orderId)
      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error("Error updating order status:", error)
    } finally {
      setUpdatingStatus(null)
    }
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No orders found</p>
        <p className="text-sm text-muted-foreground mt-2">Orders will appear here once customers place them</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-mono text-sm">{order.id.slice(0, 8)}...</TableCell>
            <TableCell>
              <div>
                <p className="font-medium">
                  {order.profiles?.first_name || "N/A"} {order.profiles?.last_name || ""}
                </p>
                <p className="text-sm text-muted-foreground">{order.profiles?.email || "No email"}</p>
              </div>
            </TableCell>
            <TableCell>${order.total_amount.toFixed(2)}</TableCell>
            <TableCell>
              <Badge className={statusColors[order.status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}>
                {order.status}
              </Badge>
            </TableCell>
            <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
            <TableCell>
              <Select
                value={order.status}
                onValueChange={(value) => handleStatusUpdate(order.id, value)}
                disabled={updatingStatus === order.id}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
