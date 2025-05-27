import { render, screen, fireEvent } from '@testing-library/react';
import { CodeSecret } from '../CodeSecret';

describe('CodeSecret', () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
  });

  it('renders the component correctly', () => {
    render(<CodeSecret onSuccess={mockOnSuccess} />);
    
    expect(screen.getByText('Le Coffre-Fort')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Entrez le code (4 chiffres)')).toBeInTheDocument();
    expect(screen.getByText('Essayer')).toBeInTheDocument();
  });

  it('shows error message for incorrect code', () => {
    render(<CodeSecret onSuccess={mockOnSuccess} />);
    
    const input = screen.getByPlaceholderText('Entrez le code (4 chiffres)');
    const submitButton = screen.getByText('Essayer');

    fireEvent.change(input, { target: { value: '5678' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Code incorrect. Essayez encore.')).toBeInTheDocument();
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('calls onSuccess for correct code', () => {
    render(<CodeSecret onSuccess={mockOnSuccess} />);
    
    const input = screen.getByPlaceholderText('Entrez le code (4 chiffres)');
    const submitButton = screen.getByText('Essayer');

    fireEvent.change(input, { target: { value: '1234' } });
    fireEvent.click(submitButton);

    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it('increments attempts counter', () => {
    render(<CodeSecret onSuccess={mockOnSuccess} />);
    
    const input = screen.getByPlaceholderText('Entrez le code (4 chiffres)');
    const submitButton = screen.getByText('Essayer');

    fireEvent.change(input, { target: { value: '5678' } });
    fireEvent.click(submitButton);
    expect(screen.getByText('Tentatives : 1')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '9012' } });
    fireEvent.click(submitButton);
    expect(screen.getByText('Tentatives : 2')).toBeInTheDocument();
  });
}); 