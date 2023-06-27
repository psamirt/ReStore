const Order = require("../Database/models/order");
const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51NNLpXJ1lb1YFkHpt7cNexUW59vJoBx40Sta98qZ2Bqa8bRzrTaU1gjsNAWMrpYseNMP4u3KRJZxMbjBXT9LtuJC00e9OgY4Hm"
);
const DOMAIN = "https://re-store.onrender.com";

const endpointSecret =
  "whsec_602cd2598b4998749e3f929be11b474b1123a11e8d6a5c3bea2a9be9e5728679";

const createSession = async (req, res) => {
  const { products } = req.body;

  try {
    const lineItems = products.map((product) => {
      const { name, description, unit_amount, quantity, images } = product;

      return {
        price_data: {
          product_data: {
            name: name,
            description: description,
            images: images,
          },
          currency: "USD",
          unit_amount: unit_amount,
        },
        quantity: quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${DOMAIN}?success=true`,
      cancel_url: `${DOMAIN}?canceled=true`,
    });

    const paymentUrl = session.url;
    console.log(paymentUrl);
    res.redirect(303, session.url);
  } catch (error) {
    console.error("Error al crear la sesión de pago:", error);
    res.status(500).send("Error al crear la sesión de pago");
  }
};

// TENGO QUE HACES QUE ESTO DE ACA ABAJO FUNCIONE

// const webHookController = async (req, res) => {
//   const payload = req.body;
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
//   } catch (error) {
//     console.error("Error al construir el evento de webhook:", error);
//     return res.status(400).send(`Webhook Error: ${error.message}`);
//   }

//   // Verifica el tipo de evento
//   if (event.type === "payment_intent.succeeded") {
//     // Obtiene el ID del pago
//     const paymentIntentId = event.data.object.id;

//     // Obtiene la información del producto comprado
//     const lineItems = event.data.object.lines.data;
//     if (lineItems.length > 0) {
//       const item = lineItems[0]; // Solo se obtiene la información del primer producto

//       // Crea un objeto Order basado en el esquema definido
//       const order = new Order({
//         user: req.user._id, // Asegúrate de tener el usuario disponible en el objeto de solicitud
//         orderItems: [
//           {
//             product: item.id,
//             name: item.description,
//             image: "", // Agrega la URL de la imagen del producto si está disponible en el evento de Stripe
//             price: item.price.unit_amount,
//           },
//         ],
//         paymentInfo: {
//           id: paymentIntentId,
//           status: event.data.object.status,
//           amountPaid: item.amount_total,
//         },
//       });

//       // Guarda la orden en la base de datos
//       try {
//         await order.save();
//         console.log("Orden guardada en la base de datos:", order);
//       } catch (error) {
//         console.error("Error al guardar la orden en la base de datos:", error);
//       }
//     }
//   }

//   res.sendStatus(200);
// };

module.exports = { createSession };
