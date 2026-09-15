import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/productcard";

const categories = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];

function formatProduct(product) {
  return {
    id: product.id,
    name: product.title,
    price: product.price,
    image: product.image,
    description: product.description,
    category: product.category,
  };
}

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const activeCategory = searchParams.get("category") || "all";

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
        return response.json();
      })
      .then((data) => setProducts(data.map(formatProduct)))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  const visibleProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  function updateCategory(category) {
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f05d5e]">The complete edit</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#172554] sm:text-5xl">All products</h1>
          <p className="mt-3 max-w-xl text-slate-500">Everything in one place, ready for your next great find.</p>
        </div>
        <span className="text-sm text-slate-400">{visibleProducts.length} items</span>
      </header>

      <div className="mb-8 flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm sm:flex-row">
        <label className="flex flex-1 items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <span className="sr-only">Search products</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="w-full bg-transparent text-sm outline-none" />
        </label>
        <div className="flex items-center gap-2 overflow-x-auto">
          <SlidersHorizontal size={17} className="ml-2 shrink-0 text-slate-400" />
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => updateCategory(category)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold capitalize transition ${activeCategory === category ? "bg-[#172554] text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="rounded-xl bg-red-50 p-4 text-red-600">Could not load products: {error}</p>}
      {loading && <p className="py-12 text-center text-slate-400">Loading the collection...</p>}
      {!loading && !error && visibleProducts.length === 0 && <p className="py-12 text-center text-slate-400">No products match that search.</p>}
      {!loading && !error && visibleProducts.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </main>
  );
}

export default Products;