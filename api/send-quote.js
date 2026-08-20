export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const {
      name,
      email,
      phone,
      service,
      message,
    } = req.body || {};

    if (!name || !email || !service) {
      return res.status(400).json({
        message: "Vul alle verplichte velden in.",
      });
    }

    const htmlContent = `
      <div style="
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #17352a;
        max-width: 650px;
        margin: 0 auto;
      ">

        <h2 style="margin-bottom: 20px;">
          Nieuwe offerteaanvraag
        </h2>

        <p>
          Er is een nieuwe aanvraag binnengekomen via
          <strong>fgreenlean.nl</strong>.
        </p>

        <hr style="
          border: 0;
          border-top: 1px solid #ddd;
          margin: 20px 0;
        " />

        <p>
          <strong>Naam</strong><br>
          ${escapeHtml(name)}
        </p>

        <p>
          <strong>E-mail</strong><br>
          ${escapeHtml(email)}
        </p>

        <p>
          <strong>Telefoon</strong><br>
          ${escapeHtml(phone || "-")}
        </p>

        <p>
          <strong>Dienst</strong><br>
          ${escapeHtml(service)}
        </p>

        <p>
          <strong>Toelichting</strong><br>
          ${escapeHtml(message || "-").replace(/\n/g, "<br>")}
        </p>

        <hr style="
          border: 0;
          border-top: 1px solid #ddd;
          margin: 20px 0;
        " />

        <p style="
          color: #777;
          font-size: 13px;
        ">
          Deze aanvraag is automatisch verzonden via fgreenlean.nl.
        </p>

      </div>
    `;

    const brevoResponse = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",

        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },

        body: JSON.stringify({
          sender: {
            name: "Fergal Green & Clean",
            email: process.env.BREVO_SENDER_EMAIL,
          },

          to: [
            {
              email: "f.greenlean@gmail.com",
              name: "Fergal Green & Clean",
            },
          ],

          replyTo: {
            email,
            name,
          },

          subject: `Nieuwe offerteaanvraag van ${name}`,

          htmlContent,
        }),
      }
    );

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.text();

      console.error("Brevo error:", errorData);

      return res.status(500).json({
        message: "Brevo kon de e-mail niet verzenden.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Aanvraag succesvol verzonden.",
    });

  } catch (error) {
    console.error("Send quote error:", error);

    return res.status(500).json({
      message: "Er ging iets mis bij het verzenden.",
    });
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}