import { MercadoPagoConfig, Preference } from 'mercadopago';

// 1. Configuramos o acesso com a variável que você criou na Vercel
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN 
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const preference = new Preference(client);

    // 2. Criamos a preferência com os dados que virão do seu formulário
    const response = await preference.create({
      body: {
        items: req.body.items, // Aqui pegamos os itens (Pão de queijo, etc)
        back_urls: {
          success: "https://paodequeijoamor.vercel.app/sucesso.html",
          failure: "https://paodequeijoamor.vercel.app/",
          pending: "https://paodequeijoamor.vercel.app/",
        },
        auto_return: "approved",
      }
    });

    // 3. Devolvemos o link de pagamento (init_point) para o seu site
    return res.status(200).json({
      init_point: response.init_point,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar preferência de pagamento" });
  }
}
