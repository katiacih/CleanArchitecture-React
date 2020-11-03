import { RemoteAuthentication} from './remote-authentication';
import {HttpPostClientSpy} from '../../test/mock-http-client';



describe('RemoteAuthentication', () => {
  test('Should call Http Client with correct URL', async () => {
    
    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    sut.auth();
    expect(httpPostClientSpy.url).toBe(url)
  })
})