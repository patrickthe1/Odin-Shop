import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "./ProductCard";

describe('ProductCard component', () => {
  // Mock product data
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 19.99,
    description: "This is a test product description",
    images: ["https://example.com/image.jpg"]
  };

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);
    
    // Check that product details are displayed
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Test Product");
  });

  it('handles missing product data gracefully', () => {
    render(<ProductCard product={null} onAddToCart={() => {}} />);
    
    expect(screen.getByText("Product data is missing.")).toBeInTheDocument();
  });

  it('displays default quantity of 1', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);
    
    const quantityInput = screen.getByRole("spinbutton");
    expect(quantityInput).toHaveValue(1);
  });

  it('increments quantity when plus button is clicked', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);
    
    const plusButton = screen.getByText("+");
    const quantityInput = screen.getByRole("spinbutton");
    
    await user.click(plusButton);
    expect(quantityInput).toHaveValue(2);
    
    await user.click(plusButton);
    expect(quantityInput).toHaveValue(3);
  });

  it('decrements quantity when minus button is clicked, but not below 1', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);
    
    const minusButton = screen.getByText("-");
    const plusButton = screen.getByText("+");
    const quantityInput = screen.getByRole("spinbutton");
    
    // First increment to 2
    await user.click(plusButton);
    expect(quantityInput).toHaveValue(2);
    
    // Now decrement back to 1
    await user.click(minusButton);
    expect(quantityInput).toHaveValue(1);
    
    // Try to decrement below 1 (should stay at 1)
    await user.click(minusButton);
    expect(quantityInput).toHaveValue(1);
  });

  it('updates quantity when input value changes', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);
    
    const quantityInput = screen.getByRole("spinbutton");
    
    // More explicit approach to clearing and setting the value
    await user.clear(quantityInput);
    // Pause briefly to ensure the clear operation completes
    await new Promise(r => setTimeout(r, 10));
    await user.type(quantityInput, "5");
    
    expect(quantityInput).toHaveValue(5);
  });

  it('sets quantity to 1 when invalid input is provided', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);
    
    const quantityInput = screen.getByRole("spinbutton");
    
    await user.clear(quantityInput);
    await user.type(quantityInput, "abc");
    
    expect(quantityInput).toHaveValue(1);
  });

  it('calls onAddToCart with correct product and quantity when Add to Cart is clicked', async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();
    
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);
    
    const plusButton = screen.getByText("+");
    await user.click(plusButton);  // Increment to 2
    
    const addToCartButton = screen.getByText("Add to Cart");
    await user.click(addToCartButton);
    
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 2);
  });
});