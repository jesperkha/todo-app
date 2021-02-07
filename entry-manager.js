module.exports = async (users, app) => {
	// send user notes
	app.post("/getCurrentState", async (req, res) => {
		let user = await users.findOne({
			username: req.body.username,
			password: req.body.password,
		});
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
