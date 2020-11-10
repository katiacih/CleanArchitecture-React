import { AxiosHttpClient } from '@/infra/http/axios-htttp-client/axios.http.client'


export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}