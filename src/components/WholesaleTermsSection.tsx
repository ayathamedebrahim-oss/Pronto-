import React from 'react';
import { Package, Truck, CreditCard, Award, HelpCircle, ChevronDown } from 'lucide-react';
import { Language } from '../types';

interface WholesaleTermsSectionProps {
  lang: Language;
}

export const WholesaleTermsSection: React.FC<WholesaleTermsSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  const faqs = [
    {
      qAr: 'كيف يتم توزيع المقاسات والألوان داخل كل دستة / درزينة؟',
      qEn: 'How are sizes and colors assorted inside each dozen / pack?',
      aAr: 'يتم توزيع المقاسات بنسب المبيعات الأكثر رواجاً للمحلات (مثلاً في دستة 12 قطعة: 2 مقاس M، 4 مقاس L، 4 مقاس XL، 2 مقاس XXL) مع تشكيلة متوازنة من الألوان الأساسية الأكثر طلباً من الزبائن لتسريع حركة البيع في متجرك.',
      aEn: 'Packs are assembled based on top-selling retail ratios (e.g. in a 12-piece dozen: 2x M, 4x L, 4x XL, 2x XXL) with balanced core commercial colorways to guarantee fast shelf turnover.',
    },
    {
      qAr: 'ما هي طرق الدفع المتاحة لتجار الجملة والمحافظات؟',
      qEn: 'What payment methods are supported for wholesale buyers?',
      aAr: 'نقبل الدفع عبر تطبيق إنستاباي InstaPay، محافظ فودافون كاش، التحويل البنكي المباشر، أو الدفع عند الاستلام لمندوب شركة الشحن بعد تحويل عربون جدية شحن بسيط لضمان استلام الطرد.',
      aEn: 'We accept InstaPay, Vodafone Cash, bank wire transfer, and Cash on Delivery (with nominal freight deposit to confirm order dispatch).',
    },
    {
      qAr: 'كم يستغرق شحن البضاعة حتى باب المحل؟',
      qEn: 'What is the shipping turnaround time to my storefront?',
      aAr: 'يتم تجهيز وشحن الطلبيات فور تأكيد الإيداع؛ التوصيل داخل القاهرة والجيزة يستغرق 24-48 ساعة، ومحافظات الدلتا والصعيد والقناة من 48 إلى 72 ساعة كحد أقصى بكراتين شحن مقواة ومغلقة بإحكام.',
      aEn: 'Orders are dispatched within 24 hours of deposit. Delivery in Cairo/Giza takes 24-48 hours; Delta, Canal and Upper Egypt take 48-72 hours via sealed 5-ply cartons.',
    },
    {
      qAr: 'هل يمكن تصنيع كميات خاصة بالبراند الخاص بي (Private Label)؟',
      qEn: 'Do you offer Private Label and custom brand manufacturing?',
      aAr: 'نعم! نوفر خدمة التصنيع المخصص وطباعة وتطريز شعار متجرك ووضع تكت العلامة التجارية الخاصة بك للطلبيات التي تبدأ من 150-200 قطعة للموديل.',
      aEn: 'Yes! We offer custom white-label production, custom woven tags, screen printing, and embroidery starting from 150-200 pieces per style.',
    },
    {
      qAr: 'ما هي سياسة الاستبدال في حال وجود أي عيب تقفيل؟',
      qEn: 'What is the policy for factory defects or damaged items?',
      aAr: 'نضمن خلو كافة الشحنات من أي عيوب تصنيع بنسبة 100%؛ وفي حال وجود أي قطعة بها عيب تقفيل، يتم استبدالها فوراً أو خصم قيمتها بالكامل في الشحنة التالية دون أي تكلفة إضافية.',
      aEn: 'We provide 100% warranty against defects. Any defective piece is immediately replaced or credited towards your next shipment with zero hassle.',
    },
  ];

  return (
    <section id="terms" className="py-16 bg-neutral-100/70 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-800">
            {isAr ? 'سياسات التوريد والتعامل التجاري' : 'Wholesale Policies & B2B Standards'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isAr ? 'شروط التوريد والشحن وضمان الجودة' : 'Delivery, Freight & Quality Guarantee'}
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {isAr
              ? 'كل ما تحتاج لمعرفته عن استلام البضاعة، مواصفات التعبئة، وتأمين طلبيات متاجرك'
              : 'Everything boutique owners need to know about packaging, logistics, and supply guarantees'}
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {isAr ? 'تغليف كرتوني مقوى' : '5-Ply Master Cartons'}
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {isAr
                ? 'تغليف فردي لكل قطعة بأكياس سيلوفان واقية، وكراتين شحن متينة لحماية الملابس من الأتربة والتلف أثناء النقل.'
                : 'Individually poly-bagged garments packed into reinforced heavy-duty corrugated cartons.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {isAr ? 'توصيل لباب المحل' : 'Store Doorstep Delivery'}
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {isAr
                ? 'شحن مباشر إلى باب محلك أو إلى مكاتب الشحن المعتمدة في الأقاليم مع إمكانية تتبع مسار الشحنة هاتفياً.'
                : 'Direct transport to your retail boutique or pickup from regional freight hubs with live tracking.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {isAr ? 'مرونة في وسائل الدفع' : 'Flexible Settlement'}
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {isAr
                ? 'خيارات سداد مريحة تشمل إنستاباي InstaPay، فودافون كاش، أو دفع الباقي عند استلام ومعاينة الشحنة.'
                : 'Convenient payment via InstaPay, mobile wallets, or COD balance upon parcel inspection.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {isAr ? 'ضمان التقفيل والاستبدال' : 'Defect Replacement'}
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {isAr
                ? 'استبدال فوري أو تعويض مالي لأي قطعة بها عيب تقفيل أو مقاس غير مطابق لمواصفات الفاتورة.'
                : 'Instant piece replacement or credit reimbursement for any manufacturing discrepancy.'}
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-4">
            <HelpCircle className="w-4 h-4 text-sky-600" />
            <span>{isAr ? 'الأسئلة الشائعة لتجار الملابس وأصحاب المتاجر:' : 'B2B Wholesale FAQ:'}</span>
          </div>

          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-4 text-right rtl:text-right ltr:text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-sky-800 transition-colors"
                >
                  <span>{isAr ? faq.qAr : faq.qEn}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100">
                    {isAr ? faq.aAr : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
