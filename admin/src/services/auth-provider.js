const authProvider = {
  login: ({ username, password }) => {
    const request = new Request(`${process.env.API_URL}/auth/admin/login/`, {
      method: "POST",
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ access_token }) => {
        localStorage.setItem("access_token", access_token);
      });
  },
  logout: () => {
    localStorage.removeItem("access_token");
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem("access_token") ? Promise.resolve() : Promise.reject();
  },
  checkError: (error) => {
    const { status } = error;

    if (status === 401 || status === 403) {
      localStorage.removeItem("access_token");
      return Promise.reject();
    }

    return Promise.resolve();
  },
  getPermissions: () => Promise.resolve(),
};

export default authProvider;
