
export class InvalidCredentialsError extends Error {
  constructor () {
    super('Credentials inválidas')
    this.name = 'InvalidCredentialsError'
  }
}
