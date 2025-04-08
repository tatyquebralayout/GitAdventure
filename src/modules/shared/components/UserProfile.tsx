import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';
import { Users, Star, GitFork, BookMarked, Trophy, LogIn } from 'lucide-react';

interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export function UserProfile() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // In a real application, you would implement proper OAuth flow
    // For demo purposes, we'll use a mock profile
    setIsLoading(true);
    try {
      const octokit = new Octokit();
      const { data } = await octokit.users.getByUsername({
        username: 'octocat'  // This is just an example, replace with actual OAuth flow
      });
      
      setProfile({
        login: data.login,
        name: data.name || data.login,
        avatar_url: data.avatar_url,
        bio: data.bio || '',
        public_repos: data.public_repos,
        followers: data.followers,
        following: data.following
      });
    } catch (error) {
      console.error('Failed to fetch GitHub profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="bg-github-darker rounded-lg border border-github-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-github-accent" />
            <h3 className="text-github-text-primary font-semibold">Perfil do Desenvolvedor</h3>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-16 h-16 bg-[#161b22] rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-github-text-secondary" />
          </div>
          <p className="text-github-text-secondary mb-4">
            Conecte-se com o GitHub para acompanhar seu progresso
          </p>
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-github-accent hover:bg-github-accent/90 text-white rounded-md transition-colors duration-200"
          >
            <LogIn className="w-4 h-4" />
            <span>{isLoading ? 'Conectando...' : 'Conectar com GitHub'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-github-darker rounded-lg border border-github-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-github-accent" />
          <h3 className="text-github-text-primary font-semibold">Perfil do Desenvolvedor</h3>
        </div>
      </div>

      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-github-border">
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1">
          <h4 className="text-github-text-primary font-semibold text-lg">{profile.name}</h4>
          <p className="text-github-text-secondary text-sm mb-4">{profile.login}</p>
          
          {profile.bio && (
            <p className="text-github-text-primary text-sm mb-4">{profile.bio}</p>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-github-text-secondary">
              <BookMarked className="w-4 h-4" />
              <span className="text-sm">{profile.public_repos} repositórios</span>
            </div>
            <div className="flex items-center gap-2 text-github-text-secondary">
              <Users className="w-4 h-4" />
              <span className="text-sm">{profile.followers} seguidores</span>
            </div>
            <div className="flex items-center gap-2 text-github-text-secondary">
              <Star className="w-4 h-4" />
              <span className="text-sm">{profile.following} seguindo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-github-border">
        <h4 className="text-github-text-primary font-medium mb-4">Progresso no Git Adventure</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#161b22] rounded-lg p-4 border border-github-border">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-github-accent" />
              <span className="text-github-text-primary text-sm font-medium">Conquistas</span>
            </div>
            <p className="text-2xl font-bold text-github-text-primary">3</p>
          </div>
          <div className="bg-[#161b22] rounded-lg p-4 border border-github-border">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-github-accent" />
              <span className="text-github-text-primary text-sm font-medium">Desafios</span>
            </div>
            <p className="text-2xl font-bold text-github-text-primary">12</p>
          </div>
          <div className="bg-[#161b22] rounded-lg p-4 border border-github-border">
            <div className="flex items-center gap-2 mb-2">
              <GitFork className="w-4 h-4 text-github-accent" />
              <span className="text-github-text-primary text-sm font-medium">Nível</span>
            </div>
            <p className="text-2xl font-bold text-github-text-primary">5</p>
          </div>
        </div>
      </div>
    </div>
  );
}