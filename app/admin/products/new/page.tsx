import { requireAdmin } from "@/lib/admin-auth"
import { ProductForm } from "@/components/admin/product-form"

export const dynamic = "force-dynamic"

export default async function NewProductPage() {
  const { supabase } = await requireAdmin()

  // Get categories and brands for the form
  const [{ data: categories }, { data: brands }] = await Promise.all([
    supabase.from("categories").select("*").order("name"),
    supabase.from("brands").select("*").order("name"),
  ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New Product</h1>
        <p className="text-muted-foreground">Create a new product in your catalog</p>
      </div>

      <ProductForm categories={categories || []} brands={brands || []} />
    </div>
  )
}
