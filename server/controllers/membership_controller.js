const Membership = require("../models/membership_model");

exports.addMembership = async (req, res) => {
    console.log("Add Membership");
    try {
        const { firstName, lastName, contactNo, contactAddress, aadhar, startDate, endDate, period } = req.body;
        console.log(firstName);

        if (!firstName || !lastName || !contactNo || !contactAddress || !aadhar || !startDate || !endDate || !period) {
            return res.status(400).json({
                success: false,
                message: "Please enter all fields"
            });
        }

        const count = await Membership.countDocuments();

        const newMembershipId = `MBR-${(count + 1).toString().padStart(6, '0')}`;

        const newMembership = new Membership({
            membershipId: newMembershipId,  
            firstName,
            lastName,
            contactNo,
            contactAddress,
            aadhar,
            startDate,
            endDate,
            period
        });

        await newMembership.save();

        return res.status(201).json({
            success: true,
            message: "Membership added successfully",
            data: newMembership 
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


exports.updateMembership = async (req, res) => {
    try {
        const { membershipId, startDate, endDate, remove } = req.body;

        if (!membershipId) {
            return res.status(400).json({
                success: false,
                message: "Membership ID is required"
            });
        }

        const membership = await Membership.findOne({ membershipId });

        if (!membership) {
            return res.status(404).json({
                success: false,
                message: "Membership not found"
            });
        }

        if (remove) {
            membership.status = 'expired';
        }

        if (startDate) {
            membership.startDate = startDate;
        }
        if (endDate) {
            membership.endDate = endDate;
        }

        await membership.save();

        return res.status(200).json({
            success: true,
            message: "Membership updated successfully",
            data: membership
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


exports.getAllMembership = async (req, res) => {
    console.log("Get All Memberships");

    try {
        const memberships = await Membership.find();

        if (memberships.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No memberships found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "All memberships retrieved successfully",
            data: memberships
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


