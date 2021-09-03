import init from './initialStates/userInit'
import { USER_LOGOUT, USER_LOGIN } from './actions/userActions'

function userReducer(state = init, action) {
    switch (action.type) {
        case USER_LOGOUT: 
            return { logged: false}

        case USER_LOGIN:
            return { logged: true }

        default: return state
    }
}

export default userReducer