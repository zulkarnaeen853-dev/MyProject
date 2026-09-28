const user = require('../models/userModel');

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, picture } = req.body;

        const updateData = { name, email, password };
        if (picture !== undefined) {
            updateData.picture = picture;
        }

        const updatedUser = await user.findByIdAndUpdate(
            id,
            updateData,
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
            message: 'Server error',
            error: error.message
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

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
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = { updateUser, deleteUser };