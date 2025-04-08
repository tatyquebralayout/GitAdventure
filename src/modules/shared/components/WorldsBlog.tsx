import React from 'react';
import { Calendar, User, MessageCircle, Share2, Bookmark, ThumbsUp, Clock, Github, Globe, Target, BookOpen } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  likes: number;
  comments: number;
  image: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Dominando o Git: Uma Jornada pelo Controle de Versão',
    content: 'O Git revolucionou a forma como desenvolvemos software. Neste artigo, exploraremos os conceitos fundamentais e melhores práticas para se tornar um mestre do Git...',
    author: {
      name: 'Professor Octocat',
      avatar: 'https://github.githubassets.com/images/modules/logos_page/Octocat.png'
    },
    date: '2025-03-15',
    readTime: '5 min',
    likes: 128,
    comments: 23,
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb',
    tags: ['Git', 'Tutorial', 'Controle de Versão']
  },
  {
    id: '2',
    title: 'Git Flow: Estratégias de Branching para Times Ágeis',
    content: 'Descubra como o Git Flow pode transformar o fluxo de trabalho da sua equipe. Uma análise profunda das estratégias de branching mais eficientes...',
    author: {
      name: 'Git Master',
      avatar: 'https://github.githubassets.com/images/modules/logos_page/Octocat.png'
    },
    date: '2025-03-14',
    readTime: '7 min',
    likes: 256,
    comments: 45,
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498',
    tags: ['Git Flow', 'Agile', 'Workflow']
  }
];

export function WorldsBlog() {
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
                    className="text-white transition-colors duration-200 text-sm font-medium flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/profile"
                    className="text-github-text-primary hover:text-white transition-colors duration-200 text-sm font-medium"
                  >
                    Perfil
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-github-text-primary mb-4">
                Blog do Git Adventure
              </h1>
              <p className="text-github-text-secondary text-lg">
                Explorando o universo do controle de versão com histórias e tutoriais
              </p>
            </div>

            {/* Blog Posts */}
            <div className="space-y-12">
              {blogPosts.map((post) => (
                <article 
                  key={post.id}
                  className="bg-github-darker border border-github-border rounded-lg overflow-hidden shadow-github-heavy hover:border-github-accent transition-colors duration-300"
                >
                  {/* Featured Image */}
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={`${post.image}?auto=format&fit=crop&w=1200&q=80`}
                      alt={post.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-[#1c2129] text-github-text-secondary rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-github-text-primary mb-4 hover:text-github-accent transition-colors">
                      <a href="#">{post.title}</a>
                    </h2>

                    {/* Meta info */}
                    <div className="flex items-center gap-6 mb-6 text-github-text-secondary text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} de leitura</span>
                      </div>
                    </div>

                    {/* Excerpt */}
                    <p className="text-github-text-secondary mb-6">
                      {post.content}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-6 border-t border-github-border">
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-github-text-secondary hover:text-github-accent transition-colors">
                          <ThumbsUp className="w-5 h-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-github-text-secondary hover:text-github-accent transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="text-github-text-secondary hover:text-github-accent transition-colors">
                          <Bookmark className="w-5 h-5" />
                        </button>
                        <button className="text-github-text-secondary hover:text-github-accent transition-colors">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}