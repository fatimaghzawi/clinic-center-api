import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import '../../../tests/setup';
import { createUserSchema, updateUserSchema } from '../validations/user.validation';

describe('Users validation', () => {
  it('accepts valid create user payload', () => {
    const result = createUserSchema.safeParse({
      username: 'clerk01',
      password: 'Password@123',
      role: 'receptionist',
    });
    assert.equal(result.success, true);
  });

  it('rejects invalid role on update', () => {
    const result = updateUserSchema.safeParse({ role: 'superadmin' });
    assert.equal(result.success, false);
  });
});
