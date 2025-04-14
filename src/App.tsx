import { useState } from 'react';
import { WorldView } from './modules/worlds/components/WorldView';
import { DialogueBox } from './modules/shared/components/DialogueBox';
import { Terminal } from './modules/shared/components/Terminal';
import { ProgressSection } from './modules/shared/components/ProgressSection';
import { StorytellingSection } from './modules/shared/components/StorytellingSection';
import { UserProfile } from './modules/shared/components/UserProfile';
import { WorldDetailsModal } from './modules/shared/components/WorldDetailsModal';
import { MissionsGallery } from './modules/shared/components/MissionsGallery';
import { WorldsBlog } from './modules/shared/components/WorldsBlog';
import { Project } from './modules/shared/components/Project';
import { useGit } from './modules/git/hooks/useGit';
import { useChallenge } from './modules/git/hooks/useChallenge';
import { Github, Globe, BookOpen, Target, Heart, Star } from 'lucide-react';
import type { World } from './modules/worlds/types';
import { sampleWorlds } from './modules/worlds/data/sampleData';
import { LoginButton } from './modules/auth';
import { useAuth } from './context/AuthContext';

function App() {
  const { authState } = useAuth();
  const [activeTab, setActiveTab] = useState<'universe' | 'missions' | 'blog' | 'project'>('universe');
  const [selectedWorld, setSelectedWorld] = useState<World | null>(null);
  const [showWorldDetails, setShowWorldDetails] = useState(false);
  const { gitState } = useGit();
  const { challenge, getCurrentHint, getNextHint } = useChallenge();
  const [terminalOutput, setTerminalOutput] = useState('');

  const handleCommand = (command: string) => {
    setTerminalOutput(prev => `${prev}\n$ ${command}`);
  };

  const handleStart = () => {
    console.log('Starting challenge...');
  };

  const handleWorldSelect = (worldId: string) => {
    const world = sampleWorlds.find(w => w.id === worldId);
    if (world) {
      setSelectedWorld(world);
      setShowWorldDetails(true);
    }
  };

  const handleEnterWorld = () => {
    setShowWorldDetails(false);
    setActiveTab('missions');
  };

  const sampleStories = [
    {
      id: '1',
      title: 'O Início da Jornada',
      content: 'Sua aventura no mundo do Git começa aqui...',
      isCompleted: false
    },
    {
      id: '2',
      title: 'Descobrindo Branches',
      content: 'Um novo poder se revela: as branches...',
      isCompleted: false
    }
  ];

  if (activeTab === 'blog') {
    return <WorldsBlog />;
  }

  if (activeTab === 'project') {
    return <Project />;
  }

  return (
    <div className="min-h-screen bg-github-dark">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-stars opacity-70 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-dark pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-glow opacity-50 pointer-events-none" />
      
      {showWorldDetails && selectedWorld && (
        <WorldDetailsModal
          world={selectedWorld}
          onClose={() => setShowWorldDetails(false)}
          onEnter={handleEnterWorld}
        />
      )}
      
      <header className="bg-github-darker/80 border-b border-github-border sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Github className="w-8 h-8 text-github-accent" />
              <span className="text-github-text-primary text-xl font-semibold">Git Adventure</span>
            </div>
            <nav>
              <ul className="flex gap-8">
                <li>
                  <button
                    onClick={() => setActiveTab('universe')}
                    className={`text-github-text-primary hover:text-github-accent transition-colors duration-200 text-sm font-medium flex items-center gap-2 ${
                      activeTab === 'universe' ? 'text-github-accent' : ''
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    Início
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('blog')}
                    className={`text-github-text-primary hover:text-github-accent transition-colors duration-200 text-sm font-medium flex items-center gap-2 ${
                      activeTab === ('blog' as typeof activeTab) ? 'text-github-accent' : ''
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('project')}
                    className={`text-github-text-primary hover:text-github-accent transition-colors duration-200 text-sm font-medium flex items-center gap-2 ${
                      activeTab === ('project' as typeof activeTab) ? 'text-github-accent' : ''
                    }`}
                  >
                    <Github className="w-4 h-4" />
                    Projeto
                  </button>
                </li>
              </ul>
            </nav>
            <LoginButton size="sm" />
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="bg-github-darker/80 rounded-lg border border-github-border p-6 backdrop-blur-sm shadow-github-heavy">
              <h2 className="text-github-text-primary text-xl font-semibold mb-6">
                {activeTab === 'universe' ? 'Explore e desbloqueie os mundos' : `Missões: ${selectedWorld?.name || 'Selecione um Mundo'}`}
              </h2>
              
              <div className="flex border-b border-github-border mb-6">
                <button
                  onClick={() => setActiveTab('universe')}
                  className={`
                    flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200
                    ${activeTab === 'universe'
                      ? 'text-github-text-primary border-b-2 border-github-accent'
                      : 'text-github-text-secondary hover:text-github-text-primary'
                    }
                  `}
                >
                  <Globe className="w-4 h-4" />
                  Universo
                </button>
                <button
                  onClick={() => setActiveTab('missions')}
                  className={`
                    flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200
                    ${activeTab === 'missions'
                      ? 'text-github-text-primary border-b-2 border-github-accent'
                      : 'text-github-text-secondary hover:text-github-text-primary'
                    }
                  `}
                >
                  <Target className="w-4 h-4" />
                  Missões do Mundo
                </button>
              </div>

              {activeTab === 'universe' ? (
                <WorldView
                  worlds={sampleWorlds}
                  onWorldSelect={handleWorldSelect}
                  currentWorld={selectedWorld?.id}
                />
              ) : (
                <MissionsGallery worldId={selectedWorld?.id} />
              )}
            </div>
            
            <DialogueBox
              message={getCurrentHint()}
              character={{
                name: "Professor Octocat",
                avatar: "https://github.githubassets.com/images/modules/logos_page/Octocat.png"
              }}
              onStart={handleStart}
              onHint={getNextHint}
            />

            <ProgressSection challenge={challenge} />

            <StorytellingSection 
              stories={sampleStories}
              currentStory={sampleStories[1]}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <Terminal 
              type="simulation" 
              output={`Status do Repositório:\n${JSON.stringify(gitState, null, 2)}`} 
            />
            <Terminal
              type="interactive"
              onCommand={handleCommand}
              output={terminalOutput}
            />
            <UserProfile user={authState.user} isAuthenticated={authState.isAuthenticated} />
          </div>
        </div>
      </main>

      <footer className="bg-github-darker border-t border-github-border py-12 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Creator Profile */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src="https://github.com/tatyquebralayout.png"
                    alt="Tatiana Quebra Layout"
                    className="w-16 h-16 rounded-full border-2 border-github-border"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-github-text-primary">
                      Tatiana Quebra Layout
                    </h3>
                    <p className="text-github-text-secondary">
                      Criadora do Git Adventure
                    </p>
                  </div>
                </div>
                <p className="text-github-text-secondary">
                  Desenvolvedora apaixonada por criar experiências educacionais interativas 
                  e tornar o aprendizado do Git mais acessível para todos.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/tatyquebralayout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-github-text-secondary hover:text-github-accent transition-colors"
                    title="GitHub Profile"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com/tatyquebralayout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-github-text-secondary hover:text-github-accent transition-colors"
                    title="Website"
                    aria-label="Website"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Support Links */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-github-text-primary">
                    Apoie o Projeto
                  </h4>
                  <div className="flex flex-col gap-4">
                    <a
                      href="https://github.com/tatyquebralayout/GitAdventure"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-github-text-secondary hover:text-github-accent transition-colors"
                    >
                      <Star className="w-5 h-5" />
                      <span>Dê uma estrela no GitHub</span>
                    </a>
                    <a
                      href="https://github.com/sponsors/tatyquebralayout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-github-text-secondary hover:text-github-accent transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      <span>Torne-se um Sponsor</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-github-border text-center">
              <p className="text-github-text-secondary text-sm">
                © 2025 Git Adventure. Feito com 💙 por{' '}
                <a
                  href="https://github.com/tatyquebralayout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-github-accent hover:text-github-accent/90 transition-colors"
                >
                  Tatiana Quebra Layout
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;