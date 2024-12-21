const Item = require("../models/item_model");

exports.addItem = async (req, res) => {
	console.log("Add Item Called");

	try {
		const {
			itemType,
			name,
			authorName,
			dateOfProcurement,
			quantity,
			category,
			cost,
		} = req.body;

		if (
			!itemType ||
			!name ||
			!authorName ||
			!dateOfProcurement ||
			!quantity ||
			!category ||
			!cost
		) {
			return res.status(400).json({
				success: false,
				message: "Please enter all fields",
			});
		}

		if (!["Book", "Movie"].includes(itemType)) {
			return res.status(400).json({
				success: false,
				message: "Invalid itemType. It should be either 'Book' or 'Movie'.",
			});
		}

		const count = await Item.countDocuments();
		const newBid = `ITM-${(count + 1).toString().padStart(6, "0")}`;

		const newItem = new Item({
			bid: newBid,
			itemType,
			name,
			authorName,
			dateOfProcurement,
			quantity,
			category,
			availability: true,
			cost,
		});

		await newItem.save();

		return res.status(201).json({
			success: "success",
			message: "Item added successfully",
			data: newItem,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};

exports.updateItem = async (req, res) => {
	console.log("Update Item Called");

	try {
		const {
			bid,
			itemType,
			name,
			authorName,
			dateOfProcurement,
			quantity,
			category,
			availability,
			cost,
		} = req.body;

		if (!bid) {
			return res.status(400).json({
				success: false,
				message: "Please provide a bid",
			});
		}

		const item = await Item.findOne({ bid });

		if (!item) {
			return res.status(404).json({
				success: false,
				message: "Item not found",
			});
		}

		if (itemType) item.itemType = itemType;
		if (name) item.name = name;
		if (authorName) item.authorName = authorName;
		if (dateOfProcurement) item.dateOfProcurement = dateOfProcurement;
		if (quantity !== undefined) item.quantity = quantity;
		if (category) item.category = category;
		if (availability !== undefined) item.availability = availability;
		if (cost !== undefined) item.cost = cost;

		await item.save();

		return res.status(200).json({
			success: "success",
			message: "Item updated successfully",
			data: item,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};

exports.getAllItemByType = async (req, res) => {
	console.log("Get All Items Called");

	try {
		const { type } = req.body;

		let filter = {};

		// If 'type' is provided, filter by itemType, otherwise return all items
		if (type) {
			filter.itemType = type;
		}

		const items = await Item.find(filter);

		if (items.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No items found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Items retrieved successfully",
			data: items,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};
