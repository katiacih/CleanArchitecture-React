import { SaveAccessToken } from '@/domain/usecases/save-access-token'
import { SetStorage } from '@/data/protocols/cache/set-storage'
import { UnexpectedError } from '@/domain/errors'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor (private readonly setStorage: SetStorage) {}

  async save (accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken)
    if (!accessToken) {
      throw new UnexpectedError()
    }
  }
}
