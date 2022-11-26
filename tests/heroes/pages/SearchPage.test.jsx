import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { SearchPage } from  "../../../src/heroes/pages/SearchPage"

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate
}))

describe('Tests in <SearchPage />', () => {

    beforeEach(() => jest.clearAllMocks() )
  
    test('should show with default values', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )

        expect(container).toMatchSnapshot()
    })

    test('should show Batman and the input with queryString value', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )

        // screen.debug()

        const input = screen.getByRole('textbox')
        expect(input.value).toBe("batman")

        const img = screen.getByRole('img')
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg')

        const alert = screen.getByLabelText('alert-danger')
        expect(alert.style.display).toBe("none")
    })

    test('should show error if the hero is not found', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batmanNotFound']}>
                <SearchPage />
            </MemoryRouter>
        )

        const alert = screen.getByLabelText('alert-danger')
        expect(alert.style.display).toBe("")
    })

    test('should call the navigate to the new page', () => {

        const inputValue = "superman"

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target:  { name: 'searchText', value: inputValue } })

        const form = screen.getByRole('form')
        fireEvent.submit(form)

        expect(mockedUsedNavigate).toHaveBeenCalledWith(`?q=${inputValue}`)

    })

})