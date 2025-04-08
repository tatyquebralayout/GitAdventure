import { useState } from 'react';
import { LoginButton } from './modules/auth';
import { MissionsGrid } from './modules/missions';
import { AchievementsDisplay } from './modules/progress';
import { useAuth } from './context/AuthContext';
import { Github, Globe, BookOpen } from 'lucide-react';
import type { Mission } from './modules/missions/types';
import { sampleMissions } from './modules/missions/data/sampleMissions';

function App() {
  const { authState } = useAuth();
  const [activeTab, setActiveTab] = useState<'missions' | 'achievements' | 'about'>('missions');
  const [selectedWorldId, setSelectedWorldId] = useState<string>('world-1');
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const handleMissionSelect = (mission: Mission) => {
    setSelectedMission(mission);
  };

  return (
    <div className="min-h-screen bg-github-dark">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-stars opacity-70 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-dark pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-glow opacity-50 pointer-events-none" />
      
      <header className="bg-github-darker/80 border-b border-github-border sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Github className="w-8 h-8 text-github-accent" />
              <span className="text-github-text-primary text-xl font-semibold">Git Adventure</span>
            </div>
            <nav className="flex-1 mx-8">
              <ul className="flex gap-8 justify-center">
                <li>
                  <button
                    onClick={() => setActiveTab('missions')}
                    className={`text-github-text-primary hover:text-github-accent transition-colors duration-200 text-sm font-medium flex items-center gap-2 ${
                      activeTab === 'missions' ? 'text-github-accent' : ''
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    Missões
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('achievements')}
                    className={`text-github-text-primary hover:text-github-accent transition-colors duration-200 text-sm font-medium flex items-center gap-2 ${
                      activeTab === 'achievements' ? 'text-github-accent' : ''
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    Conquistas
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`text-github-text-primary hover:text-github-accent transition-colors duration-200 text-sm font-medium flex items-center gap-2 ${
                      activeTab === 'about' ? 'text-github-accent' : ''
                    }`}
                  >
                    <Github className="w-4 h-4" />
                    Sobre
                  </button>
                </li>
              </ul>
            </nav>
            <LoginButton size="sm" />
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-4 py-8">
        {activeTab === 'missions' && (
          <div className="space-y-8">
            <div className="bg-github-darker/80 rounded-lg border border-github-border p-6 backdrop-blur-sm shadow-github-heavy">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-github-text-primary text-xl font-semibold">
                  Missões: Fundamentos do Git
                </h2>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedWorldId('world-1')}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      selectedWorldId === 'world-1' 
                        ? 'bg-github-accent text-white' 
                        : 'bg-github-border/20 text-github-text-secondary hover:bg-github-border/30'
                    }`}
                  >
                    Mundo 1
                  </button>
                  <button 
                    onClick={() => setSelectedWorldId('world-2')}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      selectedWorldId === 'world-2' 
                        ? 'bg-github-accent text-white' 
                        : 'bg-github-border/20 text-github-text-secondary hover:bg-github-border/30'
                    }`}
                  >
                    Mundo 2
                  </button>
                </div>
              </div>
              
              <MissionsGrid 
                worldId={selectedWorldId} 
                onSelectMission={handleMissionSelect} 
              />
            </div>
            
            {selectedMission && (
              <div className="bg-github-darker/80 rounded-lg border border-github-border p-6 backdrop-blur-sm shadow-github-heavy">
                <h3 className="text-github-text-primary text-lg font-semibold mb-4">
                  {selectedMission.title}
                </h3>
                <p className="text-github-text-secondary mb-4">
                  {selectedMission.description}
                </p>
                
                <div className="border-t border-github-border pt-4">
                  <h4 className="text-github-text-primary font-medium mb-2">Requisitos da Missão:</h4>
                  <ul className="space-y-2">
                    {selectedMission.requirements.map((req) => (
                      <li key={req.id} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-github-border/30 flex items-center justify-center text-xs mt-0.5">
                          {req.id.split('-')[1]}
                        </span>
                        <span className="text-github-text-secondary">{req.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t border-github-border mt-4 pt-4">
                  <h4 className="text-github-text-primary font-medium mb-2">Dicas:</h4>
                  <ul className="space-y-2">
                    {selectedMission.hints.map((hint) => (
                      <li key={hint.id} className="text-github-text-secondary">
                        {hint.text}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6">
                  <button className="px-4 py-2 bg-github-accent text-white rounded-md font-medium hover:bg-github-accent/90 transition-colors">
                    {selectedMission.status === 'available' ? 'Iniciar Missão' : 
                     selectedMission.status === 'in_progress' ? 'Continuar Missão' : 
                     'Revisar Missão'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'achievements' && (
          <div className="bg-github-darker/80 rounded-lg border border-github-border p-6 backdrop-blur-sm shadow-github-heavy">
            <h2 className="text-github-text-primary text-xl font-semibold mb-6">
              Suas Conquistas
            </h2>
            
            <AchievementsDisplay />
          </div>
        )}
        
        {activeTab === 'about' && (
          <div className="bg-github-darker/80 rounded-lg border border-github-border p-6 backdrop-blur-sm shadow-github-heavy">
            <h2 className="text-github-text-primary text-xl font-semibold mb-6">
              Sobre o Git Adventure
            </h2>
            
            <div className="prose prose-invert max-w-none">
              <p>
                Git Adventure é uma plataforma educacional gamificada que transforma o aprendizado do Git em uma experiência envolvente e divertida. 
                Através de uma interface intuitiva e desafios práticos, os usuários podem aprender e praticar conceitos do Git de forma interativa.
              </p>
              
              <h3>Como Funciona</h3>
              <ol>
                <li>Faça login com sua conta GitHub</li>
                <li>Explore os mundos temáticos do Git</li>
                <li>Complete missões práticas e ganhe conquistas</li>
                <li>Acompanhe seu progresso e evolua suas habilidades</li>
              </ol>
              
              <h3>Tecnologias</h3>
              <ul>
                <li>React para a interface de usuário</li>
                <li>TypeScript para tipagem estática</li>
                <li>Tailwind CSS para estilização</li>
                <li>Integração com API do GitHub</li>
              </ul>
              
              <p className="mt-8">
                <strong>Versão:</strong> MVP 1.0
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-github-darker border-t border-github-border py-8 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <p className="text-github-text-secondary text-sm">
            © 2024 Git Adventure. Feito com 💙 por{' '}
            <a
              href="https://github.com/tatyquebralayout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-github-accent hover:underline"
            >
              Tatiana Quebra Layout
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;