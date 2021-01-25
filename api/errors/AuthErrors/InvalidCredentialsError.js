const APIError = require('../APIError');

class InvalidCredentialsError extends APIError {
    constructor() {
        super('InvalidCredentialsError', 'E-mail ou mot de passe incorrects');
    }
}

module.exports = InvalidCredentialsError;
