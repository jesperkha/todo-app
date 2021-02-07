function addNote(id, value, set_date = null, flag = true) {
	const content = value;
	const container = document.getElementById(id);

	// create note
	const note = document.createElement("div");
	note.classList.add("list-item");
	note.id = Math.random();
	note.onclick = () => {
		note.classList.add("remove");
		setTimeout(() => {
			container.removeChild(document.getElementById(note.id));
			storeCurrentState();
		}, 500);
	};
	const date = document.createElement("div");
	date.classList.add("date");
	if (!set_date) {
		date.textContent = getDate();
	} else {
		date.textContent = set_date;
	}
	const text = document.createElement("p");
	text.textContent = content;

	note.appendChild(date);
	note.appendChild(text);
	container.appendChild(note);

	if (flag) storeCurrentState();
}

function getDate() {
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, "0");
	var mm = String(today.getMonth() + 1).padStart(2, "0");
	var yyyy = today.getFullYear();
	today = dd + "." + mm + "." + yyyy;
	return today;
}
