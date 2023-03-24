import { renderHook, waitFor } from '@testing-library/react';
import { useWindowSize } from './windowsSize';

describe('useWindowSize', () => {
  let originalInnerWidth: number;
  let resizeEvent: Event;
  const mockRemoveEventListener = jest.fn();

  beforeAll(() => {
    originalInnerWidth = window.innerWidth;
    resizeEvent = new Event('resize');
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
  });

  function fireResize(width: number) {
    window.innerWidth = width;
    window.dispatchEvent(resizeEvent);
  }

  it('should return the width of the window', async () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current).toEqual(originalInnerWidth);
    await waitFor(() => {
      fireResize(500);
    });
    expect(result.current).toEqual(500);
  });

  it('should clean up the event listener after the component is unmounted', () => {
    const { unmount } = renderHook(() => useWindowSize());
    const remover = jest
      .spyOn(global, 'removeEventListener')
      .mockImplementationOnce(() => mockRemoveEventListener);
    expect(remover).not.toHaveBeenCalled();
    unmount();
    expect(remover).toHaveBeenCalled();
  });
});
