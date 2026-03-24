import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, country, eventType, date, guests, message } = body;

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP Environment variables are missing!');
      return NextResponse.json({ success: false, error: 'Internal server configuration error' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // port 465 is secure
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to the Site Owner
    const ownerMailOptions = {
      from: `"HannaH Events Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `Nueva Solicitud de Evento: ${name}`,
      text: `
        Has recibido una nueva solicitud de evento:
        
        Nombre/Empresa: ${name}
        Email: ${email}
        Teléfono: ${phone}
        País: ${country}
        Tipo de Evento: ${eventType}
        Fecha Estimada: ${date}
        Invitados: ${guests}
        
        Mensaje:
        ${message}
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9c176;">
          <h2 style="color: #e9c176;">Nueva Solicitud de Evento</h2>
          <p><strong>Nombre/Empresa:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>País:</strong> ${country}</p>
          <p><strong>Tipo de Evento:</strong> ${eventType}</p>
          <p><strong>Fecha Estimada:</strong> ${date}</p>
          <p><strong>Invitados:</strong> ${guests}</p>
          <hr />
          <p><strong>Mensaje:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    };

    // Confirmation Email to the User
    const userMailOptions = {
      from: `"HannaH Events" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Confirmación de Solicitud de Evento - HannaH Events`,
      text: `
        Hola ${name},
        
        Gracias por ponerte en contacto con HannaH Events. Hemos recibido tu solicitud para un evento de tipo "${eventType}".
        
        Nuestro equipo de expertos revisará los detalles y se pondrá en contacto contigo muy pronto para comenzar a planear este gran momento.
        
        Resumen de tu solicitud:
        Fecha: ${date}
        País: ${country}
        Invitados: ${guests}
        
        Saludos cordiales,
        El equipo de HannaH Events
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9c176; background-color: #131313; color: #e5e2e1;">
          <h2 style="color: #e9c176;">¡Gracias por tu solicitud!</h2>
          <p>Hola <strong>${name}</strong>,</p>
          <p>Hemos recibido tu interés en organizar un evento con nosotros. En HannaH Events, nos apasiona transformar las ideas en momentos inolvidables.</p>
          <div style="background-color: #1c1b1b; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Tipo de Evento:</strong> ${eventType}</p>
            <p><strong>País:</strong> ${country}</p>
            <p><strong>Fecha Estimada:</strong> ${date}</p>
            <p><strong>Invitados:</strong> ${guests}</p>
          </div>
          <p>Un ejecutivo de nuestro equipo se pondrá en contacto contigo en breve para dar el siguiente paso.</p>
          <p>Saludos cordiales,<br /><strong>El equipo de HannaH Events</strong></p>
          <hr style="border-color: #e9c176; opacity: 0.3;" />
          <p style="font-size: 0.8rem; opacity: 0.6; text-align: center;">© 2026 HannaH Events. Todos los derechos reservados.</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(ownerMailOptions);
    } catch (ownerError) {
      console.error('Error sending owner notification:', ownerError);
      // We don't necessarily return error here if we want to try user email, 
      // but usually if owner mail fails, the whole SMTP might be down.
    }

    try {
      await transporter.sendMail(userMailOptions);
    } catch (userError) {
      console.error('Error sending user confirmation:', userError);
      // If user confirmation fails (e.g. invalid email), we don't want to show "Error" 
      // to the user if the admin at least received the request.
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
