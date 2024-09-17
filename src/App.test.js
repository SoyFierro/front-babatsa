// App.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

test('should make a POST request when the form is submitted', async () => {
  // Mock the fetch response
  fetch.mockResponseOnce(JSON.stringify({ success: true }));

  render(<App />);

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Producto A' } });
  fireEvent.change(screen.getByLabelText(/marca/i), { target: { value: 'Marca X' } });
  fireEvent.change(screen.getByLabelText(/cantidad/i), { target: { value: '10' } });

  // Submit the form
  fireEvent.click(screen.getByText(/agregar/i));

  // Wait for the response message to appear
  await waitFor(() => expect(screen.getByText(/Producto creado con éxito/i)).toBeInTheDocument());

  // Check if fetch was called with the correct parameters
  expect(fetch).toHaveBeenCalledWith('http://localhost:4500/products/createProduct', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: 'Producto A',
      marca: 'Marca X',
      cantidad: 10
    })
  });
});

