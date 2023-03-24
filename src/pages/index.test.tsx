import { fireEvent, render, screen } from '@testing-library/react';
import Product from 'models/Product';
import ProductPage, { getStaticProps } from './';

const mockProducts: Product[] = [
  {
    id: 1,
    product_name: 'Product 1',
    price: 10,
    discount: 5,
    image: 'http://dummyimage.com/3315x3575.png/cc0000/ffffff',
  },
  {
    id: 2,
    product_name: 'Product 2',
    price: 20,
    discount: null,
    image: 'http://dummyimage.com/3315x3575.png/cc0000/ffffff',
  },
  {
    id: 3,
    product_name: 'Product 3',
    price: 30,
    discount: null,
    image: 'http://dummyimage.com/3315x3575.png/cc0000/ffffff',
  },
];

describe('Start Product page', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProducts),
      }),
    );
  });

  it('getStaticProps return the correct list of products', async () => {
    const { props } = await getStaticProps();
    expect(props.products).toEqual(mockProducts);
  });

  it('renders searchInput component', async () => {
    const { container } = render(<ProductPage products={[]} />);
    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('filters the products when searching for a term', async () => {
    render(<ProductPage products={mockProducts} />);
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'Product 1' } });
    const product1 = screen.getByText('Product 1');
    const product2 = screen.queryByText('Product 2');
    const product3 = screen.queryByText('Product 3');
    expect(product1).toBeInTheDocument();
    expect(product2).not.toBeInTheDocument();
    expect(product3).not.toBeInTheDocument();
  });

  it('renders the ItemsRowChanger component', async () => {
    render(<ProductPage products={[]} />);
    const itemRowRemoveButton = screen.getByRole('button', { name: /remove/i });
    const itemRowAddButton = screen.getByRole('button', { name: /add/i });

    expect(itemRowRemoveButton).toBeInTheDocument();
    expect(itemRowAddButton).toBeInTheDocument();
  });

  it('changes the number of columns per item when selecting a different value', async () => {
    render(<ProductPage products={mockProducts} />);
    const itemRowRemoveButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(itemRowRemoveButton);
    const productsContainer = screen.queryAllByTestId('product-item');
    expect(productsContainer).toHaveLength(3);
    for (const product of productsContainer) {
      expect(product).toHaveClass('MuiGrid-grid-md-4');
    }
  });
});
