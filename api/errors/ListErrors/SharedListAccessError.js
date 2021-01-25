const APIError = require('../APIError');

class SharedListAccessError extends APIError {
    constructor() {
        super(
            'SharedListAccessError',
            'Vous ne pouvez pas accéder à votre propre liste partagée'
        );
    }
}

module.exports = SharedListAccessError;
