
export const setUserReducer = (state = {user: new User()}, action: {type: string, user: User}) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}

class User {
    constructor(
        public id: number = 0,
        public first_name: string = '',
        public last_name: string = '',
        public email: string = '',
        public created_at: string = ''
    ) {
    }
}