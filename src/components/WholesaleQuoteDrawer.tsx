import React, { useState } from 'react';
import { X, Trash2, MessageCircle, Printer, Truck, FileText, CheckCircle2 } from 'lucide-react';
import { CartItem, Language, StoreOrderInfo } from '../types';
import { GOVERNORATES, WHATSAPP_PHONE, DISPLAY_PHONE } from '../data/products';

interface WholesaleQuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  lang: Language;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const WholesaleQuoteDrawer: React.FC<WholesaleQuoteDrawerProps> = ({
  isOpen,
  onClose,
  items,
  lang,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const isAr = lang === 'ar';

  const [orderInfo, setOrderInfo] = useState<StoreOrderInfo>({
    storeName: '',
    merchantName: '',
    phone: '',
    governorate: 'cairo_giza',
    shippingAddress: '',
    paymentMethod: 'instapay',
    customerNotes: '',
  });

  const [showPrintView, setShowPrintView] = useState(false);

  if (!isOpen) return null;

  // Calculate pricing per item based on active tiers
  const itemCalculations = items.map((item) => {
    const activeTier = [...item.product.tiers]
      .reverse()
      .find((t) => item.quantity >= t.minQty) || item.product.tiers[0];
    const unitPrice = activeTier ? activeTier.pricePerUnit : item.product.basePrice;
    const subtotal = unitPrice * item.quantity;
    const baseTotal = item.product.basePrice * item.quantity;
    const itemSavings = baseTotal - subtotal;

    return {
      ...item,
      unitPrice,
      subtotal,
      itemSavings,
      activeTierLabel: isAr ? activeTier?.labelAr : activeTier?.labelEn,
    };
  });

  const totalPieces = itemCalculations.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalSubtotal = itemCalculations.reduce((acc, curr) => acc + curr.subtotal, 0);
  const totalSavings = itemCalculations.reduce((acc, curr) => acc + curr.itemSavings, 0);

  const selectedGov = GOVERNORATES.find((g) => g.id === orderInfo.governorate) || GOVERNORATES[0];
  const shippingFee = items.length > 0 ? selectedGov.fee : 0;
  const grandTotal = totalSubtotal + shippingFee;

  // Build WhatsApp PO Message
  const generateWhatsAppPO = () => {
    let msg = isAr
      ? `*طلب توريد جملة - برونتو فاشون (Pronto Fashion)* 👔\n\n`
      : `*Wholesale Purchase Order - Pronto Fashion* 👔\n\n`;

    msg += isAr
      ? `🏢 *بيانات المتجر/التاجر:*\n`
      : `🏢 *Store / Merchant Details:*\n`;
    msg += isAr
      ? `• المتجر: ${orderInfo.storeName || 'غير محدد'}\n• التاجر: ${orderInfo.merchantName || 'عميل جديد'}\n• الهاتف: ${orderInfo.phone || 'غير مسجل'}\n• المحافظة: ${selectedGov.nameAr}\n• العنوان: ${orderInfo.shippingAddress || 'مكتب شحن'}\n• طريقة الدفع: ${orderInfo.paymentMethod.toUpperCase()}\n\n`
      : `• Store: ${orderInfo.storeName || 'Not specified'}\n• Merchant: ${orderInfo.merchantName || 'New Client'}\n• Phone: ${orderInfo.phone || 'N/A'}\n• Governorate: ${selectedGov.nameEn}\n• Address: ${orderInfo.shippingAddress || 'Depot pickup'}\n• Payment: ${orderInfo.paymentMethod.toUpperCase()}\n\n`;

    msg += isAr ? `📦 *تفاصيل الأصناف والكميات:*\n` : `📦 *Itemized Order List:*\n`;

    itemCalculations.forEach((item, index) => {
      const name = isAr ? item.product.titleAr : item.product.titleEn;
      const color = item.selectedColor ? ` [${item.selectedColor}]` : '';
      msg += `${index + 1}. *${name}* (${item.product.sku})${color}\n`;
      msg += `   - الكمية: ${item.quantity} قطعة @ ${item.unitPrice} ج.م = ${item.subtotal.toLocaleString()} ج.م\n`;
    });

    msg += `\n-----------------------\n`;
    msg += isAr
      ? `• إجمالي القطع: *${totalPieces} قطعة*\n• المجموع بعد الخصم: *${totalSubtotal.toLocaleString()} ج.م*\n• تكلفة الشحن التقديرية: *${shippingFee} ج.م*\n• الإجمالي النهائي: *${grandTotal.toLocaleString()} ج.م*\n`
      : `• Total Units: *${totalPieces} pcs*\n• Discounted Subtotal: *${totalSubtotal.toLocaleString()} EGP*\n• Estimated Freight: *${shippingFee} EGP*\n• Grand Total: *${grandTotal.toLocaleString()} EGP*\n`;

    if (totalSavings > 0) {
      msg += isAr
        ? `🎉 *إجمالي وفر خصومات الجملة: ${totalSavings.toLocaleString()} ج.م*\n`
        : `🎉 *Total Volume Savings: ${totalSavings.toLocaleString()} EGP*\n`;
    }

    if (orderInfo.customerNotes) {
      msg += isAr
        ? `\n📝 ملاحظات إضافية: ${orderInfo.customerNotes}\n`
        : `\n📝 Special Notes: ${orderInfo.customerNotes}\n`;
    }

    msg += isAr
      ? `\nيرجى تأكيد توفر الكمية وإرسال حساب فودافون كاش / إنستاباي لدفع العربون وتأكيد الشحن.`
      : `\nPlease confirm stock availability and share InstaPay/Vodafone Cash details for deposit.`;

    return encodeURIComponent(msg);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-lg text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                {isAr ? 'حاسبة طلبيات الجملة وعرض السعر' : 'Wholesale Order & Quote Calculator'}
              </h2>
              <p className="text-xs text-slate-300">
                {isAr
                  ? 'حساب تلقائي لخصومات الكميات والتوريد التجاري'
                  : 'Automated volume tier discounts & merchant freight'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                className="text-xs text-slate-400 hover:text-rose-400 px-2 py-1 transition-colors"
                title={isAr ? 'تفريغ السلة' : 'Clear all'}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                {isAr ? 'سلة طلبيات الجملة فارغة حالياً' : 'Your Wholesale Quote is Empty'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto">
                {isAr
                  ? 'تصفح كتالوج الملابس وأضف الموديلات والكميات المطلوبة لمتاجرك لحساب الخصومات الفورية.'
                  : 'Browse the apparel catalog and add required dozens/boxes to view volume tier pricing.'}
              </p>
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
              >
                {isAr ? 'الرجوع للكتالوج' : 'Back to Catalog'}
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>{isAr ? 'الأصناف المحددة للطلبية:' : 'Selected Wholesale Lines:'}</span>
                  <span className="font-mono text-emerald-700">
                    {totalPieces} {isAr ? 'قطعة إجمالية' : 'total units'}
                  </span>
                </div>

                <div className="space-y-3">
                  {itemCalculations.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.image}
                            alt={isAr ? item.product.titleAr : item.product.titleEn}
                            className="w-14 h-14 object-cover rounded-lg border border-neutral-200 shrink-0"
                          />
                          <div>
                            <div className="text-xs font-mono text-neutral-500">
                              {item.product.sku}
                            </div>
                            <h4 className="text-sm font-bold text-slate-900">
                              {isAr ? item.product.titleAr : item.product.titleEn}
                            </h4>
                            {item.selectedColor && (
                              <div className="text-xs text-neutral-500 mt-0.5">
                                {isAr ? 'اللون:' : 'Color:'} {item.selectedColor}
                              </div>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-neutral-400 hover:text-rose-600 p-1"
                          title="حذف الصنف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Stepper & Price Calculation */}
                      <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-neutral-500">
                            {isAr ? 'الكمية:' : 'Qty:'}
                          </span>
                          <div className="flex items-center border border-neutral-300 rounded bg-white overflow-hidden">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  Math.max(
                                    item.product.moq,
                                    item.quantity - item.product.boxPackQuantity
                                  )
                                )
                              }
                              className="px-2 py-1 text-xs hover:bg-neutral-100 font-bold"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-xs font-mono font-bold text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  item.quantity + item.product.boxPackQuantity
                                )
                              }
                              className="px-2 py-1 text-xs hover:bg-neutral-100 font-bold"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[11px] text-neutral-500">
                            ({item.activeTierLabel})
                          </span>
                        </div>

                        <div className="text-right rtl:text-right ltr:text-left">
                          <div className="text-sm font-black font-mono text-slate-900">
                            {item.subtotal.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
                          </div>
                          <div className="text-[10px] text-neutral-500 font-mono">
                            {item.unitPrice} {isAr ? 'ج.م/قطعة' : 'EGP/pc'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Store & Shipping Form */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                  <Truck className="w-4 h-4 text-sky-600" />
                  <span>{isAr ? 'بيانات الشحن والمتجر:' : 'Store & Cargo Destination:'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-600 font-medium mb-1">
                      {isAr ? 'اسم المحل / المتجر:' : 'Store / Brand Name:'}
                    </label>
                    <input
                      type="text"
                      placeholder={isAr ? 'مثال: محلات النور للملابس' : 'e.g. Al-Noor Boutique'}
                      value={orderInfo.storeName}
                      onChange={(e) => setOrderInfo({ ...orderInfo, storeName: e.target.value })}
                      className="w-full p-2 border border-neutral-300 rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-600 font-medium mb-1">
                      {isAr ? 'اسم صاحب الطلبية / التاجر:' : 'Merchant / Contact Person:'}
                    </label>
                    <input
                      type="text"
                      placeholder={isAr ? 'مثال: أ. محمد إبراهيم' : 'e.g. Mohamed Ibrahim'}
                      value={orderInfo.merchantName}
                      onChange={(e) =>
                        setOrderInfo({ ...orderInfo, merchantName: e.target.value })
                      }
                      className="w-full p-2 border border-neutral-300 rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-600 font-medium mb-1">
                      {isAr ? 'رقم الهاتف للتواصل وتأكيد الشحنة:' : 'Phone / WhatsApp Number:'}
                    </label>
                    <input
                      type="tel"
                      placeholder="010 / 011 / 012 / 015..."
                      value={orderInfo.phone}
                      onChange={(e) => setOrderInfo({ ...orderInfo, phone: e.target.value })}
                      className="w-full p-2 border border-neutral-300 rounded-lg bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-600 font-medium mb-1">
                      {isAr ? 'المحافظة وجهة الشحن:' : 'Governorate:'}
                    </label>
                    <select
                      value={orderInfo.governorate}
                      onChange={(e) =>
                        setOrderInfo({ ...orderInfo, governorate: e.target.value })
                      }
                      className="w-full p-2 border border-neutral-300 rounded-lg bg-white"
                    >
                      {GOVERNORATES.map((gov) => (
                        <option key={gov.id} value={gov.id}>
                          {isAr ? gov.nameAr : gov.nameEn} (+{gov.fee} ج.م)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-neutral-600 font-medium mb-1">
                      {isAr ? 'العنوان التفصيلي أو اسم مكتب الشحن المعتمد:' : 'Delivery Address / Preferred Freight Agency:'}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        isAr
                          ? 'الشارع، المنطقة، أو مكتب شحن (مثال: مكتب البراق / مشوار / طرد المحافظة)'
                          : 'Street address or freight broker depot name'
                      }
                      value={orderInfo.shippingAddress}
                      onChange={(e) =>
                        setOrderInfo({ ...orderInfo, shippingAddress: e.target.value })
                      }
                      className="w-full p-2 border border-neutral-300 rounded-lg bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-neutral-600 font-medium mb-1">
                      {isAr ? 'طريقة دفع العربون / الفاتورة:' : 'Payment Preference:'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'instapay', labelAr: 'إنستاباي InstaPay', labelEn: 'InstaPay' },
                        { id: 'vodafone_cash', labelAr: 'فودافون كاش', labelEn: 'Vodafone Cash' },
                        { id: 'cod', labelAr: 'دفع عند الاستلام', labelEn: 'COD + Deposit' },
                        { id: 'bank_transfer', labelAr: 'تحويل بنكي', labelEn: 'Bank Transfer' },
                      ].map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() =>
                            setOrderInfo({
                              ...orderInfo,
                              paymentMethod: p.id as StoreOrderInfo['paymentMethod'],
                            })
                          }
                          className={`p-2 rounded-lg text-center font-bold text-[11px] border transition-all ${
                            orderInfo.paymentMethod === p.id
                              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                              : 'bg-white text-neutral-700 border-neutral-200'
                          }`}
                        >
                          {isAr ? p.labelAr : p.labelEn}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-neutral-600 font-medium mb-1">
                      {isAr ? 'ملاحظات إضافية (ألوان مخصصة أو مواصفات):' : 'Additional Notes / Requests:'}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={
                        isAr
                          ? 'مثال: نرجو مضاعفة مقاس XL في القمصان، أو الاستفسار عن كراتين إضافية.'
                          : 'e.g. Please balance more XL sizes, or private label tags inquiry.'
                      }
                      value={orderInfo.customerNotes}
                      onChange={(e) =>
                        setOrderInfo({ ...orderInfo, customerNotes: e.target.value })
                      }
                      className="w-full p-2 border border-neutral-300 rounded-lg bg-white resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Total Summary */}
              <div className="p-4 bg-neutral-900 text-white rounded-xl space-y-2 text-xs">
                <div className="flex justify-between text-neutral-300">
                  <span>{isAr ? 'إجمالي القطع:' : 'Total Pieces:'}</span>
                  <span className="font-mono font-bold">{totalPieces} {isAr ? 'قطعة' : 'units'}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>{isAr ? 'المجموع بعد خصومات الجملة:' : 'Discounted Subtotal:'}</span>
                  <span className="font-mono font-bold text-white">
                    {totalSubtotal.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>{isAr ? 'تكلفة الشحن التقديرية (كرتونة مقواة):' : 'Estimated Freight:'}</span>
                  <span className="font-mono font-bold text-white">
                    {shippingFee} {isAr ? 'ج.م' : 'EGP'}
                  </span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-neutral-800">
                    <span>{isAr ? 'وفرت لمتاجرك:' : 'Volume Savings:'}</span>
                    <span className="font-mono">
                      -{totalSavings.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black pt-2 border-t border-neutral-800 text-amber-400">
                  <span>{isAr ? 'الإجمالي النهائي التقديري:' : 'Grand Total:'}</span>
                  <span className="font-mono">
                    {grandTotal.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="p-4 border-t border-neutral-200 bg-white space-y-2">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${generateWhatsAppPO()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm bg-[#25D366] hover:bg-[#1ebd59] text-white shadow-lg transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>
                {isAr
                  ? 'إرسال الطلبية لمنسق الجملة عبر واتساب 📱'
                  : 'Send Wholesale PO via WhatsApp 📱'}
              </span>
            </a>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowPrintView(!showPrintView)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-semibold text-xs transition-colors"
              >
                <Printer className="w-4 h-4 text-neutral-500" />
                <span>
                  {showPrintView
                    ? (isAr ? 'إخفاء معاينة الطباعة' : 'Hide Print View')
                    : (isAr ? 'معاينة وطباعة الفاتورة المبدئية' : 'Print Proforma Invoice')}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Printable Proforma Invoice Modal */}
      {showPrintView && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full p-8 rounded-2xl max-h-[90vh] overflow-y-auto print:max-w-none print:w-full print:p-0 print:shadow-none text-slate-900 space-y-6">
            <div className="flex justify-between items-start border-b pb-4">
              <div>
                <h1 className="text-2xl font-black tracking-tight">PRONTO FASHION</h1>
                <p className="text-xs text-neutral-500">أزياء وملابس الجملة والتوريدات التجارية</p>
                <p className="text-xs font-mono mt-1">هاتف / واتساب: {DISPLAY_PHONE}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold px-2 py-1 bg-slate-900 text-white rounded">
                  عرض سعر مبدئي / PROFORMA
                </span>
                <p className="text-xs text-neutral-500 font-mono mt-1">
                  التاريخ: {new Date().toLocaleDateString('ar-EG')}
                </p>
              </div>
            </div>

            {/* Merchant Details */}
            <div className="grid grid-cols-2 gap-4 text-xs p-3 bg-neutral-50 rounded-lg">
              <div>
                <span className="text-neutral-500">اسم المتجر: </span>
                <span className="font-bold">{orderInfo.storeName || 'عميل تجزئة'}</span>
              </div>
              <div>
                <span className="text-neutral-500">المسؤول: </span>
                <span className="font-bold">{orderInfo.merchantName || '-'}</span>
              </div>
              <div>
                <span className="text-neutral-500">الهاتف: </span>
                <span className="font-bold font-mono">{orderInfo.phone || '-'}</span>
              </div>
              <div>
                <span className="text-neutral-500">المحافظة: </span>
                <span className="font-bold">{selectedGov.nameAr}</span>
              </div>
            </div>

            {/* Table */}
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="border-b bg-neutral-100">
                  <th className="p-2">الصنف</th>
                  <th className="p-2">الكود</th>
                  <th className="p-2">الكمية</th>
                  <th className="p-2">سعر القطعة</th>
                  <th className="p-2">الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                {itemCalculations.map((item) => (
                  <tr key={item.product.id} className="border-b">
                    <td className="p-2 font-bold">{item.product.titleAr}</td>
                    <td className="p-2 font-mono text-neutral-500">{item.product.sku}</td>
                    <td className="p-2 font-mono">{item.quantity} قطعة</td>
                    <td className="p-2 font-mono">{item.unitPrice} ج.م</td>
                    <td className="p-2 font-mono font-bold">{item.subtotal.toLocaleString()} ج.م</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="space-y-1 text-xs border-t pt-3">
              <div className="flex justify-between">
                <span>المجموع بعد خصم الكميات:</span>
                <span className="font-mono font-bold">{totalSubtotal.toLocaleString()} ج.م</span>
              </div>
              <div className="flex justify-between">
                <span>تكلفة الشحن التقديرية:</span>
                <span className="font-mono font-bold">{shippingFee} ج.م</span>
              </div>
              <div className="flex justify-between text-base font-black text-rose-600 border-t pt-2">
                <span>الإجمالي النهائي المستحق:</span>
                <span className="font-mono">{grandTotal.toLocaleString()} ج.م</span>
              </div>
            </div>

            <div className="flex gap-3 print:hidden pt-4 border-t">
              <button
                onClick={handlePrint}
                className="flex-1 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة الفاتورة</span>
              </button>
              <button
                onClick={() => setShowPrintView(false)}
                className="px-4 py-2.5 bg-neutral-200 text-neutral-800 rounded-lg text-xs font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
