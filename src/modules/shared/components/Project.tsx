import React from 'react';
import { Github, Globe, Target, BookOpen, Star, Heart, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';

export function Project() {
  return (
    <div className="min-h-screen bg-github-dark">
      <header className="bg-github-darker/80 border-b border-github-border/50 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Github className="w-8 h-8 text-github-accent" />
              <span className="text-github-text-primary text-xl font-semibold">Git Adventure</span>
            </div>
            <nav>
              <ul className="flex gap-8">
                <li>
                  <a
                    href="/"
                    className="text-github-text-primary hover:text-white transition-colors duration-200 text-sm font-medium flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    Início
                  </a>
                </li>
                <li>
                  <a
                    href="/missions"
                    className="text-github-text-primary hover:text-white transition-colors duration-200 text-sm font-medium flex items-center gap-2"
                  >
                    <Target className="w-4 h-4" />
                    Missões
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="text-github-text-primary hover:text-white transition-colors duration-200 text-sm font-medium flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/project"
                    className="text-white transition-colors duration-200 text-sm font-medium flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    Projeto
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Project Header */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-github-text-primary mb-6">
                Git Adventure
              </h1>
              <p className="text-xl text-github-text-secondary max-w-2xl mx-auto">
                Uma jornada interativa para aprender Git através de desafios práticos e missões envolventes
              </p>
            </div>

            {/* Author Section */}
            <div className="bg-github-darker border border-github-border rounded-lg p-8 mb-12">
              <div className="flex items-center gap-8">
                <img
                  src="https://github.com/tatyquebralayout.png"
                  alt="Tatiana Quebra Layout"
                  className="w-32 h-32 rounded-full border-4 border-github-accent"
                />
                <div>
                  <h2 className="text-2xl font-bold text-github-text-primary mb-2">
                    Tatiana Quebra Layout
                  </h2>
                  <p className="text-github-text-secondary mb-4">
                    Desenvolvedora Front-end apaixonada por criar experiências interativas e educacionais. 
                    Criadora do Git Adventure, um projeto dedicado a tornar o aprendizado do Git mais 
                    acessível e divertido para todos.
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/tatyquebralayout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-github-text-secondary hover:text-github-accent transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://twitter.com/tatyquebralayout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-github-text-secondary hover:text-github-accent transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href="https://linkedin.com/in/tatyquebralayout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-github-text-secondary hover:text-github-accent transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="https://tatyquebralayout.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-github-text-secondary hover:text-github-accent transition-colors"
                    >
                      <LinkIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Section */}
            <div className="grid grid-cols-2 gap-8 mb-12">
              {/* GitHub Stars */}
              <div className="bg-github-darker border border-github-border rounded-lg p-8 text-center">
                <Star className="w-12 h-12 text-github-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold text-github-text-primary mb-4">
                  Apoie com uma Estrela
                </h3>
                <p className="text-github-text-secondary mb-6">
                  Se você gostou do projeto, considere dar uma estrela no GitHub
                </p>
                <a
                  href="https://github.com/tatyquebralayout/git-adventure"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-github-accent hover:bg-github-accent/90 text-white rounded-md transition-colors"
                >
                  <Star className="w-4 h-4" />
                  <span>Dar Estrela</span>
                </a>
              </div>

              {/* Sponsor */}
              <div className="bg-github-darker border border-github-border rounded-lg p-8 text-center">
                <Heart className="w-12 h-12 text-github-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold text-github-text-primary mb-4">
                  Torne-se um Sponsor
                </h3>
                <p className="text-github-text-secondary mb-6">
                  Ajude a manter o projeto vivo tornando-se um sponsor no GitHub
                </p>
                <a
                  href="https://github.com/sponsors/tatyquebralayout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-github-accent hover:bg-github-accent/90 text-white rounded-md transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  <span>Sponsor</span>
                </a>
              </div>
            </div>

            {/* Project Features */}
            <div className="bg-github-darker border border-github-border rounded-lg p-8">
              <h3 className="text-2xl font-bold text-github-text-primary mb-6">
                Sobre o Projeto
              </h3>
              <div className="space-y-4 text-github-text-secondary">
                <p>
                  O Git Adventure é um projeto educacional que transforma o aprendizado 
                  do Git em uma experiência gamificada e interativa. Através de missões 
                  práticas e desafios envolventes, os usuários podem aprender e praticar 
                  conceitos do Git de forma divertida e eficiente.
                </p>
                <p>
                  O projeto é open source e foi criado com React, TypeScript e Tailwind CSS, 
                  utilizando as melhores práticas de desenvolvimento e design moderno.
                </p>
                <p>
                  Contribuições são bem-vindas! Se você tem interesse em melhorar o Git Adventure, 
                  visite nosso repositório no GitHub.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}