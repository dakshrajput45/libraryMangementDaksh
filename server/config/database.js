const mongoose = require("mongoose");

const dbConnect = () => {
	mongoose
		.connect(process.env.DATABASE_URL)
		.then(() => console.log("DB Connected"))
		.catch((err) => {
			console.log(err);
			process.exit(1);
		});
};

module.exports = dbConnect;
