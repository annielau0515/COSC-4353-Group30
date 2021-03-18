/*
const { it } = require('@jest/globals');
const chai = require('chai');
const { describe } = require('yargs');
const expect = chai.expect;

describe('User Test cases', () =>{
    it('should add a new user', () =>{
        console.log('added a new user');
    })
})
*/

const { generateText } = require('./profile');
const { validateInput } = require('./profile');
const { Input } = require('./profile');

test('should output name, address1, address2, city, zip', () => {
    const text = generateText('Max', 'University of Houston', 'downtown', 'Houston', 77023);
    expect(text).toBe('Houston (77023)');
});

test('should output name, address1, address2 correct', () => {
    const text1 = validateInput('Max', 'University of Houston', 'downtown');
    expect(validateInput(text1)).toBe(true);
});

test('should input correct', () => {
    const text3 = Input('abc', '---', '123')
    expect(validateInput(text3)).toBe(true);
});
