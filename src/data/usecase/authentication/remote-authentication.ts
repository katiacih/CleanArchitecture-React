import {HttpPostClient} from '../../protocols/http/http-post-client';


//deve implementar a interface de autenticação.
export class RemoteAuthentication {

  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient ) {}

  async auth() : Promise<void> {
    await this.httpPostClient.post({url: this.url})
  }

}
