"use strict"
// Let meeeee do some uglyyyyyy things \o/

const URL = window.location.href;
const ROOM_ID = URL.substr(BASE_URL.length + 1, 4);

window.onload = () =>
{
	if (!window.fetch)
		return;
	document.querySelector("form").addEventListener("submit", onSubmit);
	manageSocket();
}

function onSubmit(e)
{
	e.preventDefault();
	let header = document.querySelector("header");
	let loginForm = document.getElementById("loginForm");
	let username = document.querySelector("input").value;

	header.removeChild(loginForm);
	manageSocket(username);
}

function manageSocket(username)
{
	let socket = io(BASE_URL);

	socket.send("ET:Majority:connection", {
		roomId: ROOM_ID,
		username: username
	});
}