const APIError = require('../APIError');

class ListNameAlreadyUsedError extends APIError {
    constructor() {
        super('ListNameAlreadyUsedError', 'Ce nom est déjà utilisé');
    }
}

module.exports = ListNameAlreadyUsedError;
