function addList(flag = true) {
	const container = document.getElementById("notes");
	const list = document.createElement("div");
	list.id = Math.random();
	list.classList.add("list");

	const del = document.createElement("p");
	del.textContent = "Delete list";
	del.classList.add("delete");
	del.onclick = () => {
		if (container.childNodes[1]) {
			deleteList(list.id);
		}
	};

	const form = document.createElement("form");
	const input = document.createElement("input");
	input.classList.add("add");
	form.addEventListener("submit", (e) => {
		if (!list.childNodes[2]) {
			addList();
		}
		e.preventDefault();
		addNote(list.id, e.path[0][0].value);
		e.path[0][0].value = "";
	});
	form.appendChild(input);

	list.appendChild(del);
	list.appendChild(form);
	container.appendChild(list);

	if (flag) storeCurrentState();

	return list.id;
}

function deleteList(id) {
	const list = document.getElementById(id);
	const container = document.getElementById("notes");
	container.removeChild(list);

	storeCurrentState();
}
