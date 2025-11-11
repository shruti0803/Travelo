import express from "express";
import mysql from "mysql2";
import cors from "cors";
import routes from "./Routes/routes.js"
// --- CONFIG ---
const app = express();
const PORT = process.env.PORT || 8080;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json()); // parse JSON body

// --- MYSQL CONNECTION ---
export const db = mysql.createConnection({
  host: "localhost",       // your DB host
  user: "root",            // your MySQL username
   password: "Rudrach@",
  database: "travel",
});
app.use("/user", routes);
// --- CONNECT TO DATABASE ---
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    process.exit(1);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});







// --- GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// --- START SERVER ---
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
