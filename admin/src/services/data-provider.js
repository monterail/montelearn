import { stringify } from "query-string";
import { fetchUtils } from "react-admin";

// NOTE:
// Don't know why we have to mutate input options object
// to make the request work.
const httpClient = (url, options = {}) => {
  if (!options.headers) {
    // eslint-disable-next-line no-param-reassign
    options.headers = new Headers({ Accept: "application/json" });
  }

  const token = localStorage.getItem("token");
  options.headers.set("Authorization", `Bearer ${token}`);

  return fetchUtils.fetchJson(url, options);
};

const convertLessonParamsToFormData = (params) => {
  const formData = new FormData();
  const paramsData = params.data;

  if ("pdf_file" in paramsData) {
    paramsData.pdf_file = paramsData.pdf_file.rawFile;
  }

  const paramsEntries = Object.entries(paramsData);

  paramsEntries.forEach(([key, value]) => formData.append(key, value));

  return formData;
};

const buildQueryForTestReference = (params) => ({ lesson_uuid: params.ids[0] });

const dataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };

    const url = `${process.env.API_URL}/${resource}?${stringify(query)}`;

    const { json } = await httpClient(url);

    return {
      // eslint-disable-next-line no-shadow
      data: json.results.map((resource) => ({ ...resource, id: resource.uuid })),
      total: json.count,
    };
  },

  getOne: async (resource, params) => {
    const { json } = await httpClient(`${process.env.API_URL}/${resource}/${params.id}`);

    return {
      data: {
        ...json,
        id: json.uuid,
      },
    };
  },

  create: (resource, params) => {
    let payload;

    switch (resource) {
      case "lesson":
        payload = convertLessonParamsToFormData(params);
        break;
      default:
        payload = JSON.stringify(params.data);
    }

    return httpClient(`${process.env.API_URL}/${resource}/`, {
      method: "POST",
      body: payload,
    }).then(({ json }) => ({
      data: { id: json.uuid },
    }));
  },

  getMany: (resource, params) => {
    let query;

    switch (resource) {
      case "tests":
        query = buildQueryForTestReference(params);
        break;
      default:
        query = { filter: JSON.stringify({ id: params.ids }) };
    }

    const url = `${process.env.API_URL}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => {
      let data;

      switch (resource) {
        case "tests":
          // eslint-disable-next-line no-shadow
          data = json.results.map((resource) => ({ ...resource, id: resource.lesson_uuid }));
          break;
        default:
          // eslint-disable-next-line no-shadow
          data = json.results.map((resource) => ({ ...resource, id: resource.uuid }));
      }

      return { data };
    });
  },
  // To add more methods see:
  // https://marmelab.com/react-admin/DataProviders.html#writing-your-own-data-provider
};

export default dataProvider;
