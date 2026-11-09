import React, { useState } from 'react';
import { X, Check, MessageCircle, PackageCheck, Shield } from 'lucide-react';
import { Product, Language } from '../types';
import { PRODUCTS, WHATSAPP_PHONE } from '../data/products';

interface SampleRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const SampleRequestModal: React.FC<SampleRequestModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const isAr = lang === 'ar';
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([
    PRODUCTS[0].id,
    PRODUCTS[1].id,
  ]);
  const [merchantName, setMerchantName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [city, setCity] = useState('');

  if (!isOpen) return null;

  const toggleProduct = (id: string) => {
    if (selectedProductIds.includes(id)) {
      if (selectedProductIds.length > 1) {
        setSelectedProductIds(selectedProductIds.filter((p) => p !== id));
      }
    } else {
      setSelectedProductIds([...selectedProductIds, id]);
    }
  };

  const selectedProducts = PRODUCTS.filter((p) => selectedProductIds.includes(p.id));

  const generateWhatsAppSampleMsg = () => {
    let msg = isAr
      ? `*طلب باقة عينات للمعاينة - برونتو فاشون (Pronto Fashion)* 👔\n\n`
      : `*Sample Pack Inspection Request - Pronto Fashion* 👔\n\n`;

    msg += isAr
      ? `🏢 *بيانات المتجر:*\n• اسم المتجر: ${storeName || 'متجر ملابس'}\n• اسم التاجر: ${merchantName || 'تاجر تجزئة'}\n• المدينة / المحافظة: ${city || 'مصر'}\n\n`
      : `🏢 *Store Details:*\n• Store: ${storeName || 'Boutique'}\n• Merchant: ${merchantName || 'Retailer'}\n• City: ${city || 'Egypt'}\n\n`;

    msg += isAr ? `🔍 *الأصناف المطلوبة كعينات فحص خامة وتقفيل:*\n` : `🔍 *Requested Sample Items:*\n`;
    selectedProducts.forEach((p, idx) => {
      msg += `${idx + 1}. ${isAr ? p.titleAr : p.titleEn} (${p.sku})\n`;
    });

    msg += isAr
      ? `\nأرغب في معرفة تكلفة إرسال باقة العينات وطريقة الشحن والتوصيل للمعاينة قبل تثبيت طلبية الكمية الكبرى.`
      : `\nI would like to inquire about the sample pack dispatch fee and procedure before placing our bulk carton order.`;

    return encodeURIComponent(msg);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-neutral-200">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-20 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 rounded-xl text-amber-700 border border-amber-200">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isAr ? 'طلب باقة عينات لمعاينة الخامات' : 'Order Sample Inspection Pack'}
              </h3>
              <p className="text-xs text-neutral-500">
                {isAr
                  ? 'افحص جودة القطن، التقفيل، والمقاسات قبل طلب الكميات'
                  : 'Verify fabric quality, stitching, and fits before ordering bulk'}
              </p>
            </div>
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-700 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-slate-900">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>{isAr ? 'سياسة العينات للتجار المعتمدين:' : 'Wholesale Sample Policy:'}</span>
            </div>
            <p className="leading-relaxed">
              {isAr
                ? 'يحق لكل متجر أو بوتيك طلب قطعة واحدة من أي موديل بسعر الجملة لمعاينة الخياطة ونقاء الألوان، مع شحن سريع لباب المحل.'
                : 'Retail stores and boutiques can request 1-2 single units per model at wholesale cost to examine sewing and colors before ordering cartons.'}
            </p>
          </div>

          {/* Product selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 block">
              {isAr ? 'اختر الأصناف التي ترغب في معاينتها:' : 'Select styles for sample pack:'}
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {PRODUCTS.map((prod) => {
                const isSelected = selectedProductIds.includes(prod.id);
                return (
                  <div
                    key={prod.id}
                    onClick={() => toggleProduct(prod.id)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-colors text-xs ${
                      isSelected
                        ? 'bg-sky-50 border-sky-300 text-sky-950 font-bold'
                        : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isSelected
                            ? 'bg-sky-600 border-sky-600 text-white'
                            : 'border-neutral-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                      <span>{isAr ? prod.titleAr : prod.titleEn}</span>
                      <span className="font-mono text-neutral-400">({prod.sku})</span>
                    </div>
                    <span className="font-mono">{prod.basePrice} {isAr ? 'ج.م' : 'EGP'}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-neutral-600 font-medium mb-1">
                {isAr ? 'اسم المحل / البوتيك:' : 'Store Name:'}
              </label>
              <input
                type="text"
                placeholder={isAr ? 'محل...' : 'Store name...'}
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-neutral-600 font-medium mb-1">
                {isAr ? 'المدينة / المحافظة:' : 'City / Governorate:'}
              </label>
              <input
                type="text"
                placeholder={isAr ? 'القاهرة / طنطا...' : 'Cairo / Delta...'}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded-lg"
              />
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}?text=${generateWhatsAppSampleMsg()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-[#25D366] hover:bg-[#1ebd59] text-white shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{isAr ? 'إرسال طلب العينات عبر واتساب' : 'Request Samples via WhatsApp'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
