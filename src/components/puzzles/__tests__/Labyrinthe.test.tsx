import { render, screen, fireEvent } from '@testing-library/react';
import { Labyrinthe } from '../Labyrinthe';

describe('Labyrinthe', () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
  });

  it('renders the component correctly', () => {
    render(<Labyrinthe onSuccess={mockOnSuccess} />);
    
    expect(screen.getByText('L\'Ordre des Couleurs')).toBeInTheDocument();
    expect(screen.getByText('rouge')).toBeInTheDocument();
    expect(screen.getByText('bleu')).toBeInTheDocument();
    expect(screen.getByText('vert')).toBeInTheDocument();
    expect(screen.getByText('jaune')).toBeInTheDocument();
  });

  it('shows error message for incorrect sequence', () => {
    render(<Labyrinthe onSuccess={mockOnSuccess} />);
    
    // Click colors in wrong order
    fireEvent.click(screen.getByText('bleu'));
    fireEvent.click(screen.getByText('rouge'));
    fireEvent.click(screen.getByText('jaune'));
    fireEvent.click(screen.getByText('vert'));

    expect(screen.getByText('Séquence incorrecte. Essayez encore.')).toBeInTheDocument();
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('calls onSuccess for correct sequence', () => {
    render(<Labyrinthe onSuccess={mockOnSuccess} />);
    
    // Click colors in correct order
    fireEvent.click(screen.getByText('rouge'));
    fireEvent.click(screen.getByText('bleu'));
    fireEvent.click(screen.getByText('vert'));
    fireEvent.click(screen.getByText('jaune'));

    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it('displays current sequence', () => {
    render(<Labyrinthe onSuccess={mockOnSuccess} />);
    
    fireEvent.click(screen.getByText('rouge'));
    fireEvent.click(screen.getByText('bleu'));

    expect(screen.getByText('Séquence actuelle : rouge → bleu')).toBeInTheDocument();
  });
}); 