import { render, screen, fireEvent } from '@testing-library/react';
import { MotDePasse } from '../MotDePasse';

describe('MotDePasse', () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
  });

  it('renders the component correctly', () => {
    render(<MotDePasse onSuccess={mockOnSuccess} />);
    
    expect(screen.getByText('Le Mot Caché')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Entrez le mot de passe')).toBeInTheDocument();
    expect(screen.getByText('Valider')).toBeInTheDocument();
  });

  it('shows error message for incorrect password', () => {
    render(<MotDePasse onSuccess={mockOnSuccess} />);
    
    const input = screen.getByPlaceholderText('Entrez le mot de passe');
    const submitButton = screen.getByText('Valider');

    fireEvent.change(input, { target: { value: 'wrong' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Ce n\'est pas le bon mot de passe. Essayez encore.')).toBeInTheDocument();
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('calls onSuccess for correct password', () => {
    render(<MotDePasse onSuccess={mockOnSuccess} />);
    
    const input = screen.getByPlaceholderText('Entrez le mot de passe');
    const submitButton = screen.getByText('Valider');

    fireEvent.change(input, { target: { value: 'escape' } });
    fireEvent.click(submitButton);

    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it('toggles hint visibility', () => {
    render(<MotDePasse onSuccess={mockOnSuccess} />);
    
    const hintButton = screen.getByText('Voir un indice');
    fireEvent.click(hintButton);
    
    expect(screen.getByText('Masquer l\'indice')).toBeInTheDocument();
    expect(screen.getByText('Pensez à ce que vous devez faire pour sortir d\'ici...')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Masquer l\'indice'));
    expect(screen.getByText('Voir un indice')).toBeInTheDocument();
  });
}); 