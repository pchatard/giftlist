const APIError = require('./APIError');

class UserAlreadyExistsError extends APIError {
    constructor() {
        super('UserAlreadyExistsError', 'This email is already used.');
    }
}

module.exports = UserAlreadyExistsError;
