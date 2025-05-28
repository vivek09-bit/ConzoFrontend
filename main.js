const express = require("express");
const multer = require("multer");
const fs = require("fs-extra");
const { PDFDocument, rgb } = require("pdf-lib");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
// Set up file uploads
const upload = multer({ dest: "uploads/" });

// Route to convert to PDF
app.post("/convert", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  const filePath = path.join(__dirname, req.file.path);
  const ext = path.extname(req.file.originalname).toLowerCase();
  const outputFileName = `${uuidv4()}.pdf`;
  const outputPath = path.join(__dirname, "converted", outputFileName);

  try {
    const pdfDoc = await PDFDocument.create();

    if (ext === ".txt") {
      const text = await fs.readFile(filePath, "utf8");
      const page = pdfDoc.addPage([595, 842]); // A4 size
      const { width, height } = page.getSize();
      page.drawText(text, {
        x: 50,
        y: height - 100,
        size: 12,
        color: rgb(0, 0, 0),
        maxWidth: width - 100,
        lineHeight: 16,
      });
    } else if ([".jpg", ".jpeg", ".png"].includes(ext)) {
      const imageBytes = await fs.readFile(filePath);
      let image;
      let dims;
      if (ext === ".png") {
        image = await pdfDoc.embedPng(imageBytes);
      } else {
        image = await pdfDoc.embedJpg(imageBytes);
      }
      dims = image.scale(1);
      const page = pdfDoc.addPage([dims.width, dims.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: dims.width,
        height: dims.height,
      });
    } else {
      return res.status(400).send("Unsupported file type");
    }

    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(outputPath, pdfBytes);

    res.download(outputPath, "converted.pdf", async () => {
      await fs.remove(filePath);
      await fs.remove(outputPath);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to convert file");
  }
});

app.get("/", (req, res) => {
  res.send("File to PDF Conversion Service is running 🚀");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
