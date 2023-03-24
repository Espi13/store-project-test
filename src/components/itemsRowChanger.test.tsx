import { render, screen, fireEvent } from '@testing-library/react';
import ItemsRowChanger from './ItemsRowChanger';
import * as hooks from '../hooks/windowsSize';

describe('ItemsRowChanger', () => {
  const mockOnNumColumnsPerItemChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('add button should be  disabled and remove button enabled with 3 columns per item on large screen ', () => {
    jest.spyOn(hooks, 'useWindowSize').mockReturnValue(1000);

    render(<ItemsRowChanger onNumColumnsPerItemChange={mockOnNumColumnsPerItemChange} />);
    expect(screen.getByRole('button', { name: /remove/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /add/i })).not.toBeEnabled();
    expect(mockOnNumColumnsPerItemChange).toHaveBeenCalledWith(3);
  });

  it('add button should be enabled and remove button disabled with 4 columns per item on large screen when click on remove', () => {
    jest.spyOn(hooks, 'useWindowSize').mockReturnValue(1000);

    render(<ItemsRowChanger onNumColumnsPerItemChange={mockOnNumColumnsPerItemChange} />);
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(screen.getByRole('button', { name: /remove/i })).not.toBeEnabled();
    expect(screen.getByRole('button', { name: /add/i })).toBeEnabled();
    expect(mockOnNumColumnsPerItemChange).toHaveBeenCalledWith(4);
  });

  it('add button should be disabled and remove button enaled with 3 columns per item on small screen', () => {
    jest.spyOn(hooks, 'useWindowSize').mockReturnValue(800);

    render(<ItemsRowChanger onNumColumnsPerItemChange={mockOnNumColumnsPerItemChange} />);
    expect(screen.getByRole('button', { name: /remove/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /add/i })).not.toBeEnabled();
    expect(mockOnNumColumnsPerItemChange).toHaveBeenCalledWith(3);
  });

  it('add button should be enabled and remove button disabled with 6 columns per item on small screen when click on remove', () => {
    jest.spyOn(hooks, 'useWindowSize').mockReturnValue(800);

    render(<ItemsRowChanger onNumColumnsPerItemChange={mockOnNumColumnsPerItemChange} />);
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(screen.getByRole('button', { name: /remove/i })).not.toBeEnabled();
    expect(screen.getByRole('button', { name: /add/i })).toBeEnabled();
    expect(mockOnNumColumnsPerItemChange).toHaveBeenCalledWith(6);
  });
});
