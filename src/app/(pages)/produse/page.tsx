'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CATEGORIES = [
  {
    title: "Sistem Glisant",
    description: "Panouri individuale care culisează și se parchează lateral pentru deschidere 100%.",
    image: "/images/sistem-glisant-terasa.webp" // Poza unde se strâng pachet
  },
  {
    title: "Sistem Culisant",
    description: "Panouri pe șine multiple care se trag unul după celălalt, ideal pentru spații înguste.",
    image: "/images/sistem-culisant-terasa.webp" // Poza panoramica cu sine
  },
  {
    title: "Sticlă Fixă / Balustrade",
    description: "Panouri de sticlă securizată pentru balustrade și închideri perimetrale permanente.",
    image: "/images/sistem-fix-terasa.webp" // Poza cu geamul curat, fix
  }
];

export default function ProdusePage() {
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-blue-50/50 flex flex-col">
      {/* Secțiunea de sus redusă ca înălțime */}
      <section className="bg-blue-950 text-white py-8 md:py-10 px-6 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-800 to-transparent opacity-60"></div>
        <div className="max-w-6xl mx-auto text-center space-y-2 relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Produsele Noastre</h1>
          <p className="text-base md:text-lg text-blue-200 font-medium">Descoperă cele 3 sisteme principale adaptate spațiului tău.</p>
        </div>
      </section>

      {/* Container extins pentru a face produsele mult mai mari */}
      <div className="flex-grow max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 md:px-8 py-12 md:py-16 w-full space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 xl:gap-16">
          {CATEGORIES.map((category, idx) => (
            <div key={idx} className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden flex flex-col transition-all hover:-translate-y-2 hover:shadow-2xl">

              <div
                className="relative aspect-[4/3] cursor-zoom-in bg-slate-100 group overflow-hidden"
                onClick={() => setZoomedImg(category.image)}
              >
                {/* Aici incarcam pozele tale */}
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-300" />
              </div>

              {/* Padding-uri și texte mărite corespunzător cu dimensiunea nouă a cardului */}
              <div className="p-8 md:p-10 lg:p-12 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">{category.title}</h2>
                  <p className="text-slate-600 leading-relaxed text-lg md:text-xl">{category.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-10 border-t border-blue-100">
          <Link href="/calcul">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white h-16 md:h-20 px-12 text-xl md:text-2xl font-bold shadow-xl rounded-2xl transition-all">
              <Calculator className="mr-3 h-7 w-7 md:h-8 md:w-8" />
              Mergi la Calculator Preț
            </Button>
          </Link>
        </div>
      </div>

      {zoomedImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/95 backdrop-blur-md cursor-zoom-out p-6 animate-in fade-in duration-200"
          onClick={() => setZoomedImg(null)}
        >
          <div className="relative w-full max-w-[90vw] max-h-[95vh] flex flex-col items-center">
            <button className="absolute -top-16 right-0 text-white/70 hover:text-white transition-colors">
              <X className="w-12 h-12" />
            </button>
            <div className="w-full bg-transparent rounded-2xl overflow-hidden flex items-center justify-center">
               <img src={zoomedImg} alt="Mărit" className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-xl" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}