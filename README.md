# Git Adventure 🚀

Uma jornada interativa para aprender Git através de desafios práticos e missões envolventes.

![Git Adventure Preview](https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80)

## 🌟 Sobre o Projeto

Git Adventure é uma plataforma educacional gamificada que transforma o aprendizado do Git em uma experiência envolvente e divertida. Através de uma interface intuitiva e desafios práticos, os usuários podem aprender e praticar conceitos do Git de forma interativa.

### ✨ Características

- 🎮 Experiência gamificada de aprendizado
- 🌍 Interface inspirada no GitHub Stars
- 📚 Tutoriais interativos e práticos
- 🏆 Sistema de conquistas e progressão
- 💻 Terminal Git integrado para prática
- 📱 Design responsivo e moderno
- 🔐 Autenticação com GitHub OAuth
- 🏅 Sistema de progressão com níveis e conquistas
- 🧩 Missões organizadas por dificuldade e mundos temáticos

## 🛠️ Tecnologias

- **React** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Vite** - Build tool e dev server
- **Lucide React** - Biblioteca de ícones
- **Octokit** - SDK oficial do GitHub
- **OAuth** - Para autenticação com GitHub
- **Tailwind Scrollbar** - Para personalização de barras de rolagem

## 🚀 Começando

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/tatyquebralayout/git-adventure.git
```

2. Instale as dependências
```bash
cd git-adventure
npm install
```

3. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

## 🌍 Estrutura do Projeto

```
git-adventure/
├── src/
│   ├── modules/           # Módulos da aplicação
│   │   ├── auth/         # Módulo de autenticação OAuth
│   │   ├── blog/         # Módulo do blog
│   │   ├── git/          # Módulo do Git
│   │   ├── missions/     # Módulo de missões e desafios
│   │   ├── progress/     # Módulo de progresso e conquistas
│   │   ├── project/      # Módulo do projeto
│   │   ├── shared/       # Componentes e utilitários compartilhados
│   │   └── worlds/       # Módulo dos mundos
│   ├── context/          # Contextos React (AuthContext)
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Ponto de entrada
├── public/               # Arquivos estáticos
└── package.json         # Configurações e dependências
```

## 📋 Módulos Principais

### 🔐 Módulo de Autenticação
O módulo de autenticação permite que os usuários façam login usando suas contas do GitHub através de OAuth, possibilitando:
- Rastreamento de progresso personalizado
- Missões específicas baseadas no perfil do usuário
- Armazenamento de conquistas e progresso

### 🎯 Módulo de Missões
Contém a estrutura para gerenciar missões práticas de Git, incluindo:
- Definição de missões com dificuldade progressiva
- Requisitos específicos para completar cada missão
- Sistema de validação de comandos Git
- Dicas e orientações para cada missão

### 📊 Módulo de Progresso
Gerencia o progresso do usuário na plataforma:
- Rastreamento de missões completadas
- Sistema de conquistas desbloqueáveis
- Níveis de experiência com base nas atividades
- Visualização de histórico de aprendizado

## 🎯 Mundos e Desafios

O Git Adventure é organizado em mundos temáticos, cada um focando em diferentes aspectos do Git:

1. **Fundamentos do Git**
   - Inicialização de repositório
   - Comandos básicos
   - Staging e commits

2. **Mundo das Branches**
   - Criação e gerenciamento de branches
   - Merge e resolução de conflitos
   - Estratégias de branching

3. **Universo Remoto**
   - Trabalho com repositórios remotos
   - Colaboração em equipe
   - Pull requests e code review

## 👥 Contribuindo

Contribuições são sempre bem-vindas! Veja como você pode ajudar:

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Suporte

- Dê uma estrela ⭐️ ao projeto
- Torne-se um [sponsor no GitHub](https://github.com/sponsors/tatyquebralayout)
- Siga a [@tatyquebralayout](https://github.com/tatyquebralayout) no GitHub

## 📬 Contato

Tatiana Quebra Layout - [@tatyquebralayout](https://twitter.com/tatyquebralayout)

Link do Projeto: [https://github.com/tatyquebralayout/GitAdventure](https://github.com/tatyquebralayout/GitAdventure)