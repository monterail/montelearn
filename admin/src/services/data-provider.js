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

const buildUrlForGetMany = (resource, params) => {
  if (resource === "tests") {
    const query = stringify({ lesson_uuid: params.ids[0] });
    return `/admin/tests?${query}`;
  }
  const query = stringify({ filter: JSON.stringify({ id: params.ids }) });
  return `/${resource}?${query}`;
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

    const url = `/${resource}?${stringify(query)}`;

    const { data } = await apiClient(url);

    return {
      // eslint-disable-next-line no-shadow
      data: data.results.map((resource) => ({
        ...resource,
        id: resource.uuid,
      })),
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
    const payload =
      resource === "lesson" ? convertLessonParamsToFormData(params) : JSON.stringify(params.data);

    return apiClient(`/${resource}/`, {
      method: "POST",
      body: payload,
    }).then(({ data }) => ({
      data: { id: data.uuid },
    }));
  },

  getMany: (resource, params) => {
    const url = buildUrlForGetMany(resource, params);

    return apiClient(url).then(({ data }) => {
      if (resource === "tests") {
        return { data: data.results.map((elem) => ({ ...elem, id: elem.lesson_uuid })) };
      }
      return { data: data.results.map((elem) => ({ ...elem, id: elem.uuid })) };
    });
  },
  // To add more methods see:
  // https://marmelab.com/react-admin/DataProviders.html#writing-your-own-data-provider
};

export default dataProvider;
