import { render, screen } from '@testing-library/react';
import ProductItem from './ProductItem';

describe('ProductItem', () => {
  const mockProduct = {
    product_name: 'Test Product',
    price: 20,
    discount: 10,
    image: 'http://dummyimage.com/4110x1623.png/dddddd/000000',
    onClick: jest.fn(),
  };

  it('should render correctly with discount', () => {
    render(<ProductItem {...mockProduct} />);
    expect(screen.getByText(mockProduct.product_name)).toBeInTheDocument();
    expect(screen.getByText(`${mockProduct.price} €`)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${((mockProduct.price * (100 - mockProduct.discount)) / 100).toFixed(2)} € (-${
          mockProduct.discount
        }%)`,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('mas colores')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /añadir/i })).toBeInTheDocument();
  });

  it('should render correctly without discount', () => {
    const productWithoutDiscount = { ...mockProduct, discount: null };
    render(<ProductItem {...productWithoutDiscount} />);
    expect(screen.getByText(productWithoutDiscount.product_name)).toBeInTheDocument();
    expect(screen.getByText(`${productWithoutDiscount.price} €`)).toBeInTheDocument();
    expect(
      screen.queryByText(
        `${((productWithoutDiscount.price * (100 - productWithoutDiscount.discount)) / 100).toFixed(
          2,
        )} € (-${productWithoutDiscount.discount}%)`,
      ),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('mas colores')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /añadir/i })).toBeInTheDocument();
  });
});
