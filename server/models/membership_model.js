const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    membershipId: {
        type: String,
        required: true,
        unique: true 
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit contact number'] 
    },
    contactAddress: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'suspended'], 
        default: 'active' 
    },
}, {
    timestamps: true 
});


module.exports = mongoose.model("Membership", membershipSchema);
