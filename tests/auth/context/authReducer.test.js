import { authReducer, types } from "../../../src/auth"

describe('Tests in authReducer.js', () => {

    test('should show the default state', () => {
        const state = authReducer({ logged: false }, {})
        expect(state).toEqual({ logged: false })
    })

    test('should call login(), authenticate, and set the user', () => {
        const action = {
            type: types.login,
            payload: {
                name: 'Juan',
                id: '123'
            }
        }

        const state = authReducer({ logged: false }, action)
        expect(state).toEqual({
            logged: true,
            user: action.payload
        })
    })

    test('should call logout(), set logged in false, and set the user in null', () => {
        
        const state = {
            logged: true,
            user: { name: 'Juan', id: '123' }
        }

        const action = { type: types.logout }

        const newState = authReducer(state, action)

        expect(newState).toEqual({
            logged: false,
        })
    })
    
});