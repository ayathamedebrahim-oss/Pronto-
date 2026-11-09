import React from 'react';
import { ArrowDown, MessageCircle, ShieldCheck, Truck, Sparkles, Calculator } from 'lucide-react';
import { Language } from '../types';
import { WHATSAPP_PHONE } from '../data/products';

interface HeroProps {
  lang: Language;
  onOpenCart: () => void;
  onOpenSamples: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenCart, onOpenSamples }) => {
  const isAr = lang === 'ar';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-8 pb-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-right rtl:text-right ltr:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
              <Sparkles className="w-4 h-4" />
              <span>
                {isAr
                  ? 'برونتو فاشون · المنصة الرسمية لتجارة ملابس الجملة'
                  : 'Pronto Fashion · Official B2B Apparel Wholesale Hub'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight [text-wrap:balance]">
              {isAr ? (
                <>
                  تشكيلة ملابس الجملة <span className="text-sky-400">للأزياء العصرية</span> — أسعار خاصة للمتاجر والكميات
                </>
              ) : (
                <>
                  Premium Apparel Wholesale <span className="text-sky-400">for Modern Retailers</span> — Direct Volume Pricing
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {isAr
                ? 'نوفر لأصحاب المحلات ومتاجر الأونلاين والبوتيكات في مصر تشكيلة متجددة من القمصان، الجينز، والتيشيرتات بأعلى معايير الجودة وبأسعار تصاعدية حسب الكمية، مع إمكانية طلب العينات والشحن السريع لجميع المحافظات.'
                : 'Empowering boutique owners, online fashion stores, and apparel retailers across Egypt with premium cotton shirts, denim jeans, and heavyweight t-shirts with tiered wholesale discounts, sample kits, and nationwide door-to-door delivery.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all whitespace-nowrap"
              >
                <span>{isAr ? 'كتالوج الملابس المتاحة' : 'Explore Catalog'}</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCart}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg shadow-sm transition-all whitespace-nowrap"
              >
                <Calculator className="w-4 h-4 text-sky-400" />
                <span>{isAr ? 'حاسبة طلبيات الجملة' : 'Quote Calculator'}</span>
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                  isAr
                    ? 'أهلاً بكم برونتو فاشون، أنا صاحب متجر وأرغب في معرفة شروط التوريد وكتالوج الأسعار الحالي.'
                    : 'Hello Pronto Fashion, I am a store owner interested in wholesale supply terms and pricing.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#25D366] hover:bg-[#1ebd59] rounded-lg shadow-sm transition-all whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{isAr ? 'طلب واستفسار فوري عبر واتساب' : 'WhatsApp Wholesale Desk'}</span>
              </a>
            </div>

            {/* Micro proof info */}
            <div className="pt-2 flex items-center gap-6 text-xs text-slate-400">
              <button
                onClick={onOpenSamples}
                className="hover:text-amber-300 underline underline-offset-4 cursor-pointer"
              >
                {isAr ? 'تريد فحص الخامات أولاً؟ اطلب باقة العينات' : 'Want to verify fabrics first? Order a sample pack'}
              </button>
              <span>·</span>
              <span>{isAr ? 'الحد الأدنى يبدأ من درزينة (12 قطعة)' : 'MOQ starts from 1 Dozen'}</span>
            </div>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group bg-slate-800">
              <img
                src="/src/assets/images/hero_pronto_showroom_1794249541343.jpg"
                alt="Pronto Fashion wholesale warehouse and showroom"
                referrerPolicy="no-referrer"
                className="w-full h-[320px] sm:h-[380px] lg:h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-sm">
                    {isAr ? 'معرض ومستودع برونتو المركزي' : 'Pronto Central Showroom'}
                  </div>
                  <div className="text-slate-400">
                    {isAr ? 'توريد مستمر لأكثر من 350 متجر في مصر' : 'Active supplier to 350+ apparel boutiques'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-amber-400 font-bold font-mono">100%</div>
                  <div className="text-slate-400 text-[11px]">{isAr ? 'فحص جودة' : 'Inspection'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Trust Strip Row */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800 text-sky-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {isAr ? 'أسعار مصنع مباشرة' : 'Direct Factory Prices'}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {isAr ? 'بدون وسطاء بأعلى هوامش ربح' : 'Cut middlemen, maximum margin'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800 text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {isAr ? 'شحن لجميع المحافظات' : 'Nationwide Freight'}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {isAr ? 'توصيل لباب محلك في 24-48 ساعة' : 'To your shop door within 48h'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800 text-emerald-400 shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {isAr ? 'تنسيق فوري عبر واتساب' : 'Instant WhatsApp Desk'}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {isAr ? 'تأكيد الحجز ومتابعة الشحنة' : 'Fast PO confirmation & dispatch'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800 text-purple-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {isAr ? 'خصم تصاعدي للكميات' : 'Tiered Volume Scaling'}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {isAr ? 'تخفيضات تبدأ من درازن وكراتين' : 'Save up to 18% on master boxes'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
