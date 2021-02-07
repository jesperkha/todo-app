const user = { username: "Bob", password: "1234" };

(async () => {
	const res = await fetch("/getCurrentState");
	const json = await res.json();

	for (let list of json.notes) {
		const listElement = addList(false);
		for (let note of list) {
			addNote(listElement, note.body, note.date, false);
		}
	}
})();

async function storeCurrentState() {
	const container = document.getElementById("notes");

	let lists = [];
	for (let list of container.childNodes) {
		//
		let l = [];
		for (let i = 2; i < list.childNodes.length; i++) {
			l.push({
				date: list.childNodes[i].childNodes[0].textContent,
				body: list.childNodes[i].childNodes[1].textContent,
			});
		}

		lists.push(l);
	}

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ user: user, notes: lists }),
	};

	const res = await fetch("/storeCurrentState", options);
	const json = await res.json();
	console.log(json);
}
