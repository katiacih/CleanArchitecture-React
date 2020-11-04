import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { mockAuthentication} from '@/domain/tests/mock-authentication';
import {UnexpectedCredentialsError } from '@/domain/models/errors/unexpected-error';
import { InvalidCredentialsError } from '@/domain/models/errors/invalid-credentials-errors';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

//design pattern factory
const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut, 
    httpPostClientSpy
  }
}


describe('RemoteAuthentication', () => {

  test('Should call Http Client with correct URL', async () => { 
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body', async () => { 
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  test('Should throw invalidCredentialError if HttpPostClient returns 401', async () => { 
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })


  test('Should throw UnaexpectedError if HttpPostClient returns 400', async () => { 
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedCredentialsError())
  })


  test('Should throw UnaexpectedError if HttpPostClient returns 500', async () => { 
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedCredentialsError())
  })

  test('Should throw UnaexpectedError if HttpPostClient returns 404', async () => { 
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedCredentialsError())
  })


})