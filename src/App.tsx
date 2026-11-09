import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  MessageCircle,
  ShoppingBag,
  Package,
  Layers,
  ArrowUpDown,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WholesaleQuoteDrawer } from './components/WholesaleQuoteDrawer';
import { SampleRequestModal } from './components/SampleRequestModal';
import { WholesaleTermsSection } from './components/WholesaleTermsSection';
import { Footer } from './components/Footer';
import { PRODUCTS, WHATSAPP_PHONE, DISPLAY_PHONE } from './data/products';
import { Product, CartItem, Language, ProductCategory } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'moq-asc'>('featured');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initial suggested starter pack in cart for first-time store preview
    return [
      { product: PRODUCTS[0], quantity: 24, selectedColor: PRODUCTS[0].colorsAr[0] },
      { product: PRODUCTS[1], quantity: 20, selectedColor: PRODUCTS[1].colorsAr[0] },
    ];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [detailModalProduct, setDetailModalProduct] = useState<Product | null>(null);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const isAr = lang === 'ar';

  // Keep HTML lang and dir synchronized
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  // Cart operations
  const handleQuickAdd = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + product.boxPackQuantity }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity: product.moq,
          selectedColor: isAr ? product.colorsAr[0] : product.colorsEn[0],
        },
      ];
    });

    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1800);
  };

  const handleAddToCartWithDetails = (product: Product, quantity: number, color?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity, selectedColor: color || item.selectedColor }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor: color || (isAr ? product.colorsAr[0] : product.colorsEn[0]),
        },
      ];
    });
    setDetailModalProduct(null);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle =
          product.titleAr.toLowerCase().includes(query) ||
          product.titleEn.toLowerCase().includes(query);
        const matchSku = product.sku.toLowerCase().includes(query);
        const matchDesc =
          product.descriptionAr.toLowerCase().includes(query) ||
          product.descriptionEn.toLowerCase().includes(query);
        const matchFabric =
          product.fabricAr.toLowerCase().includes(query) ||
          product.fabricEn.toLowerCase().includes(query);

        if (!matchTitle && !matchSku && !matchDesc && !matchFabric) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      if (sortBy === 'moq-asc') return a.moq - b.moq;
      return 0; // featured original order
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const totalCartPieces = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-slate-900 font-sans">
      {/* Top Banner Notice for Wholesale Buyers */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="font-semibold text-white">
              {isAr ? 'عروض توريد الموسم الجديد:' : 'New Season Wholesale Lots:'}
            </span>
            <span className="text-slate-300 hidden sm:inline">
              {isAr
                ? 'خصومات إضافية تصل إلى 15% على كراتين التوريد الكبرى وشحن مجاني للطلبيات فوق 15,000 ج.م'
                : 'Extra 15% discount on master carton bulk orders + free delivery over 15,000 EGP'}
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0 font-mono text-[11px]">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
            >
              <span>واتساب المبيعات:</span>
              <span dir="ltr">{DISPLAY_PHONE}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <Header
        lang={lang}
        onToggleLang={toggleLang}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSamples={() => setIsSampleModalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          lang={lang}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenSamples={() => setIsSampleModalOpen(true)}
        />

        {/* Catalog Section */}
        <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Exact catalog title header requested in user's prompt */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-neutral-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">
                <Package className="w-4 h-4" />
                <span>{isAr ? 'الكتالوج التجاري المحدث' : 'Active Wholesale Inventory'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 border-r-4 border-rose-600 pr-3 rtl:border-r-4 rtl:pr-3 ltr:border-l-4 ltr:border-r-0 ltr:pl-3 ltr:pr-0">
                {isAr ? 'كتالوج الملابس المتاحة بالجملة' : 'Available Wholesale Clothing Catalog'}
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span>
                {isAr
                  ? `عرض ${filteredProducts.length} من أصل ${PRODUCTS.length} صنف جاهز للشحن`
                  : `Showing ${filteredProducts.length} of ${PRODUCTS.length} ready-to-ship styles`}
              </span>
            </div>
          </div>

          {/* Filter Bar & Search */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              {/* Category Segmented Buttons */}
              <div className="flex items-center gap-1.5 p-1 bg-neutral-200/80 rounded-xl overflow-x-auto">
                {[
                  { id: 'all', labelAr: 'كافة الأصناف', labelEn: 'All Styles' },
                  { id: 'shirts', labelAr: 'قمصان كاجوال', labelEn: 'Casual Shirts' },
                  { id: 'pants', labelAr: 'بناطيل وجينز', labelEn: 'Jeans & Pants' },
                  { id: 'tshirts', labelAr: 'تيشيرتات وميلتون', labelEn: 'T-Shirts & Polos' },
                  { id: 'winter', labelAr: 'هوديز وشتوي', labelEn: 'Winter Hoodies' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id as ProductCategory)}
                    className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                      selectedCategory === cat.id
                        ? 'bg-white text-slate-950 shadow-xs'
                        : 'text-neutral-700 hover:text-slate-950 hover:bg-neutral-200'
                    }`}
                  >
                    {isAr ? cat.labelAr : cat.labelEn}
                  </button>
                ))}
              </div>

              {/* Search & Sort Controls */}
              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-neutral-400 absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      isAr ? 'بحث بالاسم، الكود، أو الخامة...' : 'Search style, SKU, fabric...'
                    }
                    className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 text-xs rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                {/* Sort */}
                <div className="relative shrink-0">
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'moq-asc')
                    }
                    className="py-2 px-3 text-xs rounded-lg border border-neutral-300 bg-white font-medium text-neutral-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="featured">
                      {isAr ? 'الترتيب: الأكثر طلباً' : 'Sort: Featured Bestsellers'}
                    </option>
                    <option value="price-asc">
                      {isAr ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}
                    </option>
                    <option value="price-desc">
                      {isAr ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}
                    </option>
                    <option value="moq-asc">
                      {isAr ? 'أقل كمية للطلب (MOQ)' : 'Lowest MOQ First'}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200 p-8">
              <Package className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">
                {isAr ? 'لا توجد أصناف مطابقة للبحث' : 'No matching wholesale products found'}
              </h3>
              <p className="text-xs text-neutral-500 mt-1 mb-4">
                {isAr
                  ? 'جرب تغيير كلمات البحث أو اختيار تصنيف آخر من القائمة أعلاه.'
                  : 'Try adjusting your search query or reset category filters.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-bold bg-slate-900 text-white rounded-lg"
              >
                {isAr ? 'عرض كافة المنتجات' : 'Show All Styles'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  lang={lang}
                  onOpenDetails={(p) => setDetailModalProduct(p)}
                  onQuickAdd={handleQuickAdd}
                  isAdded={recentlyAddedId === product.id}
                />
              ))}
            </div>
          )}

          {/* Quote Calculator Direct Callout Banner */}
          <div className="mt-14 p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-slate-800">
            <div className="space-y-2 text-right rtl:text-right ltr:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>{isAr ? 'عرض سعر فوري لمتاجرك' : 'Instant Store Quotation'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                {isAr
                  ? 'هل تريد حجز كميات كبرى أو تجهيز افتتاح محل جديد؟'
                  : 'Planning a boutique opening or bulk container order?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                {isAr
                  ? 'احسب قيمة طلبيتك بالكرتونة والدستة، واعرف خصم الكميات المباشر وتكلفة الشحن لمحافظتك مع إمكانية طباعة فاتورة مبدئية.'
                  : 'Calculate your exact wholesale lot, live carton discounts, freight per governorate, and generate proforma invoices.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {isAr ? `فتح حاسبة الطلبية (${totalCartPieces} قطعة)` : `Open Quote (${totalCartPieces} pcs)`}
                </span>
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                  isAr
                    ? 'أهلاً برونتو فاشون، نجهز لافتتاح متجر ملابس ونحتاج كشف كامل بأسعار الجملة للكميات الكبرى.'
                    : 'Hello Pronto Fashion, preparing for a new boutique launch and need bulk supply pricing.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#1ebd59] rounded-xl shadow-md transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{isAr ? 'محادثة المبيعات المباشرة' : 'Direct WhatsApp Chat'}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Wholesale Logistics & Guarantee Terms */}
        <WholesaleTermsSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Floating WhatsApp Action Button */}
      <aside aria-label="Support and Quick Order" className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40">
        <a
          href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
            isAr
              ? 'مرحباً برونتو فاشون، أرغب في الاستفسار عن كشف أسعار ملابس الجملة المتاحة والتوصيل.'
              : 'Hello Pronto Fashion, inquiring about wholesale clothing catalog and delivery.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#1ebd59] text-white rounded-full shadow-2xl hover:scale-105 transition-all text-xs font-bold border-2 border-white"
          title="تواصل مباشر عبر واتساب"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline">
            {isAr ? 'واتساب الجملة' : 'Wholesale Desk'}
          </span>
        </a>
      </aside>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={detailModalProduct}
        lang={lang}
        onClose={() => setDetailModalProduct(null)}
        onAddToCart={handleAddToCartWithDetails}
      />

      {/* Wholesale Quote Drawer */}
      <WholesaleQuoteDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        lang={lang}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Sample Request Modal */}
      <SampleRequestModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
