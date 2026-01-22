import { MercadoPagoConfig, Payment } from 'mercadopago';
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });

export default async function handler(req, res) {
    const { id } = req.query;
    try {
        const payment = new Payment(client);
        const result = await payment.get({ id });
        res.json({ status: result.status });
    } catch (e) { res.status(500).json(e); }
}
