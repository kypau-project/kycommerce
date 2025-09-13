import { createClient } from "@/lib/supabase/server"
import { ProductGrid } from "@/components/product-grid"
import { CategoryFilter } from "@/components/category-filter"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"

export default async function HomePage() {
  const supabase = createClient()

  // Fetch products with category and brand information
  const { data: products } = await supabase
    .from("products")
    .select(`
      *,
      categories(name),
      brands(name)
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  // Fetch categories for filter
  const { data: categories } = await supabase.from("categories").select("*").order("name")

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <CategoryFilter categories={categories || []} />
            </aside>
            <div className="flex-1">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Featured Products</h2>
                <p className="text-muted-foreground">Discover our latest and most popular items</p>
              </div>
              <ProductGrid products={products || []} />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
