import User from './../models/User.js'
import bcrypt from 'bcrypt'

const handleResetPassword = async (req, res) => {
    const { user, pwd, email } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' })

    // Check for dublicate usernames
    const userexist = await User.findOne({ username: user }).exec()
    // const emailexist = userexist._id
    const emailexist = await User.findOne({ email: email }).exec()
    if (userexist || emailexist) return res.sendStatus(409) // Conflict

    try {
        // Encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10)

        await User.update({
            "username": user,
            "password": hashedPwd,
        })

        res.status(201).json({ 'success': `New user ${user} created!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

export default { handleResetPassword }