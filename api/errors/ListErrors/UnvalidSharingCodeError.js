const APIError = require('../APIError');

class UnvalidSharingCodeError extends APIError {
    constructor() {
        super('UnvalidSharingCodeError', 'Unvalid sharing code.');
    }
}

module.exports = UnvalidSharingCodeError;
