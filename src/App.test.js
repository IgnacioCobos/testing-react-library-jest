import { render, screen, fireEvent, buildQueries } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App';

test('button has correct initial color', () => {
  render(<App/>);
  const colorButton = screen.getByRole('button', {name: 'Change to Midnight Blue'});
  
  // expect the background color to be mediumVioletRed
  expect(colorButton).toHaveStyle({backgroundColor: 'MediumVioletRed'});

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be midnightBlue
  expect(colorButton).toHaveStyle({backgroundColor: 'MidnightBlue'});

  // expect the button text to be 'Change to mediumVioletRed'
  expect(colorButton.textContent).toBe('Change to Medium Violet Red');
});

test('initial conditions', () => {
  render(<App/>);

  // check that the buttons starts out enabled
  const colorButton = screen.getByRole('button', {name: 'Change to Midnight Blue'});
  expect(colorButton).toBeEnabled();

  // check that the checkbox start out unchecked
  const checkBox = screen.getByRole('checkbox');
  expect(checkBox).not.toBeChecked();
});

test('Checkbox disables button on first click and enables on second click', () => {
  render(<App/>);
  const checkBox = screen.getByRole('checkbox', {name: 'Disable button'});
  const button = screen.getByRole('button', {disable: false});
  
  expect(button).toBeEnabled();

  // click the button to disable
  fireEvent.click(checkBox);

  // check that the button is disabled after the first checkbox click
  expect(button).toBeDisabled();

  // click the button to enable
  fireEvent.click(checkBox);

  // check that the button is enabled after the second checkbox click
  expect(button).toBeEnabled();
});

test('button turns gray when button is disabled and reverts to mediumVioletRed', () => {
  render(<App/>);
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  const button = screen.getByRole('button', {disabled: false});

  // disable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor: 'gray'});

  // re-enable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor: 'MediumVioletRed'});
});

test('Clicked disabled button has gray background and reverts to midnightBlue', () => {
  render(<App/>);
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  const button = screen.getByRole('button', {disabled: false});

  // change button to blue
  fireEvent.click(button);

  // disable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor: 'gray'});

  // re-enable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor: 'MidnightBlue'});
});

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });
  test('Works for One inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
})