'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, ShoppingBag, Mail, Send, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { cartManager, CartItem } from '@/lib/cart';

// Calea dinamică
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/alutec-glass';

// --- FUNCȚII PENTRU CULORI SCHIȚĂ ---
const getProfileColorHex = (color: string) => {
  const lower = (color || '').toLowerCase();
  if (lower.includes('alb')) return '#ffffff';
  if (lower.includes('maro')) return '#5d4037';
  if (lower.includes('negru')) return '#1f2937';
  if (lower.includes('antracit')) return '#334155';
  if (lower.includes('stejar')) return '#b45309';
  return '#94a3b8'; // default
};

const getGlassColorHex = (type: string) => {
  const lower = (type || '').toLowerCase();
  if (lower.includes('transparent')) return '#eff6ff';
  if (lower.includes('mat')) return '#f8fafc';
  if (lower.includes('neagr')) return '#334155';
  if (lower.includes('maro')) return '#fffbeb';
  return '#e2e8f0'; // default
};

export default function CosPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);

  const [popup, setPopup] = useState<{show: boolean, message: string, type: 'success' | 'error'}>({
    show: false, message: '', type: 'success'
  });

  const showPopup = (message: string, type: 'success' | 'error') => {
    setPopup({ show: true, message, type });
    setTimeout(() => {
      setPopup({ show: false, message: '', type: 'success' });
    }, 5000);
  };

  useEffect(() => {
    // Încărcăm coșul doar la deschiderea paginii
    setCartItems(cartManager.getItems());
    // Am șters "window.addEventListener" de aici ca să oprim confuzia de refresh dublu.
  }, []);

  const removeItem = (id: string | number) => {
    // 1. Ștergem fizic din memoria browserului
    cartManager.removeItem(String(id));

    // 2. Extragem lista rămasă și o clonăm profund.
    // Această clonare (JSON.parse(JSON.stringify)) forțează React să vadă o listă complet nouă
    // și să șteargă vizual instantaneu produsul de pe ecran!
    const remainingItems = cartManager.getItems();
    setCartItems(JSON.parse(JSON.stringify(remainingItems)));

    // 3. Trimitem semnalul DOAR pentru ca meniul de sus să își scadă bulina roșie
    window.dispatchEvent(new Event('cart-updated'));
  };

  const clearCart = () => {
    cartManager.clearCart();
    setCartItems([]);
    window.dispatchEvent(new Event('cart-updated'));
  };

  const getTotal = () => cartItems.reduce((total, item) => total + item.price, 0);

  const getPanelArea = (widthCm: number, heightCm: number, sections: number) => {
    return ((widthCm / 100) / sections) * (heightCm / 100);
  };

  const hasOversizedPanels = cartItems.some(item => getPanelArea(item.width, item.height, item.sections) > 2.7);

  const sendOrderEmail = async () => {
    if (hasOversizedPanels) {
      showPopup('Atenție! Aveți sisteme cu panouri prea mari în coș. Vă rugăm să le corectați.', 'error');
      return;
    }

    if (!customerInfo.name || !customerInfo.phone) {
      showPopup('Vă rugăm completați Numele și Telefonul obligatoriu!', 'error');
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(`${basePath}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: "Nespecificată",
          message: customerInfo.message,
          cartData: cartItems
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showPopup('Comanda dumneavoastră a fost trimisă cu succes! Vă vom contacta în curând.', 'success');
        clearCart();
        setCustomerInfo({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      showPopup('A apărut o eroare la trimiterea comenzii. Vă rugăm încercați din nou.', 'error');
    } finally {
      setIsSending(false);
    }
  };

  const renderCartDiagram = (item: CartItem) => {
    const paddingX = 25;
    const paddingY = 20;
    const aspectRatio = item.width / item.height;

    let boxW = 150;
    let boxH = 150 / aspectRatio;

    if (boxH < 35) boxH = 35;
    if (boxH > 120) boxH = 120;

    const svgWidth = boxW;
    const svgHeight = boxH;
    const sectionW = boxW / item.sections;

    const profileColorHex = getProfileColorHex(item.profileColor);
    const glassColorHex = getGlassColorHex(item.glassType);

    const isDarkGlass = (item.glassType || '').toLowerCase().includes('neagr');
    const innerTextColor = isDarkGlass ? '#f8fafc' : '#2563eb';
    const outerTextColor = '#475569';

    const innerFontSize = Math.min(6.5, sectionW / 3.5);

    return (
      <svg viewBox={`0 0 ${svgWidth + paddingX * 2} ${svgHeight + paddingY * 2}`} className="w-full h-full max-h-[180px] drop-shadow-md overflow-visible">
        <rect x={paddingX} y={paddingY} width={boxW} height={boxH} fill={glassColorHex} stroke={profileColorHex} strokeWidth="3" rx="1" />
        {Array.from({ length: item.sections - 1 }).map((_, i) => (
          <line key={i} x1={paddingX + sectionW * (i + 1)} y1={paddingY} x2={paddingX + sectionW * (i + 1)} y2={paddingY + boxH} stroke={profileColorHex} strokeWidth="2" />
        ))}
        <text x={paddingX + (boxW / 2)} y={paddingY - 6} textAnchor="middle" fontSize="8" fill={outerTextColor} fontWeight="bold">
          {item.width} cm
        </text>
        <text x={paddingX - 8} y={paddingY + (boxH / 2)} textAnchor="middle" transform={`rotate(-90 ${paddingX - 8} ${paddingY + (boxH / 2)})`} fontSize="8" fill={outerTextColor} fontWeight="bold">
          {item.height} cm
        </text>
        {Array.from({ length: item.sections }).map((_, i) => (
          <text key={`sec-${i}`} x={paddingX + (sectionW * i) + (sectionW / 2)} y={paddingY + (boxH / 2) + (innerFontSize/2.5)} textAnchor="middle" fontSize={innerFontSize} fill={innerTextColor} fontWeight="bold">
            {(item.width / item.sections).toFixed(1)}
          </text>
        ))}
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative">

      {popup.show && (
        <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-xl text-white font-medium flex items-center gap-3 transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${popup.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
          {popup.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
          {popup.message}
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-slate-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Coșul este gol</h1>
          <p className="text-slate-600 mb-6">Nu ați adăugat încă nicio configurare în coș</p>
          <Button asChild size="lg">
            <a href={`${basePath}/produse`}>Vizualizați Produse <ArrowRight className="ml-2 h-4 w-4" /></a>
          </Button>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Coș de Configurări</h1>
            <p className="text-lg text-slate-600">Revizuiți configurările selectate și trimiteți comanda</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, index) => {
                const panelArea = getPanelArea(item.width, item.height, item.sections);
                const isOversized = panelArea > 2.7;

                return (
                  <Card key={item.id} className={`bg-white/80 backdrop-blur-sm transition-colors ${isOversized ? 'border-red-400 ring-1 ring-red-400 bg-red-50/30' : 'border-slate-200'}`}>
                    <CardHeader className="pb-3 border-b border-slate-100">
                      <div className="flex items-center justify-between">
                        <CardTitle className={`text-lg ${isOversized ? 'text-red-700' : ''}`}>Sistem {index + 1} <span className="text-slate-500 font-normal text-sm ml-2">({item.systemModel || 'Nespecificat'})</span></CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row gap-8">

                        <div className="flex-1 grid grid-cols-2 gap-y-5 gap-x-2 text-sm">
                          <div>
                            <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-1">Dimensiuni Gol</span>
                            <p className="font-bold text-slate-900 text-base">{item.width}cm <span className="text-slate-400 font-normal text-sm">L</span> × {item.height}cm <span className="text-slate-400 font-normal text-sm">H</span></p>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-1">Panouri</span>
                            <p className="font-bold text-slate-900 text-base">{item.sections} bucăți</p>
                            <p className="text-xs text-slate-600 font-medium mt-0.5">Lățime panou: {(item.width / item.sections).toFixed(1)} cm</p>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-1">Profil (Ramă)</span>
                            <p className="font-bold text-slate-900">{item.profileType}</p>
                            <p className="text-xs text-slate-600 mt-0.5">Cul: {item.profileColor}</p>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-1">Sticlă</span>
                            <p className="font-bold text-slate-900">{item.glassType}</p>
                          </div>
                        </div>

                        <div className="w-full md:w-[320px] shrink-0 bg-slate-50/70 rounded-xl p-4 flex flex-col items-center justify-center border border-slate-200">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-2 font-semibold">Vedere Frontală</span>
                          <div className="w-full flex justify-center">
                            {renderCartDiagram(item)}
                          </div>
                        </div>
                      </div>

                      {isOversized && (
                        <div className="mt-6 p-3 bg-red-100 text-red-800 text-sm rounded-md flex items-start gap-2 border border-red-200">
                          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                          <p>
                            <strong>Panou prea mare!</strong> Suprafața unui panou este de <strong>{panelArea.toFixed(2)} m²</strong>, depășind limita maximă de siguranță de 2.7 m². <br/>
                            Vă rugăm să ștergeți această configurare și să o refaceți adăugând mai multe secțiuni (deschideri).
                          </p>
                        </div>
                      )}

                      <div className="mt-6 border-t border-slate-100 pt-5 flex justify-between items-center">
                        <span className="text-slate-600 font-medium">Preț estimativ sistem:</span>
                        <p className={`text-2xl font-black ${isOversized ? 'text-slate-400 line-through' : 'text-blue-600'}`}>{item.price} Lei</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
                <CardHeader><CardTitle>Sumar Comandă</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {cartItems.map((item, index) => {
                      const isOversized = getPanelArea(item.width, item.height, item.sections) > 2.7;
                      return (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className={`text-slate-600 ${isOversized ? 'text-red-500 font-semibold' : ''}`}>Sistem {index + 1}:</span>
                          <span className={`font-medium ${isOversized ? 'text-red-500' : ''}`}>
                            {isOversized ? 'Eroare' : `${item.price} Lei`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-3xl font-black text-blue-600">{hasOversizedPanels ? '---' : `${getTotal()} Lei`}</span>
                  </div>
                  <div className="text-xs text-slate-500 text-center mt-2">
                    Prețul final include TVA
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5 text-blue-600" /> Date de Contact</CardTitle>
                  <CardDescription>Completați datele pentru a trimite cererea</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nume *</Label>
                    <Input id="name" value={customerInfo.name} onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))} placeholder="Numele dumneavoastră" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input id="phone" value={customerInfo.phone} onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))} placeholder="07XX XXX XXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (opțional)</Label>
                    <Input id="email" type="email" value={customerInfo.email} onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))} placeholder="email@exemplu.ro" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mesaj (opțional)</Label>
                    <Textarea id="message" value={customerInfo.message} onChange={(e) => setCustomerInfo(prev => ({ ...prev, message: e.target.value }))} placeholder="Introduceți alte detalii..." rows={3} />
                  </div>

                  {hasOversizedPanels && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      Rezolvați erorile de dimensiune (marcate cu roșu) pentru a putea trimite comanda.
                    </div>
                  )}

                  <Button
                    onClick={sendOrderEmail}
                    className={`w-full h-12 text-md font-bold ${hasOversizedPanels ? 'bg-slate-300 hover:bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    disabled={isSending || hasOversizedPanels}
                  >
                    {isSending ? (
                      <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> Se trimite...</>
                    ) : hasOversizedPanels ? (
                      'Comandă indisponibilă'
                    ) : (
                      <><Send className="mr-2 h-5 w-5" /> Trimite Comanda</>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}