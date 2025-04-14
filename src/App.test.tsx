import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Importar userEvent
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Precisamos do provider
import { act } from 'react';

// Mock para os hooks customizados e contexto, se necessário
vi.mock('./modules/git/hooks/useGit', () => ({
  useGit: () => ({ gitState: { currentBranch: 'master' } })
}));

vi.mock('./modules/git/hooks/useChallenge', () => ({
  useChallenge: () => ({
    challenge: { 
      id: '1', 
      name: 'Test Challenge', 
      description: '...', 
      status: 'pending', 
      objectives: []
    },
    getCurrentHint: () => 'Dica de teste',
    getNextHint: vi.fn(),
  })
}));

// Mock para componentes filhos complexos
vi.mock('./modules/shared/components/Terminal', () => ({
  Terminal: () => <div data-testid="mock-terminal">Terminal Mock</div>
}));

// Ajustar mock WorldView para capturar props
const mockOnWorldSelect = vi.fn();
vi.mock('./modules/worlds/components/WorldView', () => ({
  WorldView: (props: { onWorldSelect: (world: any) => void }) => {
    // Salvar a função passada para podermos chamá-la no teste
    mockOnWorldSelect.mockImplementation(props.onWorldSelect);
    return <div data-testid="mock-worldview">WorldView Mock</div>;
  }
}));

vi.mock('./modules/shared/components/WorldsBlog', () => ({
  WorldsBlog: () => <div data-testid="mock-worldsblog">WorldsBlog Mock</div>
}));
vi.mock('./modules/shared/components/Project', () => ({
  Project: () => <div data-testid="mock-project">Project Mock</div>
}));

// Ajustar mock WorldDetailsModal para capturar props
const mockOnEnterWorld = vi.fn();
vi.mock('./modules/shared/components/WorldDetailsModal', () => ({
  WorldDetailsModal: (props: { onEnter: () => void; onClose: () => void; world: any }) => {
    // Salvar a função onEnter passada
    mockOnEnterWorld.mockImplementation(props.onEnter);
    // Ainda precisamos retornar algo para ser encontrado no teste
    return <div data-testid="mock-worlddetailsmodal">WorldDetailsModal Mock</div>
  }
}));

// Adicionar mock para MissionsGallery
vi.mock('./modules/shared/components/MissionsGallery', () => ({
  MissionsGallery: () => <div data-testid="mock-missionsgallery">MissionsGallery Mock</div>
}));

// Adicionar mocks para LoginButton e UserProfile
vi.mock('./modules/auth', async (importOriginal) => {
    try {
        const actual = await importOriginal() as object; // Importar módulo original
        return {
          ...actual, // Preservar outros exports (como AuthProvider)
          LoginButton: () => <div data-testid="mock-loginbutton">Login Mock</div>,
        };
    } catch (e) {
        // Fallback se o módulo não tiver exports (improvável aqui)
        return {
            LoginButton: () => <div data-testid="mock-loginbutton">Login Mock</div>,
        }
    }
  });
vi.mock('./modules/shared/components/UserProfile', () => ({
  UserProfile: () => <div data-testid="mock-userprofile">UserProfile Mock</div>,
}));

describe('App', () => {
  it('should render the main title', () => {
    // Renderiza o App dentro do AuthProvider
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    // Verifica se o título "Git Adventure" está no header (role="banner")
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument(); // Garante que o header foi encontrado
    expect(within(header).getByText(/Git Adventure/i)).toBeInTheDocument(); // Busca o texto dentro do header

    // Opcional: Verifica se um dos mocks está presente
    expect(screen.getByTestId('mock-worldview')).toBeInTheDocument();
  });

  // Novo teste para seleção de mundo
  it('should show world details modal when a world is selected', () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    // Estado inicial: WorldView visível, Modal não
    expect(screen.getByTestId('mock-worldview')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-worlddetailsmodal')).not.toBeInTheDocument();

    // Simular a chamada de onWorldSelect pelo WorldView mockado
    const sampleWorld = { id: 'w1', name: 'Mundo Teste', description: 'Desc Teste' }; 
    // Chamamos a função que salvamos no mock do WorldView
    act(() => {
        mockOnWorldSelect(sampleWorld);
    });
    

    // Verificar se o modal apareceu
    expect(screen.getByTestId('mock-worlddetailsmodal')).toBeInTheDocument();
    // WorldView ainda deve estar presente (modal sobrepõe)
    expect(screen.getByTestId('mock-worldview')).toBeInTheDocument();
  });

  // Novo teste para entrar no mundo
  it('should switch to missions view when entering a world from modal', () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    // 1. Abrir o modal (simulando seleção de mundo)
    const sampleWorld = { id: 'w1', name: 'Mundo Teste', description: 'Desc Teste' }; 
    act(() => {
        mockOnWorldSelect(sampleWorld);
    });
    expect(screen.getByTestId('mock-worlddetailsmodal')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-missionsgallery')).not.toBeInTheDocument();

    // 2. Simular a chamada de onEnter pelo Modal mockado
    act(() => {
        mockOnEnterWorld(); // Chama a função onEnter capturada
    });

    // 3. Verificar resultado: modal fechado, MissionsGallery visível, WorldView escondido
    expect(screen.queryByTestId('mock-worlddetailsmodal')).not.toBeInTheDocument();
    expect(screen.getByTestId('mock-missionsgallery')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-worldview')).not.toBeInTheDocument();
  });

  it('should switch to the Blog view when Blog button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    // Estado inicial
    const header = screen.getByRole('banner');
    expect(screen.getByTestId('mock-worldview')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-worldsblog')).not.toBeInTheDocument();

    // Encontrar botão Blog no header
    const blogButton = within(header).getByRole('button', { name: /Blog/i });

    // Clicar no botão Blog
    await user.click(blogButton);

    // Verificar se APENAS WorldsBlog está visível (devido ao early return)
    await screen.findByTestId('mock-worldsblog'); // Esperar o blog aparecer
    expect(screen.getByTestId('mock-worldsblog')).toBeInTheDocument();

    // Verificar se os outros elementos principais desapareceram
    expect(screen.queryByRole('banner')).not.toBeInTheDocument(); // Header some
    expect(screen.queryByTestId('mock-worldview')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-project')).not.toBeInTheDocument();

    // Remover as tentativas de clicar em "Projeto" e "Início" a partir daqui,
    // pois o header não está mais presente nesta view.
  });

  // Adicionar um novo teste para a aba Projeto (similar ao Blog)
  it('should switch to the Project view when Projeto button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    // Estado inicial
    const header = screen.getByRole('banner');
    expect(screen.getByTestId('mock-worldview')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-project')).not.toBeInTheDocument();

    // Encontrar botão Projeto no header
    const projectButton = within(header).getByRole('button', { name: /Projeto/i });

    // Clicar no botão Projeto
    await user.click(projectButton);

    // Verificar se APENAS Project está visível (devido ao early return)
    await screen.findByTestId('mock-project'); // Esperar o projeto aparecer
    expect(screen.getByTestId('mock-project')).toBeInTheDocument();

    // Verificar se os outros elementos principais desapareceram
    expect(screen.queryByRole('banner')).not.toBeInTheDocument(); // Header some
    expect(screen.queryByTestId('mock-worldview')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-worldsblog')).not.toBeInTheDocument();
  });
}); 