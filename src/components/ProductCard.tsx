import React from 'react';
import { MessageCircle, Plus, Eye, Check } from 'lucide-react';
import { Product, Language } from '../types';
import { WHATSAPP_PHONE } from '../data/products';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onOpenDetails: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  isAdded?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  onOpenDetails,
  onQuickAdd,
  isAdded = false,
}) => {
  const isAr = lang === 'ar';
  const title = isAr ? product.titleAr : product.titleEn;
  const description = isAr ? product.descriptionAr : product.descriptionEn;
  const moqUnit = isAr ? product.moqUnitAr : product.moqUnitEn;
  const tag = isAr ? product.featuredTagAr : product.featuredTagEn;

  // Exact WhatsApp URL matching user's requested format:
  // https://wa.me/201244980362?text=أرغب%20في%20الاستفسار%20عن%20طلب%20جملة:%20<product_title>
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    isAr
      ? `أرغب في الاستفسار عن طلب جملة: ${product.titleAr} (كود: ${product.sku}) - أقل كمية: ${product.moqUnitAr}`
      : `I would like to inquire about wholesale order: ${product.titleEn} (SKU: ${product.sku}) - MOQ: ${product.moqUnitEn}`
  )}`;

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      {/* Product Image Box */}
      <div className="relative w-full aspect-[4/3] bg-neutral-100 overflow-hidden">
        {/* Optional Clean Tag */}
        {tag && (
          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase bg-slate-900 text-white rounded shadow-sm">
            {tag}
          </div>
        )}

        <img
          src={product.image}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Quick Details overlay trigger */}
        <button
          onClick={() => onOpenDetails(product)}
          className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold"
        >
          <span className="bg-slate-900/90 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md">
            <Eye className="w-4 h-4" />
            <span>{isAr ? 'معاينة المواصفات والخصومات' : 'View Specs & Tiers'}</span>
          </span>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Metadata: Category & SKU */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
            <span>{product.sku}</span>
            <span aria-hidden="true">·</span>
            <span className="font-sans font-medium text-neutral-600">
              {isAr ? product.fabricAr : product.fabricEn}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-sky-800 transition-colors">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* MOQ Callout */}
          <div className="pt-1">
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded">
              <span>{isAr ? 'أقل كمية للطلب:' : 'MOQ:'}</span>
              <span className="font-bold">{moqUnit}</span>
            </div>
          </div>
        </div>

        {/* Price & Actions Box */}
        <div className="pt-2 border-t border-neutral-100 space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="text-xl sm:text-2xl font-black text-rose-600 font-mono tracking-tight">
              {product.basePrice} <span className="text-xs font-sans font-normal text-neutral-600">{isAr ? 'ج.م / للقطعة' : 'EGP / unit'}</span>
            </div>
            {product.tiers.length > 1 && (
              <span className="text-[11px] text-neutral-500 font-medium">
                {isAr
                  ? `يبدأ من ${product.tiers[product.tiers.length - 1].pricePerUnit} ج.م للكميات`
                  : `From ${product.tiers[product.tiers.length - 1].pricePerUnit} EGP bulk`}
              </span>
            )}
          </div>

          {/* Action Buttons: WhatsApp (exact user CTA) + Add to Quote */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full bg-[#25D366] hover:bg-[#1ebd59] text-white py-2.5 px-3 rounded-lg font-bold text-xs shadow-sm transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>{isAr ? 'طلب عبر واتساب 📱' : 'Order via WhatsApp'}</span>
            </a>

            <button
              onClick={() => onQuickAdd(product)}
              className={`inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-lg font-bold text-xs transition-colors whitespace-nowrap ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{isAr ? 'تمت الإضافة للطلبية' : 'Added to Quote'}</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 shrink-0" />
                  <span>{isAr ? 'أضف لحاسبة الجملة' : 'Add to Quote'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
