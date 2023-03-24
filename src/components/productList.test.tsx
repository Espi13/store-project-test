import React from 'react';
import { render, screen, within } from '@testing-library/react';
import ProductsList from './ProductsList';
import Product from '../models/Product';
import ProductItem from './productItem';

const mockProducts: Product[] = [
  {
    id: 1,
    product_name: 'Product 1',
    price: 10,
    discount: 5,
    image: 'http://dummyimage.com/4110x1623.png/dddddd/000000',
  },
  {
    id: 2,
    product_name: 'Product 2',
    price: 30,
    discount: 10,
    image: 'http://dummyimage.com/4110x1623.png/dddddd/000000',
  },
];

const mockProductsWithoutDiscount: Product[] = [
  {
    id: 1,
    product_name: 'Product 1',
    price: 10,
    discount: null,
    image: 'http://dummyimage.com/4110x1623.png/dddddd/000000',
  },
  {
    id: 2,
    product_name: 'Product 2',
    price: 30,
    discount: null,
    image: 'http://dummyimage.com/4110x1623.png/dddddd/000000',
  },
];

describe('ProductsList', () => {
  it('renders the correct number of ProductItems', () => {
    render(<ProductsList products={mockProducts} numColumnsPerItem={3} />);
    const productsRows = within(screen.getByTestId('products')).getAllByTestId('product-item');

    expect(productsRows).toHaveLength(2);
  });

  it('renders the name, price, discount and image of each product with discount', () => {
    render(<ProductsList products={mockProducts} numColumnsPerItem={3} />);
    for (const product of mockProducts) {
      const product_name = screen.getByText(product.product_name);
      const price = screen.getByText(product.price + ' €');
      const discount = screen.getByText(
        ((product.price * (100 - product.discount)) / 100).toFixed(2) +
          ' € (-' +
          product.discount +
          '%)',
      );
      const image = screen.getByRole('img', { name: product.product_name });

      expect(product_name).toBeInTheDocument();
      expect(price).toBeInTheDocument();
      expect(discount).toBeInTheDocument();
      expect(image).toBeInTheDocument();
    }
  });

  it('renders the name, price and image of each product without discount', () => {
    render(<ProductsList products={mockProductsWithoutDiscount} numColumnsPerItem={3} />);
    for (const product of mockProductsWithoutDiscount) {
      const product_name = screen.getByText(product.product_name);
      const price = screen.getByText(product.price + ' €');
      const discount = screen.queryByText(
        ((product.price * (100 - product.discount)) / 100).toFixed(2) +
          ' € (-' +
          product.discount +
          '%)',
      );
      const image = screen.getByRole('img', { name: product.product_name });

      expect(product_name).toBeInTheDocument();
      expect(price).toBeInTheDocument();
      expect(discount).not.toBeInTheDocument();
      expect(image).toBeInTheDocument();
    }
  });
});
