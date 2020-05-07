import Cookie from "js-cookie";
import Router from "next/router";

export default async function logout () {
	Cookie.remove("access_token");
	await Router.push("/");
};