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

  const access_token = localStorage.getItem("access_token");
  options.headers.set("Authorization", `Bearer ${access_token}`);

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
    const {
      filter,
      sort: { field, order },
      pagination: { page },
    } = params;
    const perPage = 500;
    const query = {
      limit: perPage,
      offset: page === 1 ? 0 : page * perPage,
      filter: JSON.stringify(filter),
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
    };

    const url = `${process.env.API_URL}/${resource}?${stringify(query)}`;

    const { json } = await httpClient(url);
    const { results } = json;
    const data = results.map((result) => ({
      ...result,
      id: result.uuid,
    }));

    return {
      // Workaround for autocomplete to be able to create non-existing resource
      data: filter.q ? [{ name: filter.q, id: filter.q }, ...data] : data,
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

    let resourceName = resource;
    switch (resource) {
      case "lesson":
        payload = convertLessonParamsToFormData(params);
        break;
      case "tests":
        resourceName = "admin/tests";
        payload = JSON.stringify(params.data);
        break;
      default:
        payload = JSON.stringify(params.data);
    }

    return httpClient(`${process.env.API_URL}/${resourceName}/`, {
      method: "POST",
      body: payload,
    }).then(({ json }) => ({
      data: { id: json.uuid },
    }));
  },

  getMany: (resource, params) => {
    let query;
    let resourceName = resource;
    switch (resource) {
      case "tests":
        query = buildQueryForTestReference(params);
        resourceName = `admin/tests`;
        break;
      default:
        query = { filter: JSON.stringify({ id: params.ids }) };
    }

    const url = `${process.env.API_URL}/${resourceName}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => {
      let data;

      switch (resource) {
        case "tests":
          // eslint-disable-next-line no-shadow
          data = json.results.map((resource) => ({
            ...resource,
            id: resource.lesson_uuid,
          }));
          break;
        default:
          // eslint-disable-next-line no-shadow
          data = json.results.map((resource) => ({
            ...resource,
            id: resource.uuid,
          }));
      }

      return { data };
    });
  },
  // To add more methods see:
  // https://marmelab.com/react-admin/DataProviders.html#writing-your-own-data-provider
};

export default dataProvider;
