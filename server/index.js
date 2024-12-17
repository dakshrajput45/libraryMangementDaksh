const express = require("express");
const app = express();
const cors = require("cors");

const dbConnect = require("./config/database");
dbConnect();

app.use(express.json());
app.use(cors());
const user = require("./routes/user_auth_routes");
const membershipRoute = require("./routes/membership_routes");
const itemRoute = require("./routes/item_routes");


app.use("/api/v1", user);
app.use("/api/v1",membershipRoute);
app.use("/api/v1",itemRoute);

app.get("/", (req, res) => {
	try {
		res.status(200).json({
			message: "Welcome to the API",
			success: true,
		});
	} catch (err) {
		res.status(500).json({
			message: "Internal Server Error",
			success: false,
			data: err,
		});
		console.log(err);
	}
});

app.listen(process.env.PORT, () => {
	console.log(`App is running at ${process.env.PORT}`);
	console.log(`http://localhost:${process.env.PORT}/`);
});
