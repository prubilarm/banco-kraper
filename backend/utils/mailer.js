const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendWelcomeEmail = async (email, fullName) => {
    try {
        const info = await transporter.sendMail({
            from: '"Banco Kraper" <welcome@kraperbank.com>',
            to: email,
            subject: '¡Bienvenido a Banco Kraper!',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
                    <h2 style="color: #2563eb;">Hola ${fullName},</h2>
                    <p>¡Bienvenido a la nueva era de la banca digital!</p>
                    <p>Tu cuenta en <strong>Banco Kraper</strong> ha sido creada exitosamente. Hemos asignado automáticamente tus dos primeras cuentas:</p>
                    <ul>
                        <li>Cuenta Corriente</li>
                        <li>Cuenta de Ahorro</li>
                    </ul>
                    <p>Ya puedes empezar a gestionar tus finanzas de forma segura y moderna.</p>
                    <a href="${process.env.FRONTEND_URL}" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px;">Ir a mi Dashboard</a>
                </div>
            `,
        });
        console.log('Correo enviado: %s', info.messageId);
        console.log('URL de vista previa: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error enviando correo:', error);
    }
};

module.exports = { sendWelcomeEmail };
