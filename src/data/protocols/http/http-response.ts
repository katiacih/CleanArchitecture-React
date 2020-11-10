
export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
}

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export enum HttpStatusCode {

  unauthorized = 401,
  noContent = 204,
  badRequest = 400,
  ok = 200,
  notFound = 404,
  serverError = 500

}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}
