import { api } from '@/shared/api'
import { TypeSettingsSchema } from '../schemes'
import { IUser } from '@/features/auth/types'


class UserService {
	public async findProfile() {
		const response = await api.get<IUser>('api/users/profile')		

		return response
	}

	public async updateProfile(body: TypeSettingsSchema) {
		const response = await api.patch<IUser>('api/users/profile-update', body)

		return response
	}
}

export const userService = new UserService()
