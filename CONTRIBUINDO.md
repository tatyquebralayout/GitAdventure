# Contribuindo para o Git Adventure

Obrigado pelo seu interesse em contribuir para o Git Adventure! Este documento fornece orientações para contribuir com o projeto.

## Como Contribuir

### Reportando Bugs

1. Verifique se o bug já não foi reportado em issues existentes
2. Use o template de bug report (se disponível)
3. Inclua passos detalhados para reproduzir o problema
4. Informe seu ambiente (sistema operacional, navegador, versão do Node.js)

### Sugerindo Melhorias

1. Descreva claramente a melhoria e seus benefícios
2. Se possível, inclua exemplos ou mockups
3. Explique como essa melhoria se alinha com os objetivos do projeto

### Enviando Pull Requests

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Faça suas alterações seguindo as convenções de código
4. Adicione testes quando apropriado
5. Atualize a documentação se necessário
6. Commit suas mudanças com mensagens descritivas
7. Push para sua branch (`git push origin feature/amazing-feature`)
8. Abra um Pull Request detalhando suas alterações

## Convenções de Código

- Use TypeScript para todos os arquivos de código
- Siga a estrutura modular existente
- Documente componentes, hooks e funções com comentários JSDoc
- Utilize nomes descritivos para variáveis e funções
- Mantenha a consistência com o estilo de código existente

## Estrutura do Projeto

Respeite a estrutura modular do projeto:

```
src/
├── modules/          # Módulos da aplicação
│   ├── [nome-modulo]/
│       ├── components/  # Componentes React
│       ├── hooks/       # Hooks personalizados
│       ├── types/       # Definições de tipos
│       └── index.ts     # Exportações públicas
├── services/         # Serviços compartilhados
├── context/          # Contextos React globais
```

## Testes

- Adicione testes para novas funcionalidades
- Verifique se testes existentes passam antes de enviar um PR
- Atualize testes quando modificar funcionalidades existentes

## Documentação

- Mantenha os README.md dos módulos atualizados
- Atualize a documentação de API quando alterar interfaces
- Adicione comentários claros para código complexo

## Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença MIT do projeto.

---

Esperamos sua contribuição! Se tiver dúvidas, não hesite em abrir uma issue para discussão. 