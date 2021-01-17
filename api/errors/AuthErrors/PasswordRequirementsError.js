const APIError = require('../APIError');

class PasswordRequirementsError extends APIError {
    constructor() {
        super(
            'PasswordRequirementsError',
            'Password does not match requirements'
        );
    }
}

module.exports = PasswordRequirementsError;
