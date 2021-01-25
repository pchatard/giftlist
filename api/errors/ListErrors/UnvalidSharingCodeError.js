const APIError = require('../APIError');

class UnvalidSharingCodeError extends APIError {
    constructor() {
        super('UnvalidSharingCodeError', 'Code de partage invalide');
    }
}

module.exports = UnvalidSharingCodeError;
