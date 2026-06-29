import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import '../../../tests/setup';
import { createPatientSchema } from '../validations/patient.validation';

describe('Patients validation', () => {
  it('accepts valid patient payload', () => {
    const result = createPatientSchema.safeParse({
      fullName: 'John Smith',
      phone: '+1234567890',
      dateOfBirth: '1990-01-15',
      address: '123 Main St',
      bloodGroup: 'O+',
      emergencyContact: 'Jane Smith',
    });
    assert.equal(result.success, true);
  });

  it('rejects invalid blood group', () => {
    const result = createPatientSchema.safeParse({
      fullName: 'John Smith',
      phone: '+1234567890',
      dateOfBirth: '1990-01-15',
      address: '123 Main St',
      bloodGroup: 'X+',
      emergencyContact: 'Jane Smith',
    });
    assert.equal(result.success, false);
  });
});
