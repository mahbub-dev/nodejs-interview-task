const express = require("express");
const port = process.env.PORT || 8080;
const app = express();
const item = require("./item_list.json");

app.get("/api/products/list", async (req, res) => {
	try {
		const size = Number(req.query?.size);
		const page = Number(req.query?.page);
		if (!size || !page) {
			res.status(400).send("Please  specify number of items and page");
			return;
		}

		const data = item.slice(size * page - size, size * page);
		res.status(200).send(
			data.map((i) => {
				return {
					id: Number(i.id),
					item_name: i.item_name,
					item_image: i.item_image,
					item_price: i.item_price,
				};
			})
		);
	} catch (error) {
		res.status(500).send(error);
		console.log(error);
	}
});

app.get("/api/product/:id", async (req, res) => {
	try {
		const id = Number(req.params.id);
		if (!id) {
			res.status(400).send(`invalid parameter found`);
			return;
		}
		const data = item.find((i) => (i.id === id));
		if (data) {
			res.status(200).send(data);
		} else res.status(404).send("data was not found in our system");
	} catch (error) {
		res.status(500).send(error);
		console.log(error);
	}
});

app.listen(port, (err) => {
	if (err) throw err;
	console.log(`server is runnig on port: ${port}`);
});
