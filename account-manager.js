/**
 * Handles logging in and creating user accounts
 * @param {mongo database} db
 * @param {express app} app
 * @returns {null}
 */

module.exports = async (db, app) => {
	async function createUser(user) {
		if (await users.find({ username: user.username })[0]) return;
		users.insertOne({
			username: user.username,
			password: user.password,
			todos: [],
		});
	}

	app.post("/login", (req, res) => {
		const content = req.body;
		const user = db.findOne({
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
