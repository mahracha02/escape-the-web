import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CodeSecret } from '../CodeSecret';

describe('CodeSecret', () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the component correctly', () => {
    render(<CodeSecret onSuccess={mockOnSuccess} />);
    
    expect(screen.getByText('Le Coffre-Fort Numérique')).toBeInTheDocument();
    expect(screen.getByText('Voir l\'indice')).toBeInTheDocument();
    expect(screen.getByText('Valider')).toBeInTheDocument();
  });

  it('shows error message for incorrect code', () => {
    render(<CodeSecret onSuccess={mockOnSuccess} />);
    
    // Entrer un code incorrect
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('Valider'));

    expect(screen.getByText('Code incorrect. Essayez encore.')).toBeInTheDocument();
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('calls onSuccess for correct code (1337)', async () => {
    render(<CodeSecret onSuccess={mockOnSuccess} />);
    
    // Entrer le code correct
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('7'));
    fireEvent.click(screen.getByText('Valider'));

    // Vérifier que le coffre s'ouvre
    expect(screen.getByText('Succès !')).toBeInTheDocument();

    // Avancer le temps pour simuler les délais
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it('increments attempts counter and shows failure after 3 attempts', () => {
    render(<CodeSecret onSuccess={mockOnSuccess} />);
    
    // Premier essai incorrect
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('Valider'));
    expect(screen.getByText('Tentatives : 1/3')).toBeInTheDocument();

    // Deuxième essai incorrect
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('6'));
    fireEvent.click(screen.getByText('7'));
    fireEvent.click(screen.getByText('8'));
    fireEvent.click(screen.getByText('Valider'));
    expect(screen.getByText('Tentatives : 2/3')).toBeInTheDocument();

    // Troisième essai incorrect
    fireEvent.click(screen.getByText('9'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('Valider'));
    expect(screen.getByText('Tentatives : 3/3')).toBeInTheDocument();
    expect(screen.getByText('Échec !')).toBeInTheDocument();
  });

  it('shows and hides hint modal', () => {
    render(<CodeSecret onSuccess={mockOnSuccess} />);
    
    // Ouvrir l'indice
    fireEvent.click(screen.getByText('Voir l\'indice'));
    expect(screen.getByText('Le code est une représentation numérique du mot "LEET".')).toBeInTheDocument();

    // Fermer l'indice
    fireEvent.click(screen.getByText('Fermer'));
    expect(screen.queryByText('Le code est une représentation numérique du mot "LEET".')).not.toBeInTheDocument();
  });

  it('handles keyboard input correctly', () => {
    render(<CodeSecret onSuccess={mockOnSuccess} />);
    
    // Tester la saisie de chiffres
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('4'));
    expect(screen.getByText('1234')).toBeInTheDocument();

    // Tester le bouton de suppression
    fireEvent.click(screen.getByText('←'));
    expect(screen.getByText('123')).toBeInTheDocument();

    // Tester le bouton de réinitialisation
    fireEvent.click(screen.getByText('C'));
    expect(screen.queryByText('123')).not.toBeInTheDocument();
  });

  it('disables input after success or failure', () => {
    render(<CodeSecret onSuccess={mockOnSuccess} />);
    
    // Simuler un échec
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('Valider'));
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('6'));
    fireEvent.click(screen.getByText('7'));
    fireEvent.click(screen.getByText('8'));
    fireEvent.click(screen.getByText('Valider'));
    fireEvent.click(screen.getByText('9'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('Valider'));

    // Vérifier que les boutons sont désactivés
    expect(screen.getByText('Valider')).toBeDisabled();
    expect(screen.getByText('1')).toBeDisabled();
    expect(screen.getByText('C')).toBeDisabled();
    expect(screen.getByText('←')).toBeDisabled();
  });
}); 