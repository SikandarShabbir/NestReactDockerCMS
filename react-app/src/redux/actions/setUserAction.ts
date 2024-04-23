
export const setUser = (user: User) => {
    return {
        type: 'SET_USER',
        user
    }
}

class User {
    constructor(
        public id: number,
        public first_name: string,
        public last_name: string,
        public email: string,
        public created_at: string
    ) {
    }
}