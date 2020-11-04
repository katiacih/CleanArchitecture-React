import {AccountModel} from '../models/AccountModel';

export type AuthenticationParams = {
  email: string
  password: string
}

/**PAra implementar a interface Authtentication precisa enviar os parametros de entrada
 * do tipo AuthtenticationParams e ele retorna uma resposta assincrona, ou seja, um promise.
 */
export interface Authentication {
  
   auth (params: AuthenticationParams) : Promise<AccountModel>
}