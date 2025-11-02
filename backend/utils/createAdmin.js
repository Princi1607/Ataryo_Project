import User from "../models/User.js";

export const ensureAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("✅ Admin user already exists:", existingAdmin.email);
      return;
    }

    const adminEmail = process.env.ADMIN_EMAIL || "admin@ataryo.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    const admin = new User({
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    await admin.save();
    console.log(`🆕 Admin user created successfully:
Email: ${adminEmail}
Password: ${adminPassword}`);
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
  }
};
