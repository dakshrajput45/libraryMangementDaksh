const jwt = require("jsonwebtoken");
exports.tokenCheck = (req, res, next) => {
	try {
		const token = req.body.token ;
		if (!token)
			return res.status(401).json({
				success: false,
				message: "Token Missing",
			});

		try {
			const decode = jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);
			req.user = decode;
		} catch (error) {
			return res.status(401).json({
				success: false,
				message: "Token Missing",
				error: error,
			});
		}
		next();
	} catch (err) {
		res.status(401).json({
			success: false,
			message: "Error while verifying token",
			error: err,
		});
	}
};

exports.isAdmin = (req, res, next) => {
	try {
		if (req.user.role !== "admin")
			return res.status(401).json({
				success: false,
				message: "Protected route, Only for Admin",
			});

		next();
	} catch (err) {
		res.status(403).json({
			success: false,
			message: "Unauthorized access to Admin Route",
			error: err,
		});
	}
};
