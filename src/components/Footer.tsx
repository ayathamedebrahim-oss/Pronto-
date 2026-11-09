import React from 'react';
import { Phone, MessageCircle, MapPin, Mail, Clock, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { DISPLAY_PHONE, WHATSAPP_PHONE } from '../data/products';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <footer id="contact" className="bg-slate-950 text-neutral-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              <span>PRONTO FASHION</span>
              <span className="text-xs px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800 font-medium">
                {isAr ? 'أزياء الجملة' : 'B2B Wholesale'}
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {isAr
                ? 'تشكيلة ملابس الجملة للأزياء العصرية - أسعار خاصة للمتاجر والكميات مع توريد مباشر وشحن لكافة المحافظات.'
                : 'Premium apparel wholesale for modern retailers and clothing boutiques with direct tiered volume pricing and nationwide shipping.'}
            </p>
            <div className="text-xs text-amber-400 font-mono">
              www.prontofashion.com
            </div>
          </div>

          {/* Contact & WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {isAr ? 'تواصل المبيعات والجملة' : 'Wholesale Sales Desk'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-300 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span dir="ltr" className="font-mono font-bold">
                    {DISPLAY_PHONE}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${WHATSAPP_PHONE}`}
                  className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                  <span dir="ltr" className="font-mono">
                    {DISPLAY_PHONE}
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-neutral-400">
                <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                <span className="font-mono">wholesale@prontofashion.com</span>
              </li>
              <li className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>
                  {isAr
                    ? 'السبت - الخميس: 9:00 ص - 8:00 م'
                    : 'Sat - Thu: 9:00 AM - 8:00 PM'}
                </span>
              </li>
            </ul>
          </div>

          {/* Showroom & Distribution Hubs */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {isAr ? 'مقرات المعاينة والشحن' : 'Showrooms & Logistics Hubs'}
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 leading-relaxed">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  {isAr
                    ? 'المعرض الرئيسي: وسط البلد / العتبة، القاهرة'
                    : 'Central Showroom: Downtown / Attaba, Cairo'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  {isAr
                    ? 'مستودع الشحن المركزي: المنطقة الصناعية، العبور، القاهرة'
                    : 'Central Depot: Industrial Zone, Obour City, Cairo'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span>
                  {isAr
                    ? 'نقطة توزيع الإسكندرية: المنشية، الإسكندرية'
                    : 'Alexandria Depot: Mansheya, Alexandria'}
                </span>
              </li>
            </ul>
          </div>

          {/* Quick links & Merchant Guarantee */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {isAr ? 'خدمات التجار والمحلات' : 'Merchant Services'}
            </h4>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>{isAr ? 'سجل تجاري وبطاقة ضريبية' : 'Licensed Trade Entity'}</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                {isAr
                  ? 'فواتير رسمية معتمدة لكافة طلبيات الجملة والمؤسسات مع إمكانية التعاقد والتوريد الدوري.'
                  : 'Certified tax invoices for enterprise and retail bulk procurement with regular supply contracts.'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Pronto Fashion. {isAr ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-4">
            <a href="#catalog" className="hover:text-neutral-300 transition-colors">
              {isAr ? 'كتالوج الملابس' : 'Apparel Catalog'}
            </a>
            <span aria-hidden="true">·</span>
            <a href="#terms" className="hover:text-neutral-300 transition-colors">
              {isAr ? 'شروط التوريد' : 'Supply Terms'}
            </a>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-400">
              {isAr ? 'توريد موثوق للمتاجر المصرية' : 'Trusted Egyptian Apparel Wholesaler'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
