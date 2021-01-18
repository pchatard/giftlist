const APIError = require('../APIError');

class ListNameAlreadyUsedError extends APIError {
    constructor() {
        super('ListNameAlreadyUsedError', 'List name is already used');
    }
}

module.exports = ListNameAlreadyUsedError;
