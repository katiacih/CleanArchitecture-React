import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication';
import {HttpPostClient} from '@/data/protocols/http/http-post-client';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { UnexpectedCredentialsError } from '@/domain/models/errors/unexpected-error';
import { InvalidCredentialsError } from '@/domain/models/errors/invalid-credentials-errors';
import { AccountModel } from '@/domain/models/AccountModel';



//deve implementar a interface de autenticação.
export class RemoteAuthentication implements  Authentication{

  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel> ) {}

  async auth(params: AuthenticationParams) : Promise<AccountModel> {
    const httpResponse =  await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
      case HttpStatusCode.badRequest: throw new UnexpectedCredentialsError()
      default: throw new UnexpectedCredentialsError()
    }
  }

}
