import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import '../../../tests/setup';
import { createDepartmentSchema } from '../validations/department.validation';

describe('Departments validation', () => {
  it('accepts valid department payload', () => {
    const result = createDepartmentSchema.safeParse({
      departmentName: 'Cardiology',
      description: 'Heart care unit',
    });
    assert.equal(result.success, true);
  });

  it('rejects empty department name', () => {
    const result = createDepartmentSchema.safeParse({ departmentName: '' });
    assert.equal(result.success, false);
  });
});
