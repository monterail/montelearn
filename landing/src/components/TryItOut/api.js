import fetch from "isomorphic-unfetch";

export default async function sendRequest(method, url, data) {
  try {
    const res = await fetch(url, { method, data });
    const headers = Array.from(res.headers.entries());

    let body = null;

    if (res.ok && res.json) {
      const jsonData = await res.json();
      body = jsonData.data;
    }

    return {
      body,
      headers,
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
    };
  } catch {
    return {
      body: null,
      headers: [],
      ok: false,
      status: 111,
      statusText: "Connection Refused",
    };
  }
}
