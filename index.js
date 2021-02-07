// Allow .env entries

require("dotenv").config();

// Set up static webpage

const express = require("express");
const app = express();

app.use(express.static("Client"));
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log("listening at 3000");
});

// MognoDB client

const dbName = "Todo-App";
const password = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://jesperkha:${password}@cluster-1.d5rss.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const { MongoClient } = require("mongodb");
const client = new MongoClient(uri, { useUnifiedTopology: true });

// App methods
const manageLogin = require("./account-manager");
const manageEntries = require("./entry-manager");

async function initMongoClient() {
	await client.connect();
	const db = client.db(dbName);

	// Hangle user login and account creation
	const users = db.collection("Users");
	manageLogin(users, app);
	manageEntries(users, app);
}

initMongoClient();
