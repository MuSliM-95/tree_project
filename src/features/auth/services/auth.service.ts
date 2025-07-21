import { api } from '@/shared/api'
import { TypeLoginSchema, TypeRegisterSchema } from '../schemes'
import { IUser } from '../types/user.types'


class AuthService {
	public async register(body: TypeRegisterSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IUser>('api/auth/register', body, {
			headers
		})

		return response
	}

	public async login(body: TypeLoginSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IUser>('api/auth/login', body, {
			headers
		})
		
		return response
	}

	public async oauthByProvider(provider: 'google' | 'yandex') {
		const response = await api.get<{ url: string }>(
			`api/oauth/connect/${provider}`
		)

		return response
	}

	public async logout() {
		const response = await api.post('api/auth/logout')

		return response
	}
}

export const authService = new AuthService()
