const APIError = require('../APIError');

class SharedListAccessError extends APIError {
    constructor() {
        super(
            'SharedListAccessError',
            'User cannot access its own shared list.'
        );
    }
}

module.exports = SharedListAccessError;
