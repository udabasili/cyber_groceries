import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { JwtPayload } from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { secretKey } from './config';

export const config = {
	matcher: ['/api/auth/me', '/api/wishlist'],
};

interface CustomNextResponse extends NextResponse {
	request: {
		userId: string;
	};
}

export async function sign(payload: JwtPayload, secret: string): Promise<string> {
	const iat = Math.floor(Date.now() / 1000);
	const exp = iat + 60 * 60;

	return new SignJWT({ ...payload })
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setExpirationTime(exp)
		.setIssuedAt(iat)
		.setNotBefore(iat)
		.sign(new TextEncoder().encode(secret));
}

export async function verify(token: string, secret: string): Promise<JwtPayload> {
	const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
	return payload;
}

export async function middleware(request: NextRequest) {
	try {
		const refreshToken = request.cookies.get('X-Refresh-Token')?.value;
		const requestHeaders = new Headers(request.headers);
		const bearerToken = requestHeaders.get('Authorization');
		if (!refreshToken) {
			throw new Error('Unauthorized');
		}
		if (!bearerToken) {
			throw new Error('Unauthorized');
		}
		const accessToken = bearerToken.split(' ')[1];
		if (!accessToken) {
			throw new Error('Unauthorized');
		}
		const decode: JwtPayload = (await verify(accessToken, secretKey)) as JwtPayload;
		const response = NextResponse.next() as CustomNextResponse;
		response.request = {
			userId: decode.id,
		};

		return response;
	} catch (error) {
		const errorObject = error as Error;
		return new NextResponse(
			JSON.stringify({ success: false, message: errorObject.message, name: errorObject.name }),
			{
				status: 401,
				headers: { 'content-type': 'application/json' },
			}
		);
	}
}
