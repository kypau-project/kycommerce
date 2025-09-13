"use client"

import { useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Category {
  id: string
  name: string
  description: string | null
  created_at: string
}

interface CategoriesTableProps {
  categories: Category[]
}

export function CategoriesTable({ categories: initialCategories }: CategoriesTableProps) {
  const [categories, setCategories] = useState(initialCategories)
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    setLoading(id)
    const { error } = await supabase.from("categories").delete().eq("id", id)

    if (!error) {
      setCategories(categories.filter((cat) => cat.id !== id))
    }
    setLoading(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">{category.name}</h3>
                {category.description && <p className="text-sm text-muted-foreground">{category.description}</p>}
                <p className="text-xs text-muted-foreground">
                  Created: {new Date(category.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(category.id)}
                  disabled={loading === category.id}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
