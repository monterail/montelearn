import { fetchUtils } from 'react-admin';

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
    const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`;

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

  // getMany: (resource, params) => {
  //   const query = {
  //       filter: JSON.stringify({ id: params.ids }),
  //   };
  //   const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`;
  //   return fetch(url).then(({ json }) => ({ 
  //     data: json.map(resource => ({ ...resource, id: resource.uuid }) ),
  //   }));
  // },

  // getManyReference: (resource, params) => {
  //   const { page, perPage } = params.pagination;
  //   const { field, order } = params.sort;
  //   const query = {
  //       sort: JSON.stringify([field, order]),
  //       range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
  //       filter: JSON.stringify({
  //           ...params.filter,
  //           [params.target]: params.id,
  //       }),
  //   };
  //   const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`;

  //   return fetch(url).then(({ headers, json }) => ({
  //     data: json.map(resource => ({ ...resource, id: resource.uuid }) ),
  //     total: parseInt(headers.get('content-range').split('/').pop(), 10),
  //   }));
  // },

  // update: (resource, params) =>
  //   fetch(`${apiUrl}/${resource}/${params.id}`, {
  //       method: 'PUT',
  //       body: JSON.stringify(params.data),
  //   }).then(({ json }) => ({ 
  //     ...json,
  //     id: json.uuid,
  //   })
  // ),

  // updateMany: (resource, params) => {
  //   const query = {
  //       filter: JSON.stringify({ id: params.ids}),
  //   };
  //   return fetch(`${apiUrl}/${resource}?${JSON.stringify(query)}`, {
  //       method: 'PUT',
  //       body: JSON.stringify(params.data),
  //   }).then(({ json }) => ({ data: json }));
  // },

  // create: (resource, params) =>
  //   fetch(`${apiUrl}/${resource}`, {
  //       method: 'POST',
  //       body: JSON.stringify(params.data),
  //   }).then(({ json }) => ({
  //     data: { ...params.data, id: json.uuid },
  //   })),

  // delete: (resource, params) =>
  //   fetch(`${apiUrl}/${resource}/${params.id}`, {
  //       method: 'DELETE',
  //   }).then(({ json }) => ({ 
  //     ...json,
  //     id: json.uuid,
  //   })
  // ),

  // deleteMany: (resource, params) => {
  //   const query = {
  //       filter: JSON.stringify({ id: params.ids}),
  //   };
  //   return fetch(`${apiUrl}/${resource}?${JSON.stringify(query)}`, {
  //       method: 'DELETE',
  //       body: JSON.stringify(params.data),
  //   }).then(({ json }) => ({ data: json }));
  // }
};

export default dataProvider;
