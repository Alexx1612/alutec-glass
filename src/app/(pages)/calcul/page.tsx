'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingBag, Ruler, ArrowRight, PaintBucket, CheckCircle2, AlertCircle } from 'lucide-react';
import { cartManager } from '@/lib/cart';
import { calculatePrice, PROFILE_TYPES, PROFILE_COLORS, GLASS_TYPES, type CalculationParams } from '@/lib/calculator';

const SYSTEM_MODELS = [
  'Sistem Glisant',
  'Sistem Culisant',
  'Sticlă Fixă'
];

export default function CalculatorPage() {
  const [params, setParams] = useState<CalculationParams & { systemModel: string }>({
    width: 300,
    height: 200,
    profileType: PROFILE_TYPES[0],
    profileColor: PROFILE_COLORS[0],
    sections: 3,
    glassType: GLASS_TYPES[0],
    systemModel: SYSTEM_MODELS[0],
  });

  const [customColor, setCustomColor] = useState('');
  const [result, setResult] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);

  // Stare nouă: Ne spune dacă utilizatorul a apăsat butonul de calcul măcar o dată
  const [hasCalculated, setHasCalculated] = useState(false);

  // Starea pentru Pop-Up-ul personalizat
  const [popup, setPopup] = useState<{show: boolean, message: string, type: 'success' | 'error'}>({
    show: false, message: '', type: 'success'
  });

  const showPopup = (message: string, type: 'success' | 'error') => {
    setPopup({ show: true, message, type });
    setTimeout(() => {
      setPopup({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  // Recalculare automată în fundal (pentru a avea mereu prețul corect sincronizat)
  useEffect(() => {
    const calcResult = calculatePrice(params);
    setResult(calcResult);
  }, [params]);

  useEffect(() => {
    setCartCount(cartManager.getItems().length);
    const handleCartUpdate = () => setCartCount(cartManager.getItems().length);
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  const handleCalculate = () => {
    // Apăsarea butonului doar afișează secțiunea (prețul e calculat deja instant în fundal)
    setHasCalculated(true);
  };

  // --- VALIDĂRI DIMENSIUNI MAXIME ---
  const panelAreaMeters = ((params.width / 100) / params.sections) * (params.height / 100);
  const isGlassTooBig = panelAreaMeters > 2.7;
  const isHeightTooBig = params.height > 250;
  const isInvalidDimensions = isGlassTooBig || isHeightTooBig;

  const handleAddToCart = () => {
    if (!result || result.error || isInvalidDimensions) return;

    const finalColor = params.profileColor === 'Custom'
      ? `Custom (${customColor || 'Nespecificat'})`
      : params.profileColor;

    cartManager.addItem({
      ...params,
      profileColor: finalColor,
      price: result.totalPrice
    });

    showPopup("✅ SISTEM ADĂUGAT ÎN COȘ! Produsul a fost salvat.", "success");
  };

  const getProfileColorHex = (color: string) => {
    switch(color) {
      case 'Alb': return '#ffffff';
      case 'Maro': return '#5d4037';
      case 'Negru': return '#1f2937';
      default: return '#94a3b8';
    }
  };

  const getGlassColorHex = (type: string) => {
    switch(type) {
      case 'Transparentă': return '#eff6ff';
      case 'Mată': return '#f8fafc';
      case 'Neagră': return '#334155';
      case 'Maro': return '#fffbeb';
      default: return '#e2e8f0';
    }
  };

  const renderDiagram = () => {
    const paddingX = 20;
    const paddingY = 20;
    const aspectRatio = params.width / params.height;

    let boxW = 100;
    let boxH = 100 / aspectRatio;

    if (boxH < 25) boxH = 25;
    if (boxH > 150) boxH = 150;

    const svgWidth = boxW;
    const svgHeight = boxH;
    const sectionW = boxW / params.sections;

    const profileColorHex = getProfileColorHex(params.profileColor);
    const glassColorHex = getGlassColorHex(params.glassType);

    return (
      <svg viewBox={`0 0 ${svgWidth + paddingX * 2} ${svgHeight + paddingY * 2}`} className="w-full h-full drop-shadow-xl overflow-visible">
        <rect x={paddingX} y={paddingY} width={boxW} height={boxH} fill={glassColorHex} stroke={profileColorHex} strokeWidth="2.5" rx="1" />
        {Array.from({ length: params.sections - 1 }).map((_, i) => (
          <line key={i} x1={paddingX + sectionW * (i + 1)} y1={paddingY} x2={paddingX + sectionW * (i + 1)} y2={paddingY + boxH} stroke={profileColorHex} strokeWidth="1.5" />
        ))}
        <text x={paddingX + (boxW / 2)} y={12} textAnchor="middle" fontSize="6.5" fill="#1e3a8a" fontWeight="bold">{params.width} cm</text>
        <text x={10} y={paddingY + (boxH / 2)} textAnchor="middle" transform={`rotate(-90 10 ${paddingY + (boxH / 2)})`} fontSize="6.5" fill="#1e3a8a" fontWeight="bold">{params.height} cm</text>
        {Array.from({ length: params.sections }).map((_, i) => (
          <text key={`sec-${i}`} x={paddingX + (sectionW * i) + (sectionW / 2)} y={paddingY + (boxH / 2) + 2.5} textAnchor="middle" fontSize="4.5" fill="#3b82f6" fontWeight="bold">
            {(params.width / params.sections).toFixed(1)}
          </text>
        ))}
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-sky-50/50 flex flex-col relative">

      {/* POP-UP PERSONALIZAT (Apare sus pe mijloc) */}
      {popup.show && (
        <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-xl text-white font-medium flex items-center gap-3 transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${popup.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
          {popup.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
          {popup.message}
        </div>
      )}

      <section className="bg-blue-900 text-white py-8 md:py-10 px-6 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-800/40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700 to-transparent opacity-60"></div>
        <div className="max-w-6xl mx-auto text-center space-y-2 relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Calculator Preț</h1>
          <p className="text-blue-100 font-medium text-sm md:text-base">Configurează sistemul tău și află instant o estimare de preț.</p>
        </div>
      </section>

      <div className="flex-grow max-w-7xl mx-auto px-4 md:px-6 py-8 w-full space-y-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 bg-white p-6 md:p-10 rounded-3xl shadow-2xl border border-blue-100">

          <div className="space-y-6">
            <div className="flex items-center border-b border-blue-100 pb-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-700 mr-3">
                <Ruler className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-blue-950">Dimensiuni & Configurație</h2>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-blue-900">Lățime totală (cm)</Label>
                <Input type="number" value={params.width} onChange={(e) => setParams({ ...params, width: Number(e.target.value) })} className="h-12 text-lg bg-blue-50/50 border-blue-200 focus-visible:ring-blue-600 font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-blue-900">Înălțime totală (cm)</Label>
                <Input type="number" value={params.height} onChange={(e) => setParams({ ...params, height: Number(e.target.value) })} className="h-12 text-lg bg-blue-50/50 border-blue-200 focus-visible:ring-blue-600 font-bold" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-blue-900">Model Sistem</Label>
                <select className="flex h-12 w-full rounded-xl border border-blue-200 bg-blue-50/50 px-3 py-2 text-base font-semibold focus:ring-2 focus:ring-blue-600 outline-none text-blue-950" value={params.systemModel} onChange={(e) => setParams({ ...params, systemModel: e.target.value })}>
                  {SYSTEM_MODELS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-blue-900">Secțiuni (panouri)</Label>
                <Input type="number" min="2" max="20" value={params.sections} onChange={(e) => setParams({ ...params, sections: Number(e.target.value) })} className="h-12 text-lg bg-blue-50/50 border-blue-200 focus-visible:ring-blue-600 font-bold" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-blue-900">Tip Profil</Label>
                <select className="flex h-12 w-full rounded-xl border border-blue-200 bg-blue-50/50 px-3 py-2 text-base font-semibold focus:ring-2 focus:ring-blue-600 outline-none text-blue-950" value={params.profileType} onChange={(e) => setParams({ ...params, profileType: e.target.value })}>
                  {PROFILE_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-blue-900">Culoare Profil</Label>
                <select className="flex h-12 w-full rounded-xl border border-blue-200 bg-blue-50/50 px-3 py-2 text-base font-semibold focus:ring-2 focus:ring-blue-600 outline-none text-blue-950" value={params.profileColor} onChange={(e) => setParams({ ...params, profileColor: e.target.value })}>
                  {PROFILE_COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {params.profileColor === 'Custom' && (
                <div className="space-y-2 col-span-2 bg-blue-50/80 p-4 rounded-xl border border-blue-200 animate-in fade-in zoom-in-95 duration-200">
                  <Label className="text-sm font-bold text-blue-900 flex items-center gap-2">
                    <PaintBucket className="w-4 h-4" /> Specificați Culoarea Dorită (Cod RAL / Nume)
                  </Label>
                  <Input type="text" placeholder="Ex: Antracit, RAL 7016..." value={customColor} onChange={(e) => setCustomColor(e.target.value)} className="h-12 text-lg bg-white border-blue-300 focus-visible:ring-blue-600 shadow-sm rounded-xl" />
                </div>
              )}
            </div>

            <div className="space-y-2 bg-blue-50 p-5 rounded-2xl border border-blue-100">
              <Label className="text-sm font-semibold text-blue-900">Nuanță Sticlă</Label>
              <select className="flex h-12 w-full rounded-xl border border-blue-200 bg-white px-3 py-2 text-base font-semibold focus:ring-2 focus:ring-blue-600 outline-none text-blue-950" value={params.glassType} onChange={(e) => setParams({ ...params, glassType: e.target.value })}>
                {GLASS_TYPES.filter(g => g !== 'Custom').map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <Button onClick={handleCalculate} className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg font-extrabold shadow-lg mt-2 transition-all rounded-xl">
              Calculează Prețul
            </Button>
          </div>

          <div className="space-y-6 flex flex-col w-full overflow-hidden">
            <h2 className="text-2xl font-bold border-b border-blue-100 pb-3 text-blue-950">Schiță și Preț</h2>

            {/* Arătăm o secțiune goală (placeholder) până la apăsarea butonului */}
            {!hasCalculated ? (
              <div className="flex-grow bg-slate-50 border-2 border-dashed border-blue-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
                <div className="bg-blue-100 p-4 rounded-full text-blue-500 mb-4 animate-pulse">
                  <Ruler className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-2">Sistem Neconfigurat</h3>
                <p className="text-slate-500 max-w-sm">
                  Introduceți dimensiunile dorite în partea stângă și apăsați butonul <strong className="text-blue-600">"Calculează Prețul"</strong> pentru a vizualiza sistemul.
                </p>
              </div>
            ) : (
              <>
                <div className="flex-grow bg-slate-50 border-2 border-dashed border-blue-200 rounded-3xl flex items-center justify-center p-4 md:p-8 shadow-inner min-h-[300px] w-full animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-full max-w-[700px] flex items-center justify-center">
                    {renderDiagram()}
                  </div>
                </div>

                {result && (
                  <div className="bg-blue-900 text-white p-6 md:p-8 rounded-3xl space-y-6 animate-in fade-in slide-in-from-bottom-4 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-30 -mr-10 -mt-10"></div>

                    {result.error ? (
                      <div className="text-red-400 font-bold text-lg text-center p-4 bg-red-400/10 rounded-xl relative z-10 border border-red-400/20">
                        {result.error}
                      </div>
                    ) : (
                      <div className="relative z-10">
                        <div className="flex justify-between items-end border-b border-blue-800 pb-5">
                          <div className="space-y-1">
                            <p className="text-blue-300 font-medium text-sm">Arie sticlă</p>
                            <p className="text-2xl font-bold text-white">{result.totalArea} m²</p>
                          </div>
                          <div className="space-y-1 text-right">
                            <p className="text-blue-300 font-medium text-sm">Total Estimat</p>
                            <p className="text-4xl md:text-5xl font-extrabold text-blue-300 drop-shadow-md">{result.totalPrice} <span className="text-2xl">RON</span></p>
                          </div>
                        </div>

                        <p className="text-center font-bold text-blue-100 bg-blue-950/60 py-2.5 rounded-xl mt-4 border border-blue-800/50">
                          ✓ Prețul include TVA
                        </p>

                        {/* Mesaj de eroare dacă dimensiunile sunt depășite */}
                        {isInvalidDimensions && (
                          <div className="bg-red-500/20 border border-red-500/50 text-red-100 p-4 rounded-xl mt-4 text-sm font-medium">
                            {isHeightTooBig && <p className="flex items-center gap-2"><AlertCircle className="w-4 h-4"/> Înălțimea maximă admisă este de 250 cm.</p>}
                            {isGlassTooBig && <p className="flex items-center gap-2 mt-1"><AlertCircle className="w-4 h-4"/> Suprafața unui panou ({panelAreaMeters.toFixed(2)} m²) depășește limita de 2.7 m².</p>}
                            <p className="mt-2 text-red-200 text-xs border-t border-red-500/30 pt-2 text-center">Modificați dimensiunile sau adăugați mai multe secțiuni pentru a comanda.</p>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                          <Button
                            onClick={handleAddToCart}
                            disabled={isInvalidDimensions}
                            className={`flex-1 ${isInvalidDimensions ? 'bg-slate-500/50 text-slate-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'} h-14 text-lg font-bold transition-all rounded-xl`}
                          >
                            <ShoppingBag className="mr-2 h-5 w-5" />
                            Adaugă în Coș
                          </Button>

                          {cartCount > 0 && (
                            <Link href="/cos" className="flex-1">
                              <Button className="w-full bg-orange-500 hover:bg-orange-400 text-white h-14 text-lg font-bold shadow-[0_0_20px_-5px_rgba(249,115,22,0.6)] transition-all rounded-xl relative">
                                Mergi spre Coș
                                <ArrowRight className="ml-2 h-6 w-6" />
                                <span className="absolute -top-3 -right-3 bg-red-600 text-white text-sm font-extrabold w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-xl animate-bounce">
                                  {cartCount}
                                </span>
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}