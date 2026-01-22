import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Erro" });

    try {
        const payment = new Payment(client);
        const body = {
            transaction_amount: req.body.total,
            description: 'Pedido Mineiríssimo',
            payment_method_id: 'pix',
            payer: { email: req.body.email }
        };

        const response = await payment.create({ body });

        // Enviamos o QR Code e o ID do pagamento para o seu site vigiar
        return res.status(200).json({
            id: response.id,
            qr_code_base64: response.point_of_interaction.transaction_data.qr_code_base64,
            qr_code: response.point_of_interaction.transaction_data.qr_code
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}
