import { AxiosHttpClient} from './axios.http.client'
import axios from 'axios'
import faker, { fake } from 'faker'
import { HttpPostParams } from '@/data/protocols/http'


jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

//monta response
const mockedAxiosResult = {
  data: faker.random.objectElement(),
  status: faker.random.number()
}
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

//cria suite de testes
const makeSut = (): AxiosHttpClient => {
  return  new AxiosHttpClient()
}

//monta request
const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})


describe('AxiosHttpClient', () => {

  test('Should call axios with correct values', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct statusCode body', async () => {
    const sut = makeSut()
    const response = await sut.post(mockPostRequest())
    expect(response).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })


})