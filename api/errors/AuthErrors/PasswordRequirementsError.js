const APIError = require('../APIError');

class PasswordRequirementsError extends APIError {
    constructor() {
        super(
            'PasswordRequirementsError',
            'Le mot de passe ne remplit pas les critères'
        );
    }
}

module.exports = PasswordRequirementsError;
