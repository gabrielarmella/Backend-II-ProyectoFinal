import passport from "passport";

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

export const hasRole = (roles) => {
    return (req, res, next) => {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const userRole = req.user.role;
      if (roles.includes(userRole)) {
        return next();
      }
      res.status(403).json({ message: "Forbidden" });
    };
  };