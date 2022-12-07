import { it, expect, vi } from 'vitest';

import { sendDataRequest } from '../util/http.js';
import { HttpError} from '../util/errors';

const testResponseData = {testKey: 'Test Data'};

const testFetch = vi.fn((url, options) => {
    return new Promise((resolve, reject) => {
        if(typeof options.body !== 'string') {
            return reject('body is not a string')
        }
        const testResponse = {
            ok: true,
            json() {
                return new Promise((resolve, reject) => {
                    resolve(testResponseData);
                })
            }
        };    
        resolve(testResponse);
        
    });
})

//to mock the fetch function, because fetch is global available object or function
vi.stubGlobal('fetch', testFetch);

it('should throw an HttpError in case of non-ok response ', async () => {
    testFetch.mockImplementationOnce((url, options) => {
        return new Promise((resolve, reject) => {
            const testResponse = {
                ok: false,
                json() {
                    return new Promise((resolve, reject) => {
                        resolve(testResponseData);
                    })
                }
            };
            resolve(testResponse);
        });
    });
    const testData = {key: 'test'}
    return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);

});

it('should return the response data if the request succeeded', () => {
    const testData = {key: 'test'}
    return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
})

it('should convert the provided data to JSON before sending the request', async() => {
    const testData = {key: 'test'}
    let errorMessage;
    try{
        await sendDataRequest(testData);
    }catch(error){
        errorMessage = error;
    }
    expect(errorMessage).not.toBe('body is not a string');
});