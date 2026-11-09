import React, { useState } from 'react';
import { X, MessageCircle, ShoppingBag, Layers, ShieldCheck, Ruler, Palette } from 'lucide-react';
import { Product, Language } from '../types';
import { WHATSAPP_PHONE } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  lang: Language;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  lang,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const isAr = lang === 'ar';
  const [quantity, setQuantity] = useState<number>(product.moq);
  const [selectedColor, setSelectedColor] = useState<string>(
    isAr ? product.colorsAr[0] : product.colorsEn[0]
  );
  const [added, setAdded] = useState(false);

  // Compute active tier price
  const activeTier = [...product.tiers]
    .reverse()
    .find((t) => quantity >= t.minQty) || product.tiers[0];

  const currentUnitPrice = activeTier ? activeTier.pricePerUnit : product.basePrice;
  const totalPrice = currentUnitPrice * quantity;
  const standardTotal = product.basePrice * quantity;
  const savings = standardTotal - totalPrice;

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappInquiryUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    isAr
      ? `السلام عليكم برونتو فاشون، أرغب في الاستفسار عن كود (${product.sku}): ${product.titleAr} - كمية مطلوبة: ${quantity} قطعة - لون: ${selectedColor}. هل متاح شحن فوري؟`
      : `Hello Pronto Fashion, inquiring about SKU (${product.sku}): ${product.titleEn} - Requested Quantity: ${quantity} pcs - Color: ${selectedColor}. Available for immediate dispatch?`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-neutral-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-neutral-100 text-neutral-700 shadow-sm transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left / Top: Product Media */}
          <div className="md:col-span-5 bg-neutral-100 relative min-h-[260px] md:min-h-full">
            <img
              src={product.image}
              alt={isAr ? product.titleAr : product.titleEn}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {product.featuredTagAr && (
              <div className="absolute bottom-4 right-4 bg-slate-900/90 text-white text-xs font-bold px-3 py-1 rounded">
                {isAr ? product.featuredTagAr : product.featuredTagEn}
              </div>
            )}
          </div>

          {/* Right / Content */}
          <div className="md:col-span-7 p-6 sm:p-7 space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono mb-1">
                <span>{product.sku}</span>
                <span>·</span>
                <span className="text-emerald-700 font-sans font-bold">
                  {isAr ? 'متوفر بالمستودع المركزي' : 'In Stock & Ready to Dispatch'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {isAr ? product.titleAr : product.titleEn}
              </h2>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                {isAr ? product.descriptionAr : product.descriptionEn}
              </p>
            </div>

            {/* Fabric & Technical Specs */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 text-xs">
              <div>
                <div className="text-neutral-500 flex items-center gap-1.5 font-medium">
                  <Layers className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{isAr ? 'الخامة والنسيج:' : 'Fabric Material:'}</span>
                </div>
                <div className="font-bold text-slate-800 mt-1">
                  {isAr ? product.fabricAr : product.fabricEn}
                </div>
              </div>
              {product.gsmWeight && (
                <div>
                  <div className="text-neutral-500 flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{isAr ? 'الوزن وسماكة القماش:' : 'Density / GSM:'}</span>
                  </div>
                  <div className="font-bold text-slate-800 mt-1">{product.gsmWeight}</div>
                </div>
              )}
            </div>

            {/* Sizes & Colors in Dozen */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-700">
                <span className="flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" />
                  {isAr ? 'الألوان المتاحة في السيريه:' : 'Color Assortment:'}
                </span>
                <span className="text-neutral-500 font-normal">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(isAr ? product.colorsAr : product.colorsEn).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      selectedColor === c
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-neutral-700 pt-1">
                <span className="flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5" />
                  {isAr ? 'توزيع المقاسات في كل كرتونة/دستة:' : 'Sizes Packed Per Dozen:'}
                </span>
                <span className="text-neutral-500 font-normal">
                  {product.sizes.join(' - ')}
                </span>
              </div>
            </div>

            {/* Wholesale Tier Discount Table */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-800">
                {isAr ? 'جدول أسعار الجملة وخصومات الكميات:' : 'Volume Discount Tiers:'}
              </div>
              <div className="space-y-1.5">
                {product.tiers.map((t) => {
                  const isActive = quantity >= t.minQty && (activeTier?.minQty === t.minQty);
                  return (
                    <div
                      key={t.minQty}
                      className={`flex items-center justify-between p-2.5 rounded-lg text-xs transition-colors ${
                        isActive
                          ? 'bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold'
                          : 'bg-neutral-50 text-neutral-700 border border-neutral-100'
                      }`}
                    >
                      <span>{isAr ? t.labelAr : t.labelEn}</span>
                      <span className="font-mono text-sm font-black">
                        {t.pricePerUnit} {isAr ? 'ج.م' : 'EGP'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector & Live Total */}
            <div className="pt-2 border-t border-neutral-100 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-neutral-500 font-medium">
                    {isAr ? 'الكمية المطلوبة (بالقطع):' : 'Order Quantity (Units):'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(product.moq, quantity - product.boxPackQuantity))}
                      className="w-8 h-8 rounded border border-neutral-300 flex items-center justify-center font-bold text-sm hover:bg-neutral-100"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={product.moq}
                      step={product.boxPackQuantity}
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || product.moq;
                        setQuantity(Math.max(product.moq, val));
                      }}
                      className="w-16 h-8 text-center border border-neutral-300 rounded font-mono font-bold text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + product.boxPackQuantity)}
                      className="w-8 h-8 rounded border border-neutral-300 flex items-center justify-center font-bold text-sm hover:bg-neutral-100"
                    >
                      +
                    </button>
                    <span className="text-xs text-neutral-500 mr-2 rtl:mr-2 rtl:ml-0 ltr:ml-2">
                      ({Math.round(quantity / product.boxPackQuantity)}{' '}
                      {isAr ? 'دستة/سيريه' : 'packs'})
                    </span>
                  </div>
                </div>

                <div className="text-right rtl:text-right ltr:text-left">
                  <div className="text-xs text-neutral-500">
                    {isAr ? 'إجمالي سعر الجملة:' : 'Calculated Subtotal:'}
                  </div>
                  <div className="text-2xl font-black text-rose-600 font-mono">
                    {totalPrice.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
                  </div>
                  {savings > 0 && (
                    <div className="text-[11px] text-emerald-700 font-bold">
                      {isAr ? `وفرت ${savings.toLocaleString()} ج.م خصم كميات!` : `Saved ${savings} EGP volume discount!`}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {added
                      ? (isAr ? 'تمت إضافة الكمية للسلة ✓' : 'Added to Quote ✓')
                      : (isAr ? `أضف ${quantity} قطعة للطلبية` : `Add ${quantity} pcs to Quote`)}
                  </span>
                </button>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-[#25D366] hover:bg-[#1ebd59] text-white shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{isAr ? 'استفسار فوري واتساب 📱' : 'Instant WhatsApp PO'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
