
const logout = (req, res)=>{
    res.clearCookie('token').json('logged out successfully');
}

module.exports = logout
