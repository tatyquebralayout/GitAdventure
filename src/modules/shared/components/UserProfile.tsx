import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';
import { Users, Star, GitFork, BookMarked, Trophy, LogIn, User } from 'lucide-react';
import type { AuthUser } from '../../auth/types';

interface GitHubProfile {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface UserProfileProps {
  user?: AuthUser | null;
  isAuthenticated?: boolean;
}

export function UserProfile({ user, isAuthenticated = false }: UserProfileProps) {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Se não houver usuário autenticado, buscamos o perfil da Tatiana (apenas para demonstração)
  useEffect(() => {
    if (isAuthenticated && user) {
      // Se o usuário estiver autenticado, usamos os dados da autenticação
      return;
    }

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const octokit = new Octokit();
        const { data } = await octokit.users.getByUsername({
          username: 'tatyquebralayout'
        });
        
        setProfile({
          name: data.name || data.login,
          login: data.login,
          avatar_url: data.avatar_url,
          bio: data.bio || '',
          public_repos: data.public_repos,
          followers: data.followers,
          following: data.following
        });
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, user]);

  const handleLogin = () => {
    // Isso seria substituído pelo fluxo real de autenticação
    console.log('Iniciando fluxo de login com GitHub...');
  };

  // Se o usuário estiver autenticado, mostramos o perfil dele
  if (isAuthenticated && user) {
    return (
      <div className="bg-github-darker/80 rounded-lg border border-github-border p-6 backdrop-blur-sm shadow-github-heavy">
        <h3 className="text-github-text-primary text-lg font-semibold mb-4">
          Seu Perfil
        </h3>
        
        <div className="flex items-center gap-4">
          <img 
            src={user.avatarUrl} 
            alt={user.displayName || user.username}
            className="w-16 h-16 rounded-full border-2 border-github-border"
          />
          <div>
            <p className="text-github-text-primary font-medium">{user.displayName || user.username}</p>
            <p className="text-github-text-secondary text-sm">@{user.username}</p>
          </div>
        </div>
        
        <div className="mt-6 border-t border-github-border pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-github-border/10 rounded-md p-4 text-center">
              <span className="text-github-text-primary font-bold text-xl">0</span>
              <p className="text-github-text-secondary text-sm">Missões Concluídas</p>
            </div>
            <div className="bg-github-border/10 rounded-md p-4 text-center">
              <span className="text-github-text-primary font-bold text-xl">0</span>
              <p className="text-github-text-secondary text-sm">Conquistas</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Se não houver perfil ou autenticação, mostramos a opção de login
  if (!profile) {
    return (
      <div className="bg-github-darker/80 rounded-lg border border-github-border p-6 backdrop-blur-sm shadow-github-heavy">
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

  // Se houver perfil mas não autenticação, mostramos o perfil da Tatiana
  return (
    <div className="bg-github-darker rounded-lg border border-github-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-github-accent" />
          <h3 className="text-github-text-primary font-semibold">Perfil do Desenvolvedor</h3>
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <img 
          src={profile.avatar_url} 
          alt={profile.name} 
          className="w-16 h-16 rounded-full border border-github-border"
        />
        <div>
          <h4 className="text-github-text-primary font-medium mb-1">{profile.name}</h4>
          <p className="text-github-text-secondary text-sm mb-2">@{profile.login}</p>
          <p className="text-github-text-secondary text-sm">{profile.bio}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="flex items-center gap-2 text-github-text-secondary text-sm">
          <Star className="w-4 h-4" />
          <span>0 estrelas recebidas</span>
        </div>
        <div className="flex items-center gap-2 text-github-text-secondary text-sm">
          <GitFork className="w-4 h-4" />
          <span>{profile.public_repos} repositórios</span>
        </div>
        <div className="flex items-center gap-2 text-github-text-secondary text-sm">
          <BookMarked className="w-4 h-4" />
          <span>{profile.followers} seguidores</span>
        </div>
        <div className="flex items-center gap-2 text-github-text-secondary text-sm">
          <Trophy className="w-4 h-4" />
          <span>0 conquistas</span>
        </div>
      </div>
    </div>
  );
}