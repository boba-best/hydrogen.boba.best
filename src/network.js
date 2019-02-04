class RequestWrapper {
	constructor(promise, controller) {
		this._promise = promise;
		this._controller = controller;
	}

	abort() {
		this._controller.abort();
	}

	response() {
		return this._promise;
	}
}

export default class Network {
	constructor(homeserver, accessToken) {
		this._homeserver = homeserver;
		this._accessToken = accessToken;
	}

	_url(csPath) {
		return `${this._homeserver}/_matrix/client/r0${csPath}`;
	}

	_request(method, csPath, queryParams = {}, body) {
		const queryString = Object.entries(queryParams)
			.filter(([name, value]) => value !== undefined)
			.map(([name, value]) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`)
			.join("&");
		const url = this._url(`${csPath}?${queryString}`);
		let bodyString;
		const headers = new Headers();
		if (this._accessToken) {
			headers.append("Authorization", `Bearer ${this._accessToken}`);
		}
		headers.append("Accept", "application/json");
		if (body) {
			headers.append("Content-Type", "application/json");
			bodyString = JSON.stringify(body);
		}
		const controller = new AbortController();
		// TODO: set authenticated headers with second arguments, cache them
		let promise = fetch(url, {
			method,
			headers,
			body: bodyString,
			signal: controller.signal
		});
		promise = promise.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				switch (response.status) {
					default:
						throw new HomeServerError(response.json())
				}
			}
		});
		return new RequestWrapper(promise, controller);
	}

	_post(csPath, queryParams, body) {
		return this._request("POST", csPath, queryParams, body);
	}

	_get(csPath, queryParams, body) {
		return this._request("GET", csPath, queryParams, body);
	}

	sync(timeout = 0, since = undefined) {
		return this._get("/sync", {since, timeout});
	}

	passwordLogin(username, password) {
        return this._post("/login", undefined, {
          "type": "m.login.password",
          "identifier": {
            "type": "m.id.user",
            "user": username
          },
          "password": password
        });
	}
}