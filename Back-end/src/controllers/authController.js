const user = require('../models/userModel');

const register = async (req, res) => {
    try{
        const { name, email, password, picture } = req.body;
    
        const newUser = new user({
            name,
            email,
            password,
            picture
        });

        const existedUser = await user.findOne({ email });
        if(existedUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
                data: {
                    email: existedUser.email,
                }
            });
        }
    
        await newUser.save();
    
        res.status(201).json({ 
            success: true,
            message: 'User registered successfully',
            data: {
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                picture: newUser.picture
            } 
        });
    } catch (error) {

        
    }
    
}

const users = async (req, res) => {

        const Users = await user.find();
    
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: Users
        });

        if(!Users) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
    
}



module.exports = { register, users };