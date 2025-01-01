const Issue = require("../models/issue_model");
const Item = require("../models/item_model");

exports.getActiveIssues = async (req, res) => {
	console.log("Get Active Issue Called");

	try {
		// Find issues where status is "issued" and select specific fields
		const activeIssues = await Issue.find({ status: "issued" }).select(
			"issueId nameOfItem bookId dateOfIssue dateOfReturn"
		); // specify fields to return

		if (activeIssues.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No items found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Active Issues retrieved successfully",
			data: activeIssues,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};

exports.getRequestIssue = async (req, res) => {
	console.log("Get Request Issue Called");
	try {
		const requestedIssues = await Issue.find({ status: "requested" }).select(
			"issueId nameOfItem requestedDate requestFulfilled"
		);

		if (requestedIssues.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No items found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Requested Issues retrieved successfully",
			data: requestedIssues,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};

exports.getOverdueIssue = async (req, res) => {
	console.log("Get Overdue Issue Called");
	try {
		const overdueIssues = await Issue.find({ status: "overdue" }).select(
			"issueId nameOfItem bookId dateOfIssue dateOfReturn fineAmount finePaid"
		);

		if (overdueIssues.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No items found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Requested Issues retrieved successfully",
			data: overdueIssues,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};

exports.issueItem = async (req, res) => {
	console.log("Issue Item Called");
	try {
		const { itemId, issueDate, returnDate, remarks } = req.body;
		const {uid} = req.user;
		console.log(req.body);

		const item = await Item.findOne({ bid: itemId });

		if (!item) {
			return res.status(404).json({
				success: false,
				message: "Book not found",
			});
		}

		const issueCount = await Issue.countDocuments(); // Get the total number of issues
		const issueId = `ISD-${String(issueCount + 1).padStart(6, "0")}`; // ISD + 6-digit serial

		// If the book is unavailable, create an Issue Request
		console.log(`Quantity :- ${item.quantity}`);
		if (item.quantity < 1) {
			const issueRequest = new Issue({
				issueId: issueId,
				uid: uid,
				bookId: itemId,
				nameOfItem: item.name || "Unknown Book",
				status: "requested",
				requestedDate: new Date(),
				remarks: remarks || "Book is currently unavailable",
			});

			await issueRequest.save();

			return res.status(200).json({
				success: true,
				message: "Book is unavailable. An issue request has been created.",
				data: issueRequest,
			});
		}

		// If the book is available, reduce the quantity and create an Active Issue
		item.quantity -= 1;
		item.availability = item.quantity > 0;

		await item.save();

		const activeIssue = new Issue({
			issueId: issueId,
			uid: uid,
			bookId: item.bid,
			nameOfItem: item.name || "Unknown Book",
			dateOfIssue: issueDate,
			dateOfReturn: returnDate,
			status: "issued",
			remarks: remarks || "Book issued successfully",
		});

		await activeIssue.save();

		return res.status(200).json({
			success: true,
			message: "Book issued successfully. Active issue created.",
			ItemAvailable: item.quantity,
			data: activeIssue,
		});
	} catch (e) {
		console.error("Error issuing book:", e);
		return res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};

exports.returnItem = async (req, res) => {
	console.log("Return Issue Called");
	try {
		const { itemId} = req.body;
		const {uid} = req.user;

		// Step 1: Find the corresponding issue entry by itemId and uid
		const issue = await Issue.findOne({
			bookId: itemId,
			uid: uid,
			status: "issued",
		});

		if (!issue) {
			return res.status(404).json({
				success: false,
				message: "Issue not found or item not currently issued",
			});
		}
		const dueDate = new Date(issue.dateOfReturn);
		const currentDate = new Date("2025-01-27");
		console.log(dueDate);
		console.log(currentDate);

		// Step 2: Check if the return date is valid
		if (new Date(dueDate) < new Date(issue.dateOfIssue)) {
			return res.status(400).json({
				success: false,
				message: "Return date cannot be earlier than the issue date.",
			});
		}

		// Step 3: Update the issue status to 'returned'
		issue.status = "returned";
		issue.dateOfReturn = currentDate;

		// Step 4: Calculate fine if item is returned late

		if (currentDate > dueDate) {
			// Calculate fine for overdue days
			const timeDiff = currentDate - dueDate;
			const overdueDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
			const fineAmount = overdueDays * 10;

			issue.fineAmount = fineAmount;
			issue.finePaid = false;
			issue.status = "overdue";
		}
		// Step 5: Update the corresponding item availability
		const item = await Item.findOne({ bid: itemId });

		if (!item) {
			return res.status(404).json({
				success: false,
				message: "Item not found",
				itemId: itemId,
			});
		}

		// Increase item quantity, assuming one item is returned
		item.quantity += 1;
		item.availability = item.quantity > 0;

		// Save the updated item and issue
		await item.save();
		await issue.save();

		// Step 6: Return a successful response
		return res.status(200).json({
			success: true,
			message: "Item returned successfully",
			data: {
				issueId: issue.issueId,
				itemName: item.itemName,
				fineAmount: issue.fineAmount || 0,
				status: issue.status,
			},
		});
	} catch (e) {
		console.error("Error returning item:", e);
		return res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};


exports.payFine = async (req, res) => {
	console.log("Pay Fine Called");
	try {
		const { issueId } = req.body; 
		console.log(issueId);
		const issue = await Issue.findOne({ issueId: issueId });
		if (!issue) {
			return res.status(404).json({
				success: "failed",
				message: "Issue not found",
			});
		}
		if (issue.fineAmount === 0 || issue.finePaid) {
			return res.status(400).json({
				success: "failed",
				message: "No fine to pay or fine already paid",
			});
		}
		issue.finePaid = true;
		await issue.save();

		return res.status(200).json({
			success: "success",
			message: "Fine paid successfully",
			data: {
				issueId: issue.issueId,
				fineAmount: issue.fineAmount,
				status: issue.status,
				finePaid: issue.finePaid,
			},
		});
	} catch (e) {
		console.error("Error paying fine:", e);
		return res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};