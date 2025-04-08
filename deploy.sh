#!/bin/bash

# Script de deploy para o Git Adventure
# Este script automatiza o push para o branch master e a atualização do GitHub Pages

echo -e "\033[0;36m🚀 Iniciando processo de deploy do Git Adventure\033[0m"

# Verificando o branch atual
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "master" ]; then
    echo -e "\033[0;31m❌ Você precisa estar no branch master para fazer o deploy.\033[0m"
    echo -e "\033[0;33m   Use 'git checkout master' e tente novamente.\033[0m"
    exit 1
fi

# Verificando se há alterações não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo -e "\033[0;33m⚠️ Você tem alterações não commitadas:\033[0m"
    git status --short
    
    read -p "Deseja fazer commit dessas alterações? (s/n) " confirm
    if [[ "$confirm" == "s" || "$confirm" == "S" ]]; then
        read -p "Digite a mensagem de commit: " message
        git add .
        git commit -m "$message"
        echo -e "\033[0;32m✅ Alterações commitadas com sucesso!\033[0m"
    else
        echo -e "\033[0;31m❌ Deploy cancelado. Faça o commit das alterações manualmente.\033[0m"
        exit 1
    fi
fi

# Fazendo push para o repositório remoto
echo -e "\033[0;36m📤 Enviando alterações para o repositório remoto...\033[0m"
git push origin master
if [ $? -ne 0 ]; then
    echo -e "\033[0;31m❌ Erro ao fazer push para o repositório remoto.\033[0m"
    exit 1
fi
echo -e "\033[0;32m✅ Alterações enviadas com sucesso para o branch master!\033[0m"

# Atualizando o branch gh-pages
echo -e "\033[0;36m🔄 Atualizando o GitHub Pages...\033[0m"

# Salvando arquivos da pasta docs
echo -e "\033[0;36m📦 Salvando arquivos do GitHub Pages...\033[0m"
temp_dir=$(mktemp -d)
cp -R docs/* "$temp_dir"

# Mudando para o branch gh-pages
git checkout gh-pages
if [ $? -ne 0 ]; then
    echo -e "\033[0;31m❌ Erro ao mudar para o branch gh-pages.\033[0m"
    exit 1
fi

# Atualizando arquivos
echo -e "\033[0;36m📝 Atualizando arquivos do GitHub Pages...\033[0m"
rm -rf docs/*
mkdir -p docs
cp -R "$temp_dir"/* docs/

# Commitando alterações
git add docs/
deploy_message="Update GitHub Pages: $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$deploy_message"
if [ $? -ne 0 ]; then
    echo -e "\033[0;33m⚠️ Nenhuma alteração detectada no GitHub Pages.\033[0m"
else
    # Enviando para o repositório remoto
    git push origin gh-pages
    if [ $? -ne 0 ]; then
        echo -e "\033[0;31m❌ Erro ao fazer push do GitHub Pages.\033[0m"
        exit 1
    fi
    echo -e "\033[0;32m✅ GitHub Pages atualizado com sucesso!\033[0m"
fi

# Voltando para o branch master
git checkout master

# Limpando diretório temporário
rm -rf "$temp_dir"

echo -e "\033[0;32m🎉 Deploy concluído com sucesso!\033[0m"
echo -e "\033[0;36m   O site está disponível em: https://tatyquebralayout.github.io/GitAdventure/\033[0m" 