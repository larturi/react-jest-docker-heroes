import { types } from "../../../src/auth/types/types"

describe('Tests in "types.js', () => {

    test('should return the types', () => {
        expect(types).toEqual({
            login: '[Auth] Login', 
            logout: '[Auth] Logout' 
        })
    })
    
})