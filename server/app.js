const express = require("express");
const app = express();
const router = require("./routes");
const port = 3000;
const cors = require("cors");
// const errHandler = require("./helpers/errHandler");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
// app.use(errHandler);

app.listen(port, () => {
	console.log(`App listening at port:${port}`);
});