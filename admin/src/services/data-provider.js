import { stringify } from "query-string";
import apiClient from "./apiClient.ts";

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

    const url = `/${resource}?${stringify(query)}`;

    const { data } = await apiClient(url);

    return {
      // eslint-disable-next-line no-shadow
      data: data.results.map((resource) => ({ ...resource, id: resource.uuid })),
      total: data.count,
    };
  },

  getOne: async (resource, params) => {
    const { data } = await apiClient(`/${resource}/${params.id}`);

    return {
      data: {
        ...data,
        id: data.uuid,
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

    return apiClient(`/${resource}/`, {
      method: "POST",
      body: payload,
    }).then(({ data }) => ({
      data: { id: data.uuid },
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

    const url = `/${resource}?${stringify(query)}`;
    return apiClient(url).then(({ data }) => {
      switch (resource) {
        case "tests":
          // eslint-disable-next-line no-shadow
          return {
            data: data.results.map((elem) => ({ ...elem, id: elem.lesson_uuid })),
          };
        default:
          // eslint-disable-next-line no-shadow
          return {
            data: data.results.map((elem) => ({ ...elem, id: elem.uuid })),
          };
      }
    });
  },
  // To add more methods see:
  // https://marmelab.com/react-admin/DataProviders.html#writing-your-own-data-provider
};

export default dataProvider;
