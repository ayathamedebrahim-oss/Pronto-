import React from 'react';
import { MessageCircle, ShoppingBag, Globe } from 'lucide-react';
import { Language } from '../types';
import { WHATSAPP_PHONE } from '../data/products';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSamples: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  cartCount,
  onOpenCart,
  onOpenSamples,
}) => {
  const isAr = lang === 'ar';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-sky-800 transition-colors flex items-center gap-2"
          >
            <span>PRONTO FASHION</span>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-900 text-white font-medium">B2B</span>
          </a>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <a
              href="#catalog"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              {isAr ? 'كتالوج الملابس المتاحة' : 'Wholesale Catalog'}
            </a>
            <a
              href="#calculator"
              onClick={(e) => {
                e.preventDefault();
                onOpenCart();
              }}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isAr ? 'حاسبة طلبيات الجملة' : 'Quote Calculator'}
            </a>
            <a
              href="#terms"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              {isAr ? 'الشحن والتوريد' : 'Shipping & Terms'}
            </a>
            <button
              onClick={onOpenSamples}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 text-left"
            >
              {isAr ? 'طلب عينات للمعاينة' : 'Request Samples'}
            </button>
            <a
              href="#contact"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              {isAr ? 'فروعنا والتواصل' : 'Showroom Hubs'}
            </a>
          </nav>

          {/* Zone 3: Primary action + Utilities */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            {/* Language toggle */}
            <button
              onClick={onToggleLang}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
              title={isAr ? 'Switch to English' : 'التحويل للغة العربية'}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isAr ? 'English' : 'عربي'}</span>
            </button>

            {/* Quick WhatsApp Link */}
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                isAr
                  ? 'مرحباً برونتو فاشون، أرغب في الاستفسار عن كشف أسعار الجملة للطلبيات والمتاجر.'
                  : 'Hello Pronto Fashion, I would like to inquire about wholesale clothing supply for my store.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-[#25D366] hover:bg-[#1ebd59] rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{isAr ? 'واتساب المبيعات' : 'WhatsApp'}</span>
            </a>

            {/* Quote Drawer trigger */}
            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isAr ? 'سلة طلبيات الجملة' : 'Wholesale Quote'}
              </span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-amber-400 text-slate-950 rounded-full font-mono">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
