import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Navbar from "./Navbar"

// Create a mock for react-router-dom
vi.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  MemoryRouter: ({ children }) => <div>{children}</div>
}))

describe('Navbar component', () => {
    it('renders without crashing', () => {
        render(<Navbar cartItemCount={0} onCartClick={() => {}} />)
        
        // Check that the brand is displayed
        expect(screen.getByText("Odin Shop")).toBeInTheDocument()
        
        // Check that navigation links exist
        expect(screen.getByText("Home")).toBeInTheDocument()
        expect(screen.getByText("Shop")).toBeInTheDocument()
        
        // Check that the cart button is displayed
        expect(screen.getByText("Cart")).toBeInTheDocument()
        expect(screen.queryByText("0")).not.toBeInTheDocument() // No count shown when 0
    })

    it('displays cart count when items are in cart', () => {
        render(<Navbar cartItemCount={5} onCartClick={() => {}} />)
        
        expect(screen.getByText("5")).toBeInTheDocument()
    })

    it('calls onCartClick when cart button is clicked', async () => {
        const mockOnCartClick = vi.fn()
        const user = userEvent.setup()
        
        render(<Navbar cartItemCount={3} onCartClick={mockOnCartClick} />)
        
        await user.click(screen.getByText("Cart"))
        expect(mockOnCartClick).toHaveBeenCalledTimes(1)
    })
})
