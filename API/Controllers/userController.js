import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userModel from '../Models/UserModel.js';
import { secretKey } from '../Middlewares/jwtMiddleware.js';

const signup = async (req, res) => {
    try {
        const { username, email, password, role, address, phoneNumber} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({ username, email, password: hashedPassword, role, address, phoneNumber });
        res.status(201).json(user);

    } catch (error) {
        res.status(400).send(error.message);
    }
};

const login = async (req, res) => {

    try {

        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, secretKey);

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expires: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000),
        };

        res.cookie('jwt', token, cookieOptions);

        res.json({ message: 'Login successful' });

    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export { signup, login, getUserProfile };
