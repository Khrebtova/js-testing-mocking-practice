import { it, expect, describe} from 'vitest';

import { validateNotEmpty } from '../util/validation';

describe('validateNotEmpty function', () => {
    it('should throw an error if the empty string is provided as input value', () => {
        let testInput = ''
        let testFunction = () => validateNotEmpty(testInput);
        expect(testFunction).toThrow();
    });

    it('should throw an error if the string with only spaces is provided as input value', () => {
        let testInput = '   '
        let testFunction = () => validateNotEmpty(testInput);
        expect(testFunction).toThrow();
    });

    it('it should not throw an error if the string with text is provided as input value', () => {
        let testInput = 'test'
        let testFunction = () => validateNotEmpty(testInput);
        expect(testFunction).not.toThrow();
    });

    it('should throw an error with the provided error message', () => {
        let testInput = ''
        let testErrorMessage = 'Test error message'
        let testFunction = () => validateNotEmpty(testInput, testErrorMessage);
        expect(testFunction).toThrow(testErrorMessage);
    })
});