"use strict"
// I have clearly the flemme to do something really propre.
// So this script is only for test-purpose.

window.onload = () =>
{
	if (!window.fetch)
		return;
	getRooms();

	document.querySelector("button").addEventListener("click", postRoom);
}

function getRooms()
{
	myFetch(BASE_URL + "/room", "GET", (res) => {
		for (let i = res.length - 1; i >= 0; i--)
			createRoomBloc(res[i]);
	});
}

function getRoom(id)
{
	myFetch(`${BASE_URL}/room/${id}`, "GET", (res) => {
		createRoomBloc(res);
	});
}

function postRoom()
{
	myFetch(BASE_URL + "/room", "POST", (res) => {
		getRoom(res.id);
	});
}

function createRoomBloc(data)
{
	let container = document.querySelector(".roomContainer");
	let div = document.createElement("div");

	div.innerHTML = `<h2>${data.id}</h2>`;
	div.innerHTML += `<p>There are ${data.players.length} players inside this room.</p>`;
	div.innerHTML += `<p><a href="${BASE_URL + "/" + data.id}">Join this room !</a></p>`;
	container.appendChild(div);
}