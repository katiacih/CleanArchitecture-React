

export enum HttpStatusCode {

  unathorized = 401,
  noContent = 204,
  badRequest = 400,
  ok = 200,
  notFound = 404,
  serverError = 500
  
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}