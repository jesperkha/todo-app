module.exports = async (users, app) => {
	let user = await users.findOne({ username: "Bob", password: "1234" });

	// send user notes
	app.get("/getCurrentState", (req, res) => {
		res.json(user);
	});

	// get new list item
	app.post("/storeCurrentState", async (req, res) => {
		const content = req.body;
		await users.updateOne(
			{ username: content.user.username, password: content.user.password },
			{ $set: { notes: content.notes } }
		);
		user = await users.findOne({ username: "Bob", password: "1234" });
		res.json({ status: "success" });
	});
};
