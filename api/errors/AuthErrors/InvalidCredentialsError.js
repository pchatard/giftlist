const APIError = require('./APIError');

class InvalidCredentialsError extends APIError {
    constructor() {
        super('InvalidCredentialsError', 'Invalid password or email');
    }
}

module.exports = InvalidCredentialsError;
