import { AxiosHttpClient} from './axios.http.client'
import { mockAxios, mockHttpResponse } from '@/infra/test/index'
import { mockPostRequest } from '@/data/test/index'
import axios from 'axios'



jest.mock('axios')


type SubTypes = {
  sut: AxiosHttpClient,
  mockedAxios: jest.Mocked<typeof axios>
}
//cria suite de testes
const makeSut = (): SubTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}



describe('AxiosHttpClient', () => {

  test('Should call axios with correct values', async () => {
    const request = mockPostRequest()
    const {sut, mockedAxios } = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct statusCode body', async () => {
    const {sut, mockedAxios } = makeSut()
    const promise = sut.post(mockPostRequest())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })

  test('Should return the correct statusCode and body on failure', () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse()
    })
    const promise = sut.post(mockPostRequest())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })


})