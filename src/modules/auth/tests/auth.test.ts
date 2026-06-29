import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import '../../../tests/setup';
import { loginSchema, registerSchema } from '../validations/auth.validation';

describe('Auth validation', () => {
  it('accepts valid login payload', () => {
    const result = loginSchema.safeParse({ username: 'admin', password: 'Admin@123456' });
    assert.equal(result.success, true);
  });

  it('rejects empty password on login', () => {
    const result = loginSchema.safeParse({ username: 'admin', password: '' });
    assert.equal(result.success, false);
  });

  it('rejects weak register password', () => {
    const result = registerSchema.safeParse({
      username: 'newuser',
      password: 'password',
      role: 'receptionist',
    });
    assert.equal(result.success, false);
  });

  it('rejects register password without special character', () => {
    const result = registerSchema.safeParse({
      username: 'newuser',
      password: 'Password123',
      role: 'receptionist',
    });
    assert.equal(result.success, false);
  });

  it('accepts valid register payload', () => {
    const result = registerSchema.safeParse({
      username: 'newuser',
      password: 'Password@123',
      role: 'receptionist',
    });
    assert.equal(result.success, true);
  });
});
