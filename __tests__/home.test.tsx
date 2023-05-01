import { render, fireEvent, waitFor } from '@testing-library/react';
import Home from '../src/pages/translate';

describe('Home', () => {
  it('should update the language select and input text fields', async () => {
    const { getByTestId } = render(<Home />);
    const languageSelect = getByTestId('language-select') as HTMLSelectElement;
    const inputText = getByTestId('input-text') as HTMLTextAreaElement;
    
    fireEvent.change(languageSelect, { target: { value: 'Spanish' } });
    fireEvent.change(inputText, { target: { value: 'Hola' } });
    
    expect(languageSelect.value).toBe('Spanish');
    expect(inputText.value).toBe('Hola');
  });

  it('should translate the text when the Translate button is clicked', async () => {
    const { getByTestId } = render(<Home />);

    const languageSelect = getByTestId('language-select') as HTMLSelectElement;
    const inputText = getByTestId('input-text') as HTMLTextAreaElement;
    const translateButton = getByTestId('translate-btn') as HTMLButtonElement;
    
    fireEvent.change(inputText, { target: { value: 'une chaise' } });
    fireEvent.change(languageSelect, { target: { value: 'Italian' } });
    fireEvent.click(translateButton);
    
    const outputText = getByTestId('output-text') as HTMLTextAreaElement;
    
    await waitFor(() => expect(outputText.value).toBe('una sedia'));
  });
});
