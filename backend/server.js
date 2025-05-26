import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config(); // Loads variables from .env (optional fallback, not required for Docker)

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

app.use(express.json()); // Parse JSON bodies

app.use("/api/products", productRoutes);

// Serve static frontend in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, async () => {
	try {
		await connectDB(); // Connect to MongoDB before confirming server start
		console.log(`✅ Server started at http://localhost:${PORT}`);
	} catch (err) {
		console.error("❌ Failed to start server due to DB error:", err.message);
		process.exit(1);
	}
});
