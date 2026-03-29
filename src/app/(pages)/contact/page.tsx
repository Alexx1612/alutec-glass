'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cartManager } from '@/lib/cart';

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const cartData = cartManager.getItems();

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, cartData }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      toast({
        title: "✅ Cerere Trimisă cu Succes!",
        description: "Vă vom contacta în cel mai scurt timp pentru detalii.",
        className: "bg-emerald-600 text-white border-none shadow-2xl",
      });

      setFormData({ name: '', phone: '', email: '', address: '', message: '' });
      cartManager.clearCart();
      window.dispatchEvent(new CustomEvent('cart-updated')); // Resetează bulina roșie
    } catch (error: any) {
      toast({
        title: "Eroare",
        description: error.message || "Eroare. Ne puteți contacta pe WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50/50 flex flex-col">
      <section className="bg-blue-900 text-white py-10 px-6 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700 to-transparent opacity-60"></div>
        <div className="max-w-6xl mx-auto text-center space-y-2 relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Contact & Finalizare Coș</h1>
          <p className="text-lg text-blue-200 font-medium">Trimiteți cererea de ofertă sau contactați-ne pe WhatsApp.</p>
        </div>
      </section>

      <div className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-950 mb-6 border-b border-blue-100 pb-4">Date de Contact & Livrare</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-blue-900 font-semibold">Nume complet *</Label>
                <Input
                  id="name" required placeholder="Ion Popescu"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-blue-50/50 border-blue-200 focus-visible:ring-blue-600 h-12"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-blue-900 font-semibold">Telefon *</Label>
                  <Input
                    id="phone" type="tel" required placeholder="07XX XXX XXX"
                    value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-blue-50/50 border-blue-200 focus-visible:ring-blue-600 h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-blue-900 font-semibold">Email (opțional)</Label>
                  <Input
                    id="email" type="email" placeholder="ion@email.com"
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-blue-50/50 border-blue-200 focus-visible:ring-blue-600 h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-blue-900 font-semibold">Adresa Livrării / Montajului *</Label>
                <Input
                  id="address" required placeholder="Strada, Număr, Oraș, Județ"
                  value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="bg-blue-50/50 border-blue-200 focus-visible:ring-blue-600 h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-blue-900 font-semibold">Detalii lucrare (opțional)</Label>
                <Textarea
                  id="message" placeholder="Doresc închiderea unui balcon de..."
                  value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="min-h-[100px] bg-blue-50/50 border-blue-200 focus-visible:ring-blue-600"
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg font-bold shadow-lg rounded-xl" disabled={isSubmitting}>
                <Send className="mr-2 h-5 w-5" />
                {isSubmitting ? 'Se trimite...' : 'Trimite Cererea de Ofertă'}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-blue-100">
              <Button
                variant="outline"
                className="w-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border-[#25D366]/30 h-14 text-lg font-bold rounded-xl"
                onClick={() => window.open('https://wa.me/40769999296', '_blank')}
              >
                <MessageCircle className="mr-2 h-6 w-6" />
                Discută rapid pe WhatsApp
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 space-y-6">
              <h2 className="text-xl font-bold text-blue-950 border-b border-blue-100 pb-4">Informații Alutec Glass</h2>

              <div className="space-y-5">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl text-blue-700 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-blue-950">Locație & Adresă</h3>
                    <p className="text-slate-600 leading-snug">
                      Strada Oltului 28C, 145100<br/>Roșiori de Vede, România
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl text-blue-700 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-blue-950">Telefon</h3>
                    <p className="text-slate-600">0769 999 296</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl text-blue-700 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-blue-950">Email</h3>
                    <p className="text-slate-600">alutecglass.ro@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps iFrame fixat pe noile coordonate */}
            <div className="bg-slate-200 rounded-2xl overflow-hidden h-[400px] border-2 border-white shadow-xl relative">
              <iframe
                src="https://maps.google.com/maps?q=44.113590,24.982642&t=&z=17&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}