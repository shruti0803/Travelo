import express from "express";
import mysql from "mysql2";
import cors from "cors";
import routes from "./Routes/routes.js";

const app = express();
const PORT = 8080;

// ✅ Allow preflight (OPTIONS) requests
//app.options("*", cors());

// ✅ Use CORS middleware before routes
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Parse JSON body
app.use(express.json());

// ✅ Mount routes
app.use("/user", routes);

// ✅ Test root
app.get("/", (req, res) => {
  res.send("Backend working!");
});

// ✅ MySQL connection
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "IshaSql@562",
  database: "Travel",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    process.exit(1);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
