import { db } from "../server.js";
import bcrypt from "bcrypt";

// 📝 REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    // Check if email already exists
    const [existing] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);

    if (existing.length > 0)
      return res.status(400).json({ error: "Email already registered" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db
      .promise()
      .query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
        name,
        email,
        hashedPassword,
      ]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 🔒 LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const [users] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);

    if (users.length === 0)
      return res.status(404).json({ error: "User not found" });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ error: "Invalid credentials" });

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



// Controller/hotelController.js


export const getHotelsByCity = (req, res) => {
  const { city } = req.params;

  if (!city) {
    return res.status(400).json({ message: "City name is required" });
  }

  const query = `
    SELECT 
      id, 
      name, 
      city, 
      available_rooms AS availableRooms, 
      total_rooms AS totalRooms, 
      price_per_night AS pricePerNight,
      image_url AS imageUrl
    FROM hotels
    WHERE city = ?;
  `;

  db.query(query, [city], (err, results) => {
    if (err) {
      console.error("Error fetching hotels:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (!results || results.length === 0) {
      return res.status(404).json({ message: `No hotels found in ${city}` });
    }

    res.json({
      city,
      totalHotels: results.length,
      hotels: results,
    });
  });
};

