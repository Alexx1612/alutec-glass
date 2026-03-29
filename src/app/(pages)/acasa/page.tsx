'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Calculator, ShieldCheck, Maximize, MapPin, Wrench, Download, Users, Star, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadGhid = (e: React.FormEvent) => {
    e.preventDefault();
    // Afișăm mesajul de succes în locul formularului
    setDownloadSuccess(true);
    // Deschidem automat PDF-ul din folderul /public într-un tab nou
    window.open('/ghid-terase.pdf', '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">

      {/* 1. HERO SECTION - Prima impresie */}
      <section className="relative bg-blue-950 text-white overflow-hidden">
        {/* Imaginea de fundal - actualizată să fie citită din /images */}
        <div className="absolute inset-0 bg-[url('/images/hero-bg.webp')] bg-cover bg-center opacity-50"></div>
        {/* Gradient care e mai închis sus și jos, și mai transparent în mijloc */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-900/60 to-blue-950/90"></div>

        <div className="container relative z-10 mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
          <span className="inline-block mb-6 bg-blue-600/40 text-white border border-blue-400/50 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
            Sisteme Premium de Închideri
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight drop-shadow-md">
            Închidere Terasă cu Sticlă Glisantă & Culisantă
          </h1>
          <p className="text-lg md:text-xl text-blue-50 mb-10 max-w-2xl font-medium drop-shadow-sm">
            Transformă-ți terasa, balconul sau foișorul într-un spațiu utilizabil 365 de zile pe an. Montaj profesional de sticlă securizată la cel mai bun raport calitate-preț.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-500 text-white text-lg h-14 px-8 rounded-xl shadow-[0_0_20px_-5px_rgba(234,88,12,0.6)]">
              <Link href="/calcul">
                <Calculator className="mr-2 h-5 w-5" />
                Calculează Prețul Acum
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-blue-950 h-14 px-8 rounded-xl backdrop-blur-sm transition-all">
              <Link href="/produse">
                Vezi Produsele Noastre
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. HOOK-UL PENTRU CALCULATOR */}
      <section className="py-12 bg-white border-b border-slate-200 shadow-sm relative z-20 -mt-6 mx-4 md:mx-auto max-w-5xl rounded-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-12 gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Curios cât costă să-ți faci o terasă din sticlă închisă?
            </h2>
            <p className="text-slate-600 text-lg">
              Nu mai pierde timpul așteptând oferte pe email. Calculatorul nostru îți dă răspunsul pe loc!
            </p>
          </div>
          <div className="shrink-0">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg h-14 px-8 rounded-xl shadow-lg w-full md:w-auto">
              <Link href="/calcul">
                Deschide Calculatorul <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3. BENEFICII */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">De ce să alegi sistemele noastre de sticlă?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Oferim soluții moderne pentru închiderea teraselor și balcoanelor, folosind doar materiale de înaltă calitate și sisteme testate în timp.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center text-blue-600 mb-6">
              <Maximize className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Sisteme Glisante și Culisante</h3>
            <p className="text-slate-600 leading-relaxed">
              Design minimalist fără profile verticale inestetice. Perfecte pentru a păstra o vedere panoramică. Un <strong>sistem glisant din sticlă</strong> îți permite deschiderea completă a spațiului vara.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center text-blue-600 mb-6">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Montaj Sticlă Securizată</h3>
            <p className="text-slate-600 leading-relaxed">
              Siguranța familiei tale este pe primul loc. Realizăm <strong>montaj de sticlă securizată</strong> rezistentă la șocuri puternice, vânt extrem și variații de temperatură.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center text-blue-600 mb-6">
              <Wrench className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Închidere Foișor & Balcon</h3>
            <p className="text-slate-600 leading-relaxed">
              Fie că vrei o <strong>închidere de foișor cu sticlă</strong> pentru curtea ta sau modernizarea unui balcon de apartament, sistemele noastre se adaptează oricărei dimensiuni.
            </p>
          </div>
        </div>
      </section>

      {/* 4. EXPERIENȚA UMANĂ */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <span className="inline-block bg-orange-500 text-white font-bold px-3 py-1 text-sm uppercase rounded">Experiență Reală</span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Nu suntem doar montatori. Construim spații în care să te simți acasă.
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Știm că decizia de a investi într-o terasă de sticlă nu este ușoară. Spre deosebire de alte firme care doar îți trimit o ofertă rece, noi venim cu consultanță reală pe teren. Rezolvăm pereții strâmbi, gândim pantele de scurgere a apei și ne asigurăm că sistemul culisează cu un singur deget.
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <Star className="text-orange-400 w-8 h-8" />
                  <span className="font-semibold text-lg">Clienți Mulțumiți</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-blue-400 w-8 h-8" />
                  <span className="font-semibold text-lg">Echipă Proprie de Montaj</span>
                </div>
              </div>
            </div>
            {/* AM ÎNLOCUIT BACKGROUND-UL CU UN IMG TAG REAL PENTRU SIGURANȚĂ 100% */}
            <div className="flex-1 w-full h-80 bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden relative shadow-2xl">
              <img
                src="/images/echipa-montaj-teresa.webp"
                alt="Echipa Alutec Glass la montaj"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LEAD MAGNET (Ghid PDF) */}
      <section className="py-16 bg-blue-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full -ml-10 -mb-10"></div>

        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <Download className="w-12 h-12 text-white mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold text-white mb-4">Ghid Gratuit: 5 Greșeli de evitat când îți închizi terasa cu sticlă</h2>

          {!downloadSuccess ? (
            <>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Nu arunca banii pe fereastră! Lasă-ne adresa ta de email și descarcă imediat un scurt ghid PDF cu lucrurile la care trebuie să fii atent înainte de a semna cu orice echipă de montaj.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleDownloadGhid}>
                <Input type="email" placeholder="Adresa ta de email" required className="h-12 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus-visible:ring-white" />
                <Button type="submit" className="h-12 bg-white text-blue-700 hover:bg-blue-50 font-bold px-6">
                  Vreau Ghidul Acum
                </Button>
              </form>
              <p className="text-blue-200 text-xs mt-4">Nu facem spam. Te poți dezabona oricând.</p>
            </>
          ) : (
            <div className="bg-emerald-500/20 border border-emerald-400/50 p-6 rounded-xl max-w-2xl mx-auto animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-2">Ghidul se deschide acum!</h3>
              <p className="text-emerald-100">Dacă nu s-a deschis automat într-un tab nou, <a href="/ghid-terase.pdf" target="_blank" className="underline font-bold text-white">apasă aici pentru a-l descărca manual</a>.</p>
            </div>
          )}
        </div>
      </section>

      {/* 6. SECȚIUNEA FAQ / SEO HEAVY */}
      <section className="py-20 bg-slate-50 text-slate-800 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Întrebări Frecvente</h2>
            <p className="text-slate-500">Răspunsuri la cele mai comune căutări ale clienților noștri de pe Google.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-start gap-2">
                <span className="text-blue-600">Q:</span> Cât costă închiderea unei terase cu sticlă (preț mp)?
              </h3>
              <p className="leading-relaxed text-sm md:text-base text-slate-600">
                Mulți clienți caută <strong>închidere terasă cu sticlă preț mp</strong>. Adevărul este că prețul variază în funcție de tipul profilului, numărul de secțiuni și sticlă. În loc de un preț vag pe metru pătrat, te invităm să folosești <Link href="/calcul" className="text-blue-600 underline hover:text-blue-700 font-medium">calculatorul nostru</Link> pentru o cotație exactă și personalizată pe loc.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-start gap-2">
                <span className="text-blue-600">Q:</span> Care sunt cele mai bune păreri despre sticla culisantă pentru balcon?
              </h3>
              <p className="leading-relaxed text-sm md:text-base text-slate-600">
                Dacă citești orice forum sau cauți <strong>păreri sticlă culisantă balcon</strong>, vei vedea că principalul avantaj este luminozitatea și deschiderea completă. Sistemele noastre oferă un design "frameless" (fără rame vizibile între panouri).
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-start gap-2">
                <span className="text-blue-600">Q:</span> Realizați și închidere de foișor cu sticlă?
              </h3>
              <p className="leading-relaxed text-sm md:text-base text-slate-600">
                Da! Serviciul de <strong>închidere foișor sticlă</strong> este unul dintre cele mai solicitate. Transformăm un foișor din lemn într-un spațiu protejat de vânt și ploaie, cu o izolație și funcționalitate superioară foliei clasice.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-start gap-2">
                <span className="text-blue-600">Q:</span> Glisantă vs. Termopan - ce să aleg?
              </h3>
              <p className="leading-relaxed text-sm md:text-base text-slate-600">
                Căutările pentru <strong>închidere terasă cu termopan preț</strong> sunt frecvente, dar sistemele glisante din sticlă oferă o estetică net superioară. Ele culisează compact într-o parte, lăsând spațiul 100% deschis vara, lucru imposibil cu termopanele.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LOCAL SEO & CALL TO ACTION FINAL (EXCLUSIV TELEORMAN) */}
      <section className="py-16 bg-blue-50 border-t border-blue-100">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <MapPin className="h-10 w-10 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Unde montăm sistemele noastre?</h2>
          <p className="text-lg text-slate-700 mb-8">
            Echipa Alutec Glass oferă consultanță, măsurători și montaj profesionist exclusiv în <strong>Județul Teleorman (Roșiori de Vede, Alexandria, Turnu Măgurele, Videle și comunele limitrofe)</strong>. Focusul nostru local ne permite să oferim cel mai rapid timp de execuție și intervenție!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 text-white text-lg h-14 px-8 rounded-xl">
              <Link href="/contact">
                Contactează-ne pentru detalii
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}