import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import '../../../tests/setup';
import { createStaffSchema } from '../validations/staff.validation';

const objectId = '507f1f77bcf86cd799439011';

describe('Staff validation', () => {
  it('accepts valid staff payload', () => {
    const result = createStaffSchema.safeParse({
      userId: objectId,
      departmentId: objectId,
      staffType: 'doctor',
      fullName: 'Dr. Jane Doe',
    });
    assert.equal(result.success, true);
  });

  it('rejects invalid staff type', () => {
    const result = createStaffSchema.safeParse({
      userId: objectId,
      departmentId: objectId,
      staffType: 'receptionist',
      fullName: 'Jane Doe',
    });
    assert.equal(result.success, false);
  });
});
