import HomeButton from './HomeButton'
import { screen, render } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
// const mockedNavigator = jest.fn();

// jest.mock("react-router-dom", () => ({
//     ...(jest.requireActual("react-router-dom")),
//     useNavigate: () => mockedNavigator,
// }));

// // test('Rendering Home', () => {
// //     render(<HomeButton />)
// // })

const mockedNavigator = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));


it('should  navigate to a new client page', () => {
    const { result } = renderHook(() => HomeButton());
    act(() => {
        result.current.handleClientChange();
    });
    expect(mockedNavigator).toHaveBeenCalled();
    expect(mockedNavigator).toHaveBeenCalledWith('/homeq')
});

