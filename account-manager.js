/**
 * Handles logging in and creating user accounts
 * @param {mongo database} db
 * @param {express app} app
 * @returns {null}
 */

module.exports = async (users, app) => {
	async function createUser(user) {
		if (await users.find({ username: user.username })[0]) return;
		await users.insertOne({
			username: user.username,
			password: user.password,
			notes: [[]],
		});
	}

	app.post("/login", async (req, res) => {
		const content = req.body;
		const user = await users.findOne({
			username: content.username,
			password: content.password,
		});

		if (user) {
			res.json({ status: "success", user });
		} else {
			res.json({ status: "error" });
		}
	});
};
