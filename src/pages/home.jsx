import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, MoveUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    kicker: "01 / Connected living",
    description: "Smart essentials that keep your everyday moving, focused, and a little more effortless.",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=85",
    accent: "#dce8ff",
  },
  {
    name: "Women's clothing",
    slug: "women's clothing",
    kicker: "02 / Soft power",
    description: "Easy layers and standout pieces for your next chapter, selected to feel as good as they look.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=85",
    accent: "#f7ddd7",
  },
  {
    name: "Men's clothing",
    slug: "men's clothing",
    kicker: "03 / Everyday uniform",
    description: "Refined staples with room for your own point of view, from first coffee to last call.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=85",
    accent: "#e6e0d2",
  },
  {
    name: "Jewelry",
    slug: "jewelery",
    kicker: "04 / Finishing touches",
    description: "Small details that make the whole look feel yours, with a little shine built in.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=85",
    accent: "#f4e6b8",
  },
];

function Home() {
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("authUser")) || null;
    } catch {
      return null;
    }
  });
  const [activeCategory, setActiveCategory] = useState(0);
  const [pointer, setPointer] = useState({ x: -200, y: -200 });
  const sectionRefs = useRef([]);

  useEffect(() => {
    const sections = sectionRefs.current.filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        if (visible) setActiveCategory(Number(visible.target.dataset.index));
      },
      { threshold: [0.25, 0.6], rootMargin: "-12% 0px -35%" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function handlePointerMove(event) {
    setPointer({ x: event.clientX, y: event.clientY });
  }

  function jumpToCategory(index) {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <main className="home-experience" onPointerMove={handlePointerMove}>
      <div className="cursor-glow" style={{ left: pointer.x, top: pointer.y }} aria-hidden="true" />
      <section className="mx-auto grid w-full max-w-7xl items-end gap-10 px-4 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8 lg:pt-24">
        <div className="category-reveal max-w-xl">
          {user?.name && (
            <p className="welcome-message">Welcome, {user.name.trim().split(/\s+/)[0]}!</p>
          )}
          <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#f05d5e]">
            <Sparkles size={17} /> Curated for your everyday
          </div>
          <h1 className="hero-title max-w-2xl text-5xl font-bold leading-[0.92] tracking-tight text-[#172554] sm:text-7xl lg:text-8xl">
            Everything you do. <span>Better equipped.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-slate-500 sm:text-lg">
            Davis_Gee is your considered edit of clothes, systems, and the details that bring your world together.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#172554] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#26396f]"
          >
            Explore the collection <ArrowRight size={17} />
          </Link>
          <button type="button" onClick={() => jumpToCategory(0)} className="mt-12 flex items-center gap-3 text-sm font-semibold text-[#172554] transition hover:gap-5">
            Scroll to explore <ArrowDown size={17} />
          </button>
        </div>

        <div className="hero-collage relative min-h-100 sm:min-h-136">
          <div className="hero-collage-card hero-collage-card-back" />
          <div className="hero-collage-card hero-collage-card-front overflow-hidden rounded-4xl">
            <img src={categories[activeCategory].image} alt="A Davis_Gee collection" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
          </div>
          <div className="hero-sticker">Davis_Gee<br /><span>for every direction</span></div>
          <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#172554] shadow-lg backdrop-blur sm:bottom-8 sm:left-8">
            Currently exploring: {categories[activeCategory].name}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="category-rail mb-10 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item, index) => (
            <button key={item.slug} type="button" onClick={() => jumpToCategory(index)} className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-semibold transition ${index === activeCategory ? "bg-[#172554] text-white" : "bg-white text-slate-500 hover:bg-slate-100"}`}>
              {item.name}
            </button>
          ))}
        </div>
        <div className="mb-8 max-w-xl">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">The Davis_Gee universe</p>
            <h2 className="mt-2 text-3xl font-bold text-[#172554] sm:text-5xl">Made for every version of you.</h2>
          </div>
        </div>
        <div className="space-y-8 sm:space-y-12">
          {categories.map((item, index) => (
            <article key={item.slug} ref={(element) => { sectionRefs.current[index] = element; }} data-index={index} className="category-story grid min-h-136 overflow-hidden rounded-4xl bg-white shadow-sm lg:grid-cols-2" style={{ "--story-accent": item.accent }}>
              <div className={`category-story-image ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <img src={item.image} alt={item.name} className="h-full min-h-80 w-full object-cover" />
              </div>
              <div className={`flex flex-col justify-center p-7 sm:p-12 lg:p-16 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#f05d5e]">{item.kicker}</p>
                <h3 className="max-w-md text-4xl font-bold leading-tight text-[#172554] sm:text-5xl">{item.name}</h3>
                <p className="mt-5 max-w-md text-base leading-8 text-slate-500 sm:text-lg">{item.description}</p>
                <Link to={`/products?category=${encodeURIComponent(item.slug)}`} className="mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-[#172554] px-5 py-3 text-sm font-semibold text-[#172554] transition hover:bg-[#172554] hover:text-white">
                  Shop {item.name} <MoveUpRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;