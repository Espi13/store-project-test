import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from './seatchInput';

describe('SearchInput', () => {
  it('should render correctly', () => {
    const onSearch = jest.fn();
    render(<SearchInput onSearch={onSearch} />);
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
  });

  it('should call onSearch with the search terms when input value changes', () => {
    const onSearch = jest.fn();
    render(<SearchInput onSearch={onSearch} />);
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(onSearch).toHaveBeenCalled();
    expect(onSearch).toHaveBeenCalledWith('test');
  });
});
