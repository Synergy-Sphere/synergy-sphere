export const logout = async (req,res) => {
    res.clearCookie("accessCookie").status(200).json({ message: "Logout Successful" });
}