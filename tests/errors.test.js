import { it, expect, describe, beforeEach } from 'vitest';

import { HttpError, ValidationError } from '../util/errors';

let testStatus = 500;
let testMessage = 'Server error';
let testData = { error: 'Server error' };
let error;

describe('HttpError class ', () => {
    beforeEach(() => {
        error = new HttpError(testStatus, testMessage, testData);
    });

    it('should have a statusCode property', () => {        
        expect(error).toHaveProperty('statusCode');
        // expect(error.statusCode).toBe(testStatus);
    });

    it('should have a message property', () => {        
        expect(error).toHaveProperty('message');
        // expect(error.message).toBe(testMessage);
    });

    it('should have a data property', () => {        
        expect(error).toHaveProperty('data');
        // expect(error.data).toBe(testData);
    });

    it('should contain undefined as data if no data was provided', () => {
        error = new HttpError(testStatus, testMessage);
        expect(error.data).toBeUndefined();
    });
});

describe('ValidationError class ', () => {
    beforeEach(() => {
        error = new ValidationError(testMessage);
    });

    it('should have a message property', () => {        
        expect(error).toHaveProperty('message');
        // expect(error.message).toBe(testMessage);
    });
});