import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Discover Amazing Products at Great Prices
          </h1>
          <p className="text-xl text-slate-200 mb-8 text-pretty">
            Shop from thousands of products across electronics, fashion, home goods, and more. Free shipping on orders
            over $50.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
            >
              View Categories
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/20"></div>
    </section>
  )
}
