import { it, expect, vi } from 'vitest';

import { sendDataRequest } from '../util/http.js';

const testResponseData = {testKey: 'Test Data'};

const testFetch = vi.fn((url, options) => {
    return new Promise((resolve, reject) => {
        const testResponse = {
            ok: true,
            json() {
                return new Promise((resolve, reject) => {
                    resolve(testResponseData);
                })
            }
        };

        const testRejectResponse = {
            ok: false,
            json() {
                return new Promise((resolve, reject) => {
                    reject(testResponseData);
                })
            }
        };
        
        //resolve(testResponse);
        reject(testRejectResponse);
    });
})

//to mock the fetch function, because fetch is global available object or function
vi.stubGlobal('fetch', testFetch);

it('should throw an error if the request failed', async () => {
    const testData = {key: 'test'}
    return expect(sendDataRequest(testData)).rejects.toThrow();

});

// it('should return the response data if the request succeeded', () => {
//     const testData = {key: 'test'}
//     return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
// })