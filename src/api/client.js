import Swagger from 'swagger-client';
import spec from './openapi';

const responseInterceptor = (res) => {
  if (res.status === 401 || res.status === 403) {
    window.location = '/api/logout';
  }
  return res;
};

export default new Swagger({ spec, responseInterceptor });
