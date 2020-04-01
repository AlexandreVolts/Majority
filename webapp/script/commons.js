"use strict"

const BASE_URL = "http://localhost:8080";

function myFetch(url, method, callback)
{
	const PARAMS = {
		method: method
	};

	fetch(url, PARAMS).then((res) => res.json()).then((res) => {
		callback(res);
	});
}