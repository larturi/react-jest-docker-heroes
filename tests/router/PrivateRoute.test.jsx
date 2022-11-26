import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth"
import { PrivateRoute } from "../../src/router/PrivateRoute"

describe('Tests in <PrivateRoute/>', () => {
  
    test('should show the children if is authenticate ', () => {

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                name: 'Juan',
                id: '123'
            }
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        // screen.debug()

        expect(screen.getByText("Ruta Privada")).toBeTruthy()
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/search?q=batman")
    })


})