import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const getProfileColorHex = (colorName: string) => {
  const name = (colorName || '').toLowerCase();
  if (name.includes('alb')) return '#ffffff'; // Rama alba cu border fin
  if (name.includes('antracit')) return '#334155'; // Gri antracit
  if (name.includes('negru')) return '#1f2937'; // Negru
  if (name.includes('maro')) return '#5d4037'; // Maro închis
  if (name.includes('stejar')) return '#b45309'; // Stejar auriu
  return '#94a3b8';
};

const getGlassColorHex = (typeName: string) => {
  const name = (typeName || '').toLowerCase();
  if (name.includes('transparent')) return '#eff6ff'; // Albastru super deschis
  if (name.includes('mat')) return '#f8fafc'; // Alb/Gri opac
  if (name.includes('neagr')) return '#334155'; // Sticla fumurie neagra
  if (name.includes('maro')) return '#fffbeb'; // Sticla fumurie maro
  return '#e2e8f0';
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, address, message, cartData } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    let cartHtml = '<p>Niciun produs în coș.</p>';
    if (cartData && cartData.length > 0) {
      cartHtml = cartData.map((item: any, index: number) => {
        const panelWidthCm = (item.width / item.sections).toFixed(1);
        const frameColor = getProfileColorHex(item.profileColor);
        const glassColor = getGlassColorHex(item.glassType);

        // Dacă sticla e închisă la culoare, textul de deasupra e alb
        const isDarkGlass = (item.glassType || '').toLowerCase().includes('neagr');
        const textColor = isDarkGlass ? '#ffffff' : '#0f172a';
        const subtleColor = isDarkGlass ? '#cbd5e1' : '#64748b';

        // Generăm dinamic panourile de sticlă cu dimensiuni scrise în interior
        let sectionsHtml = '';
        for(let i = 0; i < item.sections; i++) {
          sectionsHtml += `
            <td style="border: 2px solid ${frameColor}; background-color: ${glassColor}; width: ${100/item.sections}%; text-align: center; vertical-align: middle; padding: 4px;">
              <span style="font-size: 11px; color: ${textColor}; font-weight: bold; font-family: monospace;">${panelWidthCm}cm</span>
              <br/>
              <span style="font-size: 9px; color: ${subtleColor};">x</span>
              <br/>
              <span style="font-size: 11px; color: ${textColor}; font-weight: bold; font-family: monospace;">${item.height}cm</span>
            </td>`;
        }

        return `
          <div style="margin-bottom: 30px; font-family: Arial, sans-serif; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; background-color: #ffffff;">
            <h3 style="color: #1e3a8a; margin-top: 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">🛒 Sistemul ${index + 1} (${item.systemModel || 'Glisant'})</h3>

            <table style="width: 100%; border-spacing: 0;">
              <tr>
                <td style="vertical-align: top; width: 55%; color: #334155; line-height: 1.8; padding-right: 15px;">
                  <strong>📏 Gol Total:</strong> ${item.width}cm L x ${item.height}cm H<br>
                  <strong>🪟 Panouri:</strong> ${item.sections} secțiuni (${panelWidthCm} cm / panou)<br>
                  <strong>🎨 Culoare Profil:</strong> ${item.profileColor}<br>
                  <strong>🧊 Nuanță Sticlă:</strong> ${item.glassType}<br>
                  <div style="margin-top: 15px; padding: 10px; background-color: #f8fafc; display: inline-block; border-radius: 6px; border-left: 4px solid #2563eb;">
                    <strong style="color: #2563eb; font-size: 16px;">💰 Preț Calculat: ${item.price} Lei</strong>
                  </div>
                </td>

                <td style="vertical-align: top; width: 45%; text-align: right;">
                  <div style="display: inline-block; text-align: center;">
                    <span style="font-size: 11px; color: #64748b; display: block; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Schiță culori fațadă:</span>
                    <table style="width: 260px; height: 130px; border: 3px solid ${frameColor}; border-collapse: collapse; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                      <tr>
                        ${sectionsHtml}
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        `;
      }).join('');
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
        <div style="background-color: #1e3a8a; color: white; padding: 25px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">Comandă Nouă • Alutec Glass</h1>
        </div>

        <div style="background-color: white; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);">
          <h2 style="color: #0f172a; margin-top: 0; font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">👤 Detalii Contact Client</h2>
          <table style="width: 100%; margin-bottom: 25px; color: #334155; line-height: 1.6;">
            <tr><td style="width: 100px;"><strong>Nume:</strong></td><td>${name}</td></tr>
            <tr><td><strong>Telefon:</strong></td><td><a href="tel:${phone}" style="color: #2563eb; text-decoration: none; font-weight: bold;">${phone}</a></td></tr>
            <tr><td><strong>Email:</strong></td><td>${email || '<span style="color: #94a3b8;">Nespecificat</span>'}</td></tr>
          </table>

          <div style="background-color: #f1f5f9; padding: 15px; border-left: 4px solid #94a3b8; margin-bottom: 30px; border-radius: 0 6px 6px 0;">
            <p style="margin: 0; color: #475569;"><strong>📝 Mesaj client:</strong><br/> ${message || '<i>Niciun mesaj suplimentar adăugat.</i>'}</p>
          </div>

          <h2 style="color: #0f172a; font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 20px;">⚙️ Configurări Comandate:</h2>
          ${cartHtml}

        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Website Alutec Glass" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `[Alutec] 🚨 Comandă nouă de la: ${name}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: 'Email trimis cu succes!' });
  } catch (error) {
    console.error('Eroare Nodemailer:', error);
    return NextResponse.json({ error: 'Eroare la trimiterea emailului.' }, { status: 500 });
  }
}