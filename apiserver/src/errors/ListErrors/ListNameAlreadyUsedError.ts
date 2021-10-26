import APIError from '../APIError';

class ListNameAlreadyUsedError extends APIError {
    constructor() {
        super('ListNameAlreadyUsedError', 'Ce nom est déjà utilisé');
    }
}

export default ListNameAlreadyUsedError;
