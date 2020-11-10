import { Validation } from '../protocols/validation'

export class ValidationStub implements Validation {
  errorMessage: string

  validate (): string {
    return this.errorMessage
  }
}
