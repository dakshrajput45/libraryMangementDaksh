const mongoose = require('mongoose');

// Define the Issue schema
const issueSchema = new mongoose.Schema({
    issueId: {
        type: String,
        required: true,
        unique: true // Unique identifier for the issue
    },
    bookId: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    dateOfIssue: {
        type: Date,
        required: function() {
            return this.status === 'issued'; // Issue date only required if the status is 'issued'
        }
    },
    dateOfReturn: {
        type: Date
    },
    nameOfItem: {
        type: String,
        required: true
    },
    fineAmount: {
        type: Number,
        default: 0 // Default fine amount is 0 unless overdue
    },
    finePaid: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['requested', 'issued', 'returned', 'overdue'],
        default: 'requested' // Default status is 'requested'
    },
    requestedDate: {
        type: Date
    },
    requestFulfilled: {
        type: Boolean,
        default: false
    },
    remarks: {
        type: String,
        default: ""
    }
}, {
    timestamps: true // Automatically add `createdAt` and `updatedAt`
});

issueSchema.methods.calculateFine = function() {
    if (this.status === 'overdue') {
        const dueDate = this.dateOfReturn;
        const currentDate = new Date();
        const timeDiff = currentDate - dueDate; // Time difference in milliseconds
        const daysOverdue = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert to days
        const dailyFine = 10; // Example fine amount per day
        this.fineAmount = daysOverdue * dailyFine;
        return this.fineAmount;
    }
    return 0;
};

// Export the Issue model
module.exports = mongoose.model("Issue", issueSchema);
