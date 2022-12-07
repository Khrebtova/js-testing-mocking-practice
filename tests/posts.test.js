import { it, expect, describe, beforeEach } from 'vitest';

import { savePost, extractPostData } from '../posts/posts';

const testTitle = 'test-title';
const testContent = 'test-content';
//create a mock form data object with a get method to test 
let testFormData;

describe('extractPostData', () => {
    
    beforeEach(() => {
        testFormData = {
            title: testTitle,
            content: testContent,
            get(key) {
                return this[key];
            }
        }
    });
    
    it('should extract title and content from provided form data', () =>{
        const data = extractPostData(testFormData);
        expect(data.title).toBe(testTitle);
        expect(data.content).toBe(testContent);
    });

});