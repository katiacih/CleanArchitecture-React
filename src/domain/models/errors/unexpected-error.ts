
export class UnexpectedCredentialsError extends Error {
  constructor(){
    super('Erro inesperado')
    this.name = 'InvalidCredentialsError'
  }
}