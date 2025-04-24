onst bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_SECRET);

const registerUser = async (req, res) => {
    try {
        const { userName, email, password, authType = 'email' } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ success: false, message: 'User already exists' });

        const newUser = new User({ userName, email, password, authType });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id, email: newUser.email, userName: newUser.userName }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, { httpOnly: true }).status(201).json({ success: true, message: 'User registered', token, user: { id: newUser._id, userName: newUser.userName, email: newUser.email } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.authType !== 'email') return res.status(400).json({ success: false, message: 'Invalid login' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: 'Incorrect password' });

        const token = jwt.sign({ userId: user._id, email: user.email, userName: user.userName }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, { httpOnly: true }).json({ success: true, message: 'Logged in', token, user: { id: user._id, userName: user.userName, email: user.email } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

const googleAuth = async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_SECRET });
        const payload = ticket.getPayload();

        let user = await User.findOne({ email: payload.email });
        if (!user) {
            user = new User({ userName: payload.family_name || payload.name, email: payload.email, authType: 'google', avatar_url: payload.picture });
            await user.save();
        }

        const jwtToken = jwt.sign({ userId: user._id, email: user.email, userName: user.userName }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', jwtToken, { httpOnly: true }).json({ success: true, message: 'Google login successful', token: jwtToken, user: { id: user._id, userName: user.userName, email: user.email, avatar_url: user.avatar_url } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Google auth failed', error });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('token').json({ success: true, message: 'Logged out' });
};

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

module.exports = { registerUser, loginUser, googleAuth, logoutUser, authMiddleware };