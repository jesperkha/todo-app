/**
 * Handles logging in and creating user accounts
 * @param {mongo database} db
 * @param {express app} app
 * @returns {null}
 */

module.exports = async (users, app) => {
	async function createUser(user) {
		if (await users.find({ username: user.username })[0]) return;
	}

	app.post("/verifyLogin", async (req, res) => {
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

	app.post("/createAccount", async (req, res) => {
		const content = req.body;
		let user = await users.findOne({
			username: content.username,
			password: content.password,
		});

		if (user) {
			res.json({ status: "error" });
		} else {
			const newUser = {
				username: content.username,
				password: content.password,
				notes: [[]],
			};
			await users.insertOne(newUser);
			res.json({ status: "success", user: newUser });
		}
	});
};
