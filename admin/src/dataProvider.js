import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = process.env.REACT_APP_API_URL;

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ json }) => ({
      data: json.results.map(resource => ({ ...resource, id: resource.uuid })),
      total: json.count,
    }));
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: {
        ...json,
        id: json.uuid,
      }
    })),
  
  // To add more methods see:
  // https://marmelab.com/react-admin/DataProviders.html#writing-your-own-data-provider
};

export default dataProvider;
