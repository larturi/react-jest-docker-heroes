const { render, screen } = require( "@testing-library/react" )
const { MemoryRouter, Route, Routes } = require( "react-router-dom" )
const { AuthContext } = require( "../../src/auth" )
const { PublicRoute } = require( "../../src/router/PublicRoute" )

describe('Tests in <PublicRoute />', () => {
  
    test('should show the children if is not authenticate ', () => {
        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Ruta Publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )

        // screen.debug()

        expect(screen.getByText("Ruta Publica")).toBeTruthy()
    })


    test('should to navigate if is authenticate', () => {
        const contextValue = {
            logged: true,
            user: {
                name: 'John',
                id: '123',
            }
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Ruta Publica</h1>
                            </PublicRoute>
                        }/>
                        <Route path='marvel' element={<h1>Marvel Page</h1>}/>
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText("Marvel Page")).toBeTruthy()
    })

})