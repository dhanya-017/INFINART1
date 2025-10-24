const mongoose = require("mongoose");
const Admin = require("../models/admin.model");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await Admin.findOne({
      email: "businesscurative@gmail.com",
    });

    if (adminExists) {
      console.log("Admin user already exists");
      mongoose.connection.close();
      return;
    }

    const admin = new Admin({
      email: "businesscurative@gmail.com",
      password: "123456",
    });

    await admin.save();
    console.log("Admin user created successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding admin user:", error);
    mongoose.connection.close();
  }
};

seedAdmin();
