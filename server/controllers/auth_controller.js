const bcrypt = require("bcrypt");
const User = require("../models/user_model");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
	console.log("Login called");

	try {
		let { uid, password } = req.body;
		console.log(req.body);

		if (!uid || !password) {
			return res.status(400).json({
				success: "failed",
				message: "Please Fill all Details",
			});
		}

		const exisitingUser = await User.findOne({ uid: uid });
		if (!exisitingUser) {
			return res.status(401).json({
				success: "failed",
				message: "User Not Found",
			});
		}
		const payload = {
			uid: exisitingUser.uid,
			id: exisitingUser._id,
			role: exisitingUser.role,
		};

		if (await bcrypt.compare(password, exisitingUser.password)) {
			let token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "1d",
			});

			exisitingUser.token = token;
			exisitingUser.password = undefined;

			const options = {
				expries: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};

			res.cookie("token", token, options).status(200).json({
				success: "success",
				token,
				exisitingUser,
				message: "User LoggedIn Successfully",
			});
		} else {
			return res.status(403).json({
				success: "false",
				message: "Invalid Password",
			});
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: "failed",
			message: "Login Failiure",
		});
	}
};

exports.addUser = async (req, res) => {
	try {
		let { role, name, password } = req.body;
		let uid;
		const count = await User.countDocuments();
		if (role === "admin") {
			uid = `ADM-${(count + 1).toString().padStart(6, "0")}`;
		} else if (role === "user") {
			uid = `USR-${(count + 1).toString().padStart(6, "0")}`;
		}
		const exisitingUser = await User.findOne({ uid: uid });
		if (exisitingUser) {
			return res.status(404).json({
				success: "failed",
				message: "User already exists",
			});
		}

		let hashedPassword;

		try {
			hashedPassword = await bcrypt.hash(password, 10);
		} catch (err) {
			console.log(hashedPassword);
			return res.status(500).json({
				success: "failed",
				message: "Error in hashing Password",
			});
			console.log(err);
		}

		const user = await User.create({
			role,
			uid,
			name,
			password: hashedPassword,
			status: "active",
		});
		return res.status(200).json({
			success: "success",
			message: "User Created Successfully",
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: "failed",
			message: "User can not be added",
		});
	}
};

exports.updateUser = async (req, res) => {
	try {
		const { uid, role, name, status } = req.body;

		const existingUser = await User.findOne({ uid: uid });
		if (!existingUser) {
			return res.status(404).json({
				success: "failed",
				message: "User not found",
			});
		}

		if (role) existingUser.role = role;
		if (name) existingUser.name = name;
		if (status) existingUser.status = status;

		// if (password) {
		// 	try {
		// 		const hashedPassword = await bcrypt.hash(password, 10);
		// 		existingUser.password = hashedPassword;
		// 	} catch (err) {
		// 		console.error("Error hashing password:", err);
		// 		return res.status(500).json({
		// 			success: "failed",
		// 			message: "Error in hashing password",
		// 		});
		// 	}
		// }

		await existingUser.save();

		return res.status(200).json({
			success: "success",
			message: "User updated successfully",
			user: existingUser,
		});
	} catch (e) {
		console.error(e);
		return res.status(500).json({
			success: "failed",
			message: "Error updating user",
		});
	}
};

exports.logout = async (req, res) => {
	try {
		console.log("Logout called");

		// Clear the token cookie
		res.clearCookie("token", {
			httpOnly: true,
		});

		return res.status(200).json({
			success: "success",
			message: "User logged out successfully",
		});
	} catch (e) {
		console.error("Logout error:", e);
		return res.status(500).json({
			success: "failed",
			message: "Error logging out",
		});
	}
};
