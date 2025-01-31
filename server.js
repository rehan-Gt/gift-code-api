const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

app.use(bodyParser.json());

let giftCodes = {
  "CODE123": { claimed: false, amount: 100 },
  "TEST456": { claimed: true, amount: 50 } // Already used
};

app.post("/redeem", async (req, res) => {
  const { code } = req.body;

  if (!giftCodes[code]) {
    return res.json({ status: "invalid" });
  }

  if (giftCodes[code].claimed) {
    return res.json({ status: "already_claimed" });
  }

  giftCodes[code].claimed = true;

  await axios.post(`https://api.telegram.org/bot<7684317112:AAHcMy_U8ohFTjTWr9X_8Qcm7I1uBnrOPLM>/sendMessage`, {
    chat_id: "5708790879",
    text: `🎁 Gift Code Redeemed!\n\nCode: ${code}\nAmount: ₹${giftCodes[code].amount}`
  });

  res.json({ status: "success", amount: giftCodes[code].amount });
});

app.listen(3000, () => console.log("Server running on port 3000"));
