import { Github } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface LoginButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function LoginButton({ className = '', variant = 'primary', size = 'md' }: LoginButtonProps) {
  const { authState, login, logout } = useAuth();
  const { isAuthenticated, isLoading, user } = authState;

  const baseStyles = "flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-github-accent/40";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2.5"
  };

  const variantStyles = {
    primary: "bg-github-accent text-white hover:bg-github-accent/90 shadow-sm",
    secondary: "bg-github-border/20 text-github-text-primary hover:bg-github-border/30 shadow-github"
  };

  const handleClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      <Github className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'} />
      {isLoading ? (
        <span>Carregando...</span>
      ) : isAuthenticated ? (
        <span>Sair ({user?.username})</span>
      ) : (
        <span>Entrar com GitHub</span>
      )}
    </button>
  );
} 