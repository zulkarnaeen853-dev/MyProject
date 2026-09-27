const user = require('../models/userModel');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let picture = req.body.picture || '';
        if (req.file) {
            picture = req.file.filename;
        }

        const existedUser = await user.findOne({ email });
        if (existedUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
                data: {
                    email: existedUser.email,
                }
            });
        }

        const newUser = new user({
            name,
            email,
            password,
            picture
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                picture: newUser.picture,
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

const users = async (req, res) => {
    try {
        const Users = await user.find();

        if (!Users) {
            return res.status(500).json({
                success: false,
                message: 'Server error'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: Users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

module.exports = { register, users };