const baseUrl = import.meta.env.baseUrl ?? "http://127.0.0.1:3000";
const UrlEndpoints = {
  projects: `${baseUrl}/projects/`,
  add: `${baseUrl}/projects/add`,
  delete: `${baseUrl}/projects/delete`,
  edit: `${baseUrl}/projects/edit`
};

export { baseUrl, UrlEndpoints as endpoints };