import Cookie from "js-cookie";
import Router from "next/router";

function setCookies({ token, user } : { token: string, user: any}) : void {
	Cookie.set("access_token", token);
	for (const prop in user) {
		Cookie.set(prop.toString(), user[prop]);
	}
}

export default async function login({ email, password } : { email: string, password: string }): Promise<string | void> {
	const request = new Request(`${process.env.API_PLAYGROUND_URL}/api/auth/email/login/`, {
		method: "POST",
		body: JSON.stringify({ email, password }),
		headers: new Headers({ "Content-Type": "application/json" }),
	});

	return fetch(request)
		.then((response) => {
			if (response.status < 200 || response.status >= 300) {
				throw new Error("Please provide correct email and password");
			}
			return response.json();
		})
		.then(async (res) => {
			setCookies(res);
			await Router.push("/");
		});
}
