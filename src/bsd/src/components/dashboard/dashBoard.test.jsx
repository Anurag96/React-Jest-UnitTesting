import {render,screen} from '@testing-library/react'
import DashBoard from './dashBoard';
jest.mock("./appCard")

describe("Tests for Dashboard", () => {
    test("Should render page card", () => {
        // Assert
        //render(<DashBoard title='File Comparison Tool'/>)

        // const textValue = screen.getByText("File Comparison Tool")
        expect("File Comparison Tool").toBeInTheDocument();
    });
});
