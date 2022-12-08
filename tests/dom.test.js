import { it, expect, describe, vi, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { Window } from 'happy-dom';
import { showError } from '../util/dom.js';

//to mock dome add to package.json --environment happy-dom

const htmlDocPath  = path.join(process.cwd(), 'index.html');
const htmlDocContent = fs.readFileSync(htmlDocPath).toString();
const window = new Window();
const document = window.document;

vi.stubGlobal('document', document);


describe('showError', () => {
    beforeEach(() => {
        //reset document:
        document.body.innerHTML = '';
        document.write(htmlDocContent);        
    })

    it('should show add p element with error message to the div with id=errors', () => {
        showError('test error message');
        const errorContainerElement = document.getElementById('errors');
        //const errorMessageElement = errorContainerElement.querySelector('p');
        const errorMessageElement = errorContainerElement.firstElementChild;
        //expect(errorMessageElement.textContent).toBe('test error message');
        expect(errorMessageElement).not.toBeNull();
    });

    it('should not contain error paragraph initially', () => {        
        const errorContainerElement = document.getElementById('errors');        
        const errorMessageElement = errorContainerElement.firstElementChild;
        expect(errorMessageElement).toBeNull();
    
    });

    it('should output provided error message to the paragraph', () => {
        const testMessage = 'test error message';
        showError(testMessage);
        const errorContainerElement = document.getElementById('errors');
        const errorMessageElement = errorContainerElement.firstElementChild;
        expect(errorMessageElement.textContent).toBe(testMessage);
    });

});