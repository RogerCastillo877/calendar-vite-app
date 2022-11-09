import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { store } from "../../../src/store";

describe('should test <FabDelete />', () => {

  test('should display the component correctly', () => {

    render(
      <Provider store={ store }>
        <FabDelete />
      </Provider>
    );
    
  });
})