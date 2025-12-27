import Asset from "../models/Asset.js";
import AdminLog from "../models/Asset.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/emailService.js";

// import Order from "../models/Order.js";

// Get Dashboard Stats

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAssets = await Asset.countDocuments();
    const pendingAssets = await Asset.countDocuments({ status: "pending" });

    // // Sum all completed order revenue
    // const revenueData = await Order.aggregate([
    //   { $match: { status: "completed" } },
    //   { $group: { _id: null, total: { $sum: "$amount" } } },
    // ]);

    // const totalRevenue = revenueData[0]?.total || 0;

    const totalRevenue = 0;

    const recentActivity = await AdminLog.find()
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      totalUsers,
      totalAssets,
      pendingAssets,
      totalRevenue,
      recentActivity,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};

export const getPendingAssets = async (req, res) => {
  try {
    const assets = await Asset.find({ status: "pending" })
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.json({ assets });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch assets" });
  }
};

export const getAssetForReview = async (req, res) => {
  try {
    console.log("Fetching asset for review, ID:", req.params.id);
    const asset = await Asset.findById(req.params.id).populate(
      "seller",
      "name email"
    );

    if (!asset) {
      console.log("Asset not found for ID:", req.params.id);
      return res
        .status(404)
        .json({ message: "Asset not found" + req.params.id });
    }

    res.json({ asset });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to load asset" });
  }
};
// Approve Asset

export const approveAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    if (asset.status === "approved") {
      return res.status(400).json({ message: "Asset already approved" });
    }

    asset.status = "approved";
    asset.reviewNotes = req.body.notes || "";
    asset.reviewedBy = req.user._id;
    asset.reviewedAt = new Date();

    await AdminLog.create({
      admin: req.user._id,
      action: `Approved asset: ${asset.title}`,
      asset: asset._id,
    });

    await asset.save();
    res.json({
      message: "Asset approved successfully",
      asset,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Approval failed" });
  }
};

// Reject Asset

export const rejectAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    if (asset.status === "rejected") {
      return res.status(400).json({ message: "Asset already rejected" });
    }

    asset.status = "rejected";
    asset.reviewNotes = req.body.notes || "No reason provided";
    asset.reviewedBy = req.user._id;
    asset.reviewedAt = new Date();

    await AdminLog.create({
      admin: req.user._id,
      action: `Rejected asset: ${asset.title}`,
      asset: asset._id,
    });

    await asset.save();

    res.json({
      message: "Asset rejected",
      asset,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Rejection failed" });
  }
};

// Get Approved Assets

export const getApprovedAssets = async (req, res) => {
  const assets = await Asset.find({ status: "approved" })
    .populate("seller", "name email")
    .sort({ updatedAt: -1 });

  res.json({ assets });
};

// get Rejected Assets

export const getRejectedAssets = async (req, res) => {
  const assets = await Asset.find({ status: "rejected" })
    .populate("seller", "name email")
    .sort({ updatedAt: -1 });

  res.json({ assets });
};

// Get Admin Reports

export const getAdminReports = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCreators = await User.countDocuments({ role: "creator" });
    const totalBuyers = await User.countDocuments({ role: "buyer" });

    const totalAssets = await Asset.countDocuments();
    const pendingAssets = await Asset.countDocuments({ status: "pending" });
    const approvedAssets = await Asset.countDocuments({ status: "approved" });
    const rejectedAssets = await Asset.countDocuments({ status: "rejected" });

    // Orders table may not exist — so we handle safely
    let totalOrders = 0;
    let totalRevenue = 0;

    try {
      totalOrders = await Order.countDocuments();
      const orders = await Order.find();
      totalRevenue = orders.reduce((sum, o) => sum + (o.price || 0), 0);
    } catch {
      console.log("Order model not present yet");
      // ignore if Order model not implemented yet
    }

    // latest 5 uploads
    const recentAssets = await Asset.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title status seller createdAt");

    res.json({
      users: {
        totalUsers,
        totalCreators,
        totalBuyers,
      },
      assets: {
        totalAssets,
        pendingAssets,
        approvedAssets,
        rejectedAssets,
      },
      revenue: {
        totalOrders,
        totalRevenue,
      },
      recentAssets,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to load reports" });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ["buyer", "creator"] },
    });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get User By ID

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("REQ PARAMS:", req.params._id);
    // console.log("REQ QUERY:", req.query);

    // fetch user + include password only if needed
    const user = await User.findById(id).select("-password -__v");
    // console.log("Fetched User:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const suspendUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });
    // console.log("for the check user suspended" + user);

    user.isSuspended = true;
    user.suspendedAt = new Date();

    user.status = "suspended";
    user.suspendedReason = reason || "Policy violation";

    user.notifications.push({
      message: `Your account has been suspended. Reason: ${reason}`,
      type: "ban",
    });

    await user.save();

    await sendEmail(
      user.email,
      "Account Suspension Notice",
      `
      <h2>Your Account Has Been Suspended</h2>
      <p><strong>Reason:</strong> ${reason}</p>
      <p>If you think this is a mistake, contact support.</p>
      `
    );

    return res.json({ message: "User suspended & notified", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Suspension failed" });
  }
};

export const unsuspendUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    console.log("for the check user unsuspend" + user.isSuspended);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.isSuspended = false;
    user.suspendedReason = "";
    user.status = "active";
    console.log(user.status);
    user.suspendedAt = new Date();
    user.notifications.push({
      message: "Your account has been reinstated",
      type: "system",
    });

    await user.save();

    await sendEmail(
      user.email,
      "Account Reinstated",
      `
      <h2>Your Account Has Been Reactivated</h2>
      <p>You may continue using your account.</p>
      `
    );

    return res.json({ message: "User unsuspended & notified", user });
  } catch (error) {
    res.status(500).json({ message: "Unsuspend failed" });
  }
};
