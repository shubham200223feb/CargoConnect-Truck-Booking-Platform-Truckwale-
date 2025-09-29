const axios = require("axios");

async function sendResetEmail(to) {
  return axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: { name: "Truck Wale", email: "shubbham2101861@gmail.com" },
      to: [{ email: to }],
      subject: "Thanks for Creating account in Truck wale",
      htmlContent: `
        <h3>Truck Wale</h3>
        <p>Make your Transportation on road with reliable and save with us thank for using this application</p>
        <img src="https://freeup.net/wp-content/uploads/2020/06/thank-you-card.jpg" alt="thank you image" width="500" height="600">
      `
    },
    {
      headers: {
        "api-key": process.env.SENDINBLUE_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
}
module.exports= sendResetEmail;