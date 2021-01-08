const { verifyPassword } = require('./authenticate');

test("verifyPassword('abcd') returns false", () => {
    expect(verifyPassword('abcd')).toBeFalsy();
});
