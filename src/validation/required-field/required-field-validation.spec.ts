import { RequiredFieldValidation } from './required-field-validation'
import { RequiredFieldError  } from '@/validation/errors/required-field-error'
import faker from 'faker'

describe('RequiredFieldValidation', () => {

  test('Should return error if field email is empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return error if field password is empty', () => {
    const sut = new RequiredFieldValidation('password')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return falsy if field is not empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate(faker.random.word())
    expect(error).toBeFalsy()
  })

})