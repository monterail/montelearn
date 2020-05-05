import { stringify } from "query-string";
import { fetchUtils } from "react-admin";

const { API_URL } = process.env;

const httpClient = (url, options = {}) => {
  const finalOptions = { ...options };

  if (!finalOptions.headers) {
    finalOptions.headers = new Headers({ Accept: "application/json" });
  }

  const token = localStorage.getItem("token");

  if (token) {
    finalOptions.headers.set("Authorization", `Bearer ${token}`);
  }

  return fetchUtils.fetchJson(url, options);
};

const dataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };

    const url = `${API_URL}/${resource}?${stringify(query)}`;

    const { json } = await httpClient(url);

    return {
      // eslint-disable-next-line no-shadow
      data: json.results.map((resource) => ({ ...resource, id: resource.uuid })),
      total: json.count,
    };
  },

  getOne: async (resource, params) => {
    const { json } = await httpClient(`${API_URL}/${resource}/${params.id}`);

    return {
      data: {
        ...json,
        id: json.uuid,
      },
    };
  },

  // To add more methods see:
  // https://marmelab.com/react-admin/DataProviders.html#writing-your-own-data-provider
};

export default dataProvider;
