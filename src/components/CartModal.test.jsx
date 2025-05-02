import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartModal from "./CartModal";

describe('CartModal component', () => {
  // Mock cart items
  const mockCartItems = [
    {
      id: 1,
      title: "Test Product 1",
      price: 19.99,
      images: ["https://example.com/image1.jpg"],
      quantity: 2
    },
    {
      id: 2,
      title: "Test Product 2",
      price: 29.99,
      images: ["https://example.com/image2.jpg"],
      quantity: 1
    }
  ];

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <CartModal isOpen={false} onClose={() => {}} cartItems={mockCartItems} />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('renders modal content when isOpen is true', () => {
    render(<CartModal isOpen={true} onClose={() => {}} cartItems={mockCartItems} />);
    
    expect(screen.getByText("Your Cart")).toBeInTheDocument();
    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();
  });

  it('renders empty cart message when no items', () => {
    render(<CartModal isOpen={true} onClose={() => {}} cartItems={[]} />);
    
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  it('displays product details correctly', () => {
    render(<CartModal isOpen={true} onClose={() => {}} cartItems={mockCartItems} />);
    
    // Check product titles
    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();
    
    // Check quantities
    expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 1")).toBeInTheDocument();
    
    // Check prices
    expect(screen.getByText("Price: $19.99")).toBeInTheDocument();
    expect(screen.getByText("Price: $29.99")).toBeInTheDocument();
  });

  it('calculates and displays the total price correctly', () => {
    render(<CartModal isOpen={true} onClose={() => {}} cartItems={mockCartItems} />);
    
    // Total should be 19.99 * 2 + 29.99 * 1 = $69.97
    expect(screen.getByText("Total: $69.97")).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const mockClose = vi.fn();
    const user = userEvent.setup();
    
    render(<CartModal isOpen={true} onClose={mockClose} cartItems={mockCartItems} />);
    
    const closeButton = screen.getByLabelText("Close cart modal");
    await user.click(closeButton);
    
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking the overlay', async () => {
    const mockClose = vi.fn();
    const user = userEvent.setup();
    
    render(<CartModal isOpen={true} onClose={mockClose} cartItems={mockCartItems} />);
    
    // Get the overlay div (first element with the modalOverlay class)
    const overlay = screen.getByText("Your Cart").parentElement.parentElement;
    await user.click(overlay);
    
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside the modal content', async () => {
    const mockClose = vi.fn();
    const user = userEvent.setup();
    
    render(<CartModal isOpen={true} onClose={mockClose} cartItems={mockCartItems} />);
    
    // Click on the modal content (should not close)
    await user.click(screen.getByText("Your Cart"));
    
    expect(mockClose).not.toHaveBeenCalled();
  });

  it('disables checkout button when cart is empty', () => {
    render(<CartModal isOpen={true} onClose={() => {}} cartItems={[]} />);
    
    const checkoutButton = screen.getByText("Proceed to Checkout");
    expect(checkoutButton).toBeDisabled();
  });

  it('enables checkout button when cart has items', () => {
    render(<CartModal isOpen={true} onClose={() => {}} cartItems={mockCartItems} />);
    
    const checkoutButton = screen.getByText("Proceed to Checkout");
    expect(checkoutButton).not.toBeDisabled();
  });
});