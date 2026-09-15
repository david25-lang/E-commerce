import { Heart, ShoppingBag, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/productcard";
import { useWishlist } from "../context/wishlistcontext";

function Wishlist() {
  const { wishlistItems } = useWishlist();

  return (
    <main className="mx-auto min-h-[70vh] w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-16">
      <header className="wishlist-header relative overflow-hidden rounded-[2rem] bg-[#eef1f8] px-6 py-10 sm:px-12 sm:py-14">
        <div className="relative z-10 max-w-xl">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#f05d5e]"><Sparkles size={16} /> Your quiet edit</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#172554] sm:text-6xl">Things worth keeping close.</h1>
          <p className="mt-5 max-w-md text-base leading-7 text-slate-500">Save the pieces that caught your eye. They will be waiting here whenever you are ready.</p>
        </div>
        <Heart className="wishlist-header-icon" size={170} strokeWidth={1} aria-hidden="true" />
      </header>

      {wishlistItems.length === 0 ? (
        <section className="wishlist-empty mx-auto flex max-w-lg flex-col items-center px-6 py-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f7ddd7] text-[#f05d5e]">
            <Heart size={34} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-bold text-[#172554]">Your list is still being written.</h2>
          <p className="mt-3 leading-7 text-slate-500">Browse the collection and tap the heart when something feels like you.</p>
          <Link to="/products" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#172554] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#26396f]"><ShoppingBag size={17} /> Discover products</Link>
        </section>
      ) : (
        <section className="pt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#172554]">Saved for later</h2>
            <span className="text-sm text-slate-400">{wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {wishlistItems.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>
      )}
    </main>
  );
}

export default Wishlist;