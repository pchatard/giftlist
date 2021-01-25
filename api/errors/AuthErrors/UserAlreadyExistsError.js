const APIError = require('../APIError');

class UserAlreadyExistsError extends APIError {
    constructor() {
        super('UserAlreadyExistsError', 'Cet e-mail est déjà utilisé');
    }
}

module.exports = UserAlreadyExistsError;
