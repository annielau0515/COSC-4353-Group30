const app = require('../LoginModule/login')
const assert = require('assert');

const lodash = require('lodash');

const util = require('util'); // node 9.0.0 or later

describe('function', () => {
  const a = {a: _in => _in};
  const b = {a: _in => _in};

  test('lodash', () => {
    expect(lodash.isEqual(a, b)).toBe(false);
  });
  test('jest', () => {
    expect(a).not.toEqual(b);
  });
  test('node', () => {
    expect(util.isDeepStrictEqual(a, b)).toBe(false);
  });

});
/*
describe('Testing dom', () => {
  it('Should has login texts', () => {
      screen.queryAllByText('Login').map(text => expect(text).toBeInTheDocument());
  })
      screen
          .queryAllByText('Login')
          .map(text => expect(text).toBeInTheDocument());
  });

  it('Should has loginName label text', () => {
      expect(screen.getByLabelText('loginName:')).toBeInTheDocument();
  })


  it('Should has password label text', () => {
      expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  });


describe('Login Page', function() {
    it('should let you log in', function() {
        app.url('./');
        app.setValue('input[name="login"]', 'abc123');
        app.setValue('input[name="pwd"]', 'xyz789');
        app.click('.input=Log In');

        const pageUrl = app.getUrl();
        assert.notEqual(pageUrl, 'http://testyourlog.in/example/');
        assert.equal(pageUrl, 'http://testyourlog.in/example/login.html?login=abc123&pwd=xyz789')
    })
})

test('login succeed', () => {
    const text = app('Max', '1234');
    expect(text).toEqual('Max (1234)')
})
*/

