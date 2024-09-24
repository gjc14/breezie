import { createCookie, redirect } from '@remix-run/node'
import AES from 'crypto-js/aes'
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'
import { CreateEmailResponseSuccess, Resend } from 'resend'
import MagicLinkEmail from '~/components/email/MagicLink'
import { getUserById } from './user.server'

let COOKIE_SECRET = process.env.COOKIE_SECRET
if (!COOKIE_SECRET) {
	console.warn('COOKIE_SECRET is not set')
	COOKIE_SECRET = 'default-cookie-s3cr3t'
}

export const authCookie = createCookie('auth', {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	path: '/', // Available everywhere on the site
	sameSite: 'lax',
	secrets: [COOKIE_SECRET],
	maxAge: 60 * 60 * 24 * 14, // 14 days
})

interface MagicLinkPayload {
	id: string
	email: string
	exp: number
}

export const getToken = async (id: string, email: string) => {
	const exp = Date.now() + 1000 * 60 * 10 // 10 minutes
	const encryptedData = AES.encrypt(JSON.stringify({ id, email, exp }), process.env.AES_SECRET ?? '').toString()
	const base64Token = Base64.stringify(Utf8.parse(encryptedData))
	return base64Token
}

export const sendMagicLink = async (
	token: string,
	email: string,
	origin: string,
	options?: {
		searchParams?: Record<string, string>
	}
): Promise<CreateEmailResponseSuccess | null> => {
	const magicLink = `${origin}/admin/magic?token=${token}${
		options?.searchParams ? '&' + new URLSearchParams(options?.searchParams).toString() : ''
	}`

	const resend = new Resend(process.env.EMIAL_API_KEY)
	const { data, error } = await resend.emails.send({
		from: `${process.env.BASE_URL ? `Webie <email@${process.env.BASE_URL}>` : 'Acme <onboarding@resend.dev>'}`,
		to: [email],
		subject: 'Your magic link',
		react: MagicLinkEmail({ magicLink }),
	})
	if (error) {
		console.error(error)
		throw new Error('Failed to send email')
	}
	return data
}

class TokenExpiredError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'TokenExpiredError'
	}
}

export const verifyMagicLink = async (token: string): Promise<{ id: string; email: string } | null> => {
	try {
		const encryptedData = Utf8.stringify(Base64.parse(token))
		const decryptedData = AES.decrypt(encryptedData, process.env.AES_SECRET ?? '').toString(Utf8)
		const data = JSON.parse(decryptedData) as MagicLinkPayload
		if (data.exp < Date.now()) throw new TokenExpiredError('Token expired')
		return data
	} catch (error: any) {
		console.error(error.name, error.message)
		return null
	}
}

export const decodedAdminToken = async (cookieString: string | null): Promise<{ id: string }> => {
	if (!cookieString) throw redirect('/admin/signin')

	// cookie are set in /admin/magic
	const cookie = await authCookie.parse(cookieString)
	if (cookie && typeof cookie === 'object' && 'id' in cookie) {
		const { user } = await getUserById(cookie.id)
		if (user && user.status === 'ACTIVE' && user.role === 'ADMIN') {
			return { id: cookie.id }
		}
	}

	throw redirect('/admin/signin')
}
