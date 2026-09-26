const user = require('../models/userModel');

const updateUser = async (req, res) => {
  
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const updatedUser = await user.findByIdAndUpdate(
            id.id,
            { name, email, password },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await user.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: deletedUser._id
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};



module.exports = { updateUser, deleteUser };