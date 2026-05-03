require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { Pool } = require("pg");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("static"));
app.use("/api/", rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
pool.query("SELECT NOW()").then(r => console.log("✅ DB:", r.rows[0].now)).catch(e => console.error("❌ DB:", e.message));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => { /jpeg|jpg|png/.test(file.mimetype) ? cb(null, true) : cb(new Error("Images only")); }
});

async function uploadPhoto(buf, folder) {
    return new Promise((res, rej) =>
        cloudinary.uploader.upload_stream({ folder, transformation: [{ width: 400, height: 500, crop: "fill" }] },
            (e, r) => e ? rej(e) : res(r.secure_url)).end(buf));
}

// ===================== SINDH GOVT LOGO SVG =====================
const SINDH_LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="72" height="86">
<polygon points="100,6 108,26 130,26 113,39 120,60 100,47 80,60 87,39 70,26 92,26" fill="#1a7a3c"/>
<path d="M38,118 Q26,158 48,194 Q73,226 100,228 Q127,226 152,194 Q174,158 162,118" fill="none" stroke="#1a7a3c" stroke-width="3"/>
<path d="M52,118 Q44,153 63,184 Q82,210 100,212 Q118,210 137,184 Q156,153 148,118" fill="none" stroke="#1a7a3c" stroke-width="2"/>
<path d="M38,118 Q18,98 23,72 Q28,52 44,47" fill="none" stroke="#1a7a3c" stroke-width="2.5"/>
<path d="M23,72 Q13,67 16,57" fill="none" stroke="#1a7a3c" stroke-width="2"/>
<path d="M29,62 Q19,55 22,45" fill="none" stroke="#1a7a3c" stroke-width="2"/>
<path d="M37,54 Q28,45 33,35" fill="none" stroke="#1a7a3c" stroke-width="2"/>
<path d="M162,118 Q182,98 177,72 Q172,52 156,47" fill="none" stroke="#1a7a3c" stroke-width="2.5"/>
<path d="M177,72 Q187,67 184,57" fill="none" stroke="#1a7a3c" stroke-width="2"/>
<path d="M171,62 Q181,55 178,45" fill="none" stroke="#1a7a3c" stroke-width="2"/>
<path d="M163,54 Q172,45 167,35" fill="none" stroke="#1a7a3c" stroke-width="2"/>
<ellipse cx="100" cy="128" rx="36" ry="44" fill="none" stroke="#1a7a3c" stroke-width="2"/>
<line x1="82" y1="104" x2="82" y2="162" stroke="#1a7a3c" stroke-width="1.5"/>
<line x1="91" y1="99" x2="91" y2="165" stroke="#1a7a3c" stroke-width="1.5"/>
<line x1="100" y1="97" x2="100" y2="167" stroke="#1a7a3c" stroke-width="1.5"/>
<line x1="109" y1="99" x2="109" y2="165" stroke="#1a7a3c" stroke-width="1.5"/>
<line x1="118" y1="104" x2="118" y2="162" stroke="#1a7a3c" stroke-width="1.5"/>
<path d="M70,130 Q100,124 130,130" fill="none" stroke="#1a7a3c" stroke-width="1.5"/>
<path d="M68,142 Q100,136 132,142" fill="none" stroke="#1a7a3c" stroke-width="1.5"/>
<path d="M70,154 Q100,148 130,154" fill="none" stroke="#1a7a3c" stroke-width="1.5"/>
<path d="M80,163 Q87,159 94,163 Q101,167 108,163 Q115,159 122,163" fill="none" stroke="#1a7a3c" stroke-width="1.5"/>
<path d="M44,198 Q100,214 156,198" fill="none" stroke="#1a7a3c" stroke-width="2"/>
</svg>`;
