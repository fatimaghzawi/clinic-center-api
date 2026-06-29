import bcrypt from 'bcryptjs';
import { env } from '../../config/env';

export const hashPassword = (password: string) => bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS);

export const comparePassword = (candidate: string, hash: string) => bcrypt.compare(candidate, hash);

export const hashToken = (token: string) => bcrypt.hash(token, 10);
