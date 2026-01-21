
import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { items } = req.body;

    const preference = {
      items: items,
      back_urls: {
        success: "https://paodequeijoamor.vercel.app/sucesso.html",
        failure: "https://paodequeijoamor.vercel.app/",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);

    return res.status(200).json({
      init_point: response.body.init_point,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
