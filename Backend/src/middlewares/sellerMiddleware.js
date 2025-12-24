export const sellerOnly = (req, res, next) => {
  console.log("USER ROLE:", req.user.role);

  if (req.user && req.user.role === "creator") {
    next();
  } else {
    res.status(403).json({ message: "Creator access only" });
  }
};
