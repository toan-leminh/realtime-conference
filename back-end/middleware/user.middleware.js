const userProtect = (req, res, next) => {
    // Check if user is logged in
    if (!req.isAuthenticated()) {
        return res.sendStatus(401);
    }
    
    next();
};

export default userProtect;