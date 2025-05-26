import express from "express";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

// Load .env if running outside Docker (optional fallback)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// __dirname fix for ES modules
const __dirname = path.resolve();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// Start server and connect DB
app.listen(PORT, async () => {
	try {
		const uri = process.env.MONGO_URI;
		if (!uri) {
			throw new Error("MONGO_URI environment variable is not defined.");
		}

		await connectDB(uri); // Pass URI explicitly
		console.log(`Server started at http://localhost:${PORT}`);
	} catch (err) {
		console.error("Server startup error:", err.message);
		process.exit(1);
	}
});
