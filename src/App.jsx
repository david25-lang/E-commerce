import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/cartcontent";
import { WishlistProvider } from "./context/wishlistcontext";
import Navbar from "./components/navbar";
// import BottomNav from "./components/buttomNav";
import Footer from "./components/footer";
import Home from "./pages/home";
import Products from "./pages/products";
import ProductDetail from "./pages/productdetail";
import Cart from "./pages/cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/wishlist";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
      <BrowserRouter>
        <Navbar />
        <div className="pb-20 md:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </div>
        {/* <BottomNav /> */}
        <div className="hidden md:block">
          <Footer />
        </div>
      </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;