import { MongoServerError } from 'mongodb';
import { Error } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export type IError = Error & {
	status?: number;
	code?: number;
};
export class CustomError {
	constructor(public message: string, public status?: number, public code?: number, public name?: any) {
		this.message = message;
		this.status = status;
		this.code = code;
		this.name = typeof name === 'string' ? name : '';
	}
}

//handle email or usename duplicates
const handleDuplicateKeyError = (err: MongoServerError, res: NextApiResponse) => {
	const field = Object.keys(err.keyValue);
	const code = 409;
	const error = `An account with that ${field} already exists.`;
	return res.status(code).json({ message: error, fields: field, success: false });
};

//handle field formatting, empty fields, and mismatched passwords
const handleValidationError = (err: typeof Error.ValidationError, res: NextApiResponse) => {
	if (err instanceof Error.ValidationError) {
		const errors = Object.values(err.errors).map((el) => el.message);
		const fields = Object.values(err.errors).map((el) => el.path);
		const code = 400;
		if (errors.length > 1) {
			const formattedErrors = errors.join('');
			return res.status(code).json({ message: formattedErrors[0], fields: fields, success: false });
		} else {
			return res.status(code).json({ message: errors[0], fields: fields, success: false });
		}
	}
};

const errorController = (err: any, req: NextApiRequest, res: NextApiResponse) => {
	if (err.name === 'ValidationError') {
		return handleValidationError(err, res);
	}
	if (err.code && err.code == 11000) {
		return handleDuplicateKeyError(err, res);
	}
	return res.status(err.status || 500).json({
		success: false,
		message: (err as IError).message || 'Something went wrong',
		name: (err as IError).name || 'Error',
	});
};

export default errorController;
