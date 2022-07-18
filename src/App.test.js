import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has correct initial color', () => {
  render(<App/>);
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  
  // expect the background color to be red
  expect(colorButton).toHaveStyle({backgroundColor: 'red'});

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({backgroundColor: 'blue'});

  // expect the button text to be 'Change to red'
  expect(colorButton.textContent).toBe('Change to red');
});

test('initial conditions', () => {
  render(<App/>);

  // check that the buttons starts out enabled
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
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

test('button turns gray when button is disabled and reverts to red', () => {
  render(<App/>);
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  const button = screen.getByRole('button', {disabled: false});

  // disable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor: 'gray'});

  // re-enable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor: 'red'});
});

test('Clicked disabled button has gray background and reverts to blue', () => {
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
  expect(button).toHaveStyle({backgroundColor: 'blue'});
});