async function login() {
	document.getElementById("form").classList.add("hide");
	document.getElementById("loading").classList.remove("hide");

	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, password }),
	};

	const req = await fetch("/verifyLogin", options);
	const res = await req.json();

	if (res.status == "success") {
		localStorage.setItem("user", JSON.stringify(res.user));
		window.location = "./notes.html";
	} else {
		reset();
	}
}

async function createAccount() {
	document.getElementById("form").classList.add("hide");
	document.getElementById("loading").classList.remove("hide");

	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, password }),
	};

	const req = await fetch("/createAccount", options);
	const res = await req.json();

	if (res.status == "success") {
		localStorage.setItem("user", JSON.stringify(res.user));
		window.location = "./notes.html";
		console.log("success");
	} else {
		console.log("succedweradfkags duhgasdgss");

		reset();
		document.getElementById("error").classList.add("hide");
		document.getElementById("exists").classList.remove("hide");
	}
}

function reset() {
	document.getElementById("error").classList.remove("hide");
	document.getElementById("form").classList.remove("hide");
	document.getElementById("loading").classList.add("hide");
}
