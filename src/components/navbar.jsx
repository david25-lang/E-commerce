import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingBag, ShoppingCart, X } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="hidden items-center justify-between border-b bg-white/80 px-10 py-5 backdrop-blur md:flex">
        <Link to="/" className="brand-lockup group" aria-label="Davis Gee Store home">
          <span className="brand-mark" aria-hidden="true">
            <ShoppingBag size={17} strokeWidth={2.4} />
          </span>
          <span className="brand-name">
            <span className="brand-name-main">Davis_Gee</span>
            <span className="brand-name-sub">Store</span>
          </span>
        </Link>
        <div className="flex items-center gap-8 text-sm">
          <Link to="/" className="hover:text-gray-500">Home</Link>
          <Link to="/products" className="hover:text-gray-500">Products</Link>
          <Link to="/wishlist" className="hover:text-gray-500">Wishlist</Link>
          <Link to="/account" className="hover:text-gray-500">Account</Link>
          <Link to="/cart" className="flex items-center gap-1 hover:text-gray-500">
            <ShoppingCart size={18} /> Cart
          </Link>
        </div>
      </nav>

      <nav className="relative z-30 flex items-center justify-between border-b bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#172554] transition hover:bg-[#eef1f8]"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" className="brand-lockup group scale-90" aria-label="Davis Gee Store home">
          <span className="brand-mark" aria-hidden="true">
            <ShoppingBag size={16} strokeWidth={2.4} />
          </span>
          <span className="brand-name">
            <span className="brand-name-main">Davis_Gee</span>
            <span className="brand-name-sub">Store</span>
          </span>
        </Link>

        <Link
          to="/cart"
          onClick={closeMenu}
          aria-label="Shopping cart"
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#172554] transition hover:bg-[#eef1f8]"
        >
          <ShoppingCart size={20} />
        </Link>

        {menuOpen && (
          <div className="absolute left-3 right-3 top-full mt-2 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl">
            <div className="flex flex-col text-sm font-medium text-[#172554]">
              <Link to="/" onClick={closeMenu} className="rounded-xl px-4 py-3 hover:bg-[#f5f6fa]">Home</Link>
              <Link to="/products" onClick={closeMenu} className="rounded-xl px-4 py-3 hover:bg-[#f5f6fa]">Products</Link>
              <Link to="/wishlist" onClick={closeMenu} className="rounded-xl px-4 py-3 hover:bg-[#f5f6fa]">Wishlist</Link>
              <Link to="/account" onClick={closeMenu} className="rounded-xl px-4 py-3 hover:bg-[#f5f6fa]">Account</Link>
              <Link to="/cart" onClick={closeMenu} className="rounded-xl px-4 py-3 hover:bg-[#f5f6fa]">Cart</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;