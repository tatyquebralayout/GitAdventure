# Script de deploy para o Git Adventure
# Este script automatiza o push para o branch master e a atualização do GitHub Pages

Write-Host "🚀 Iniciando processo de deploy do Git Adventure" -ForegroundColor Cyan

# Verificando o branch atual
$currentBranch = git rev-parse --abbrev-ref HEAD
if ($currentBranch -ne "master") {
    Write-Host "❌ Você precisa estar no branch master para fazer o deploy." -ForegroundColor Red
    Write-Host "   Use 'git checkout master' e tente novamente." -ForegroundColor Yellow
    exit 1
}

# Verificando se há alterações não commitadas
$status = git status --porcelain
if ($status) {
    Write-Host "⚠️ Você tem alterações não commitadas:" -ForegroundColor Yellow
    git status --short
    
    $confirm = Read-Host "Deseja fazer commit dessas alterações? (s/n)"
    if ($confirm -eq "s" -or $confirm -eq "S") {
        $message = Read-Host "Digite a mensagem de commit"
        git add .
        git commit -m $message
        Write-Host "✅ Alterações commitadas com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "❌ Deploy cancelado. Faça o commit das alterações manualmente." -ForegroundColor Red
        exit 1
    }
}

# Fazendo push para o repositório remoto
Write-Host "📤 Enviando alterações para o repositório remoto..." -ForegroundColor Cyan
git push origin master
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer push para o repositório remoto." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Alterações enviadas com sucesso para o branch master!" -ForegroundColor Green

# Atualizando o branch gh-pages
Write-Host "🔄 Atualizando o GitHub Pages..." -ForegroundColor Cyan

# Salvando arquivos da pasta docs
Write-Host "📦 Salvando arquivos do GitHub Pages..." -ForegroundColor Cyan
$tempDir = Join-Path $env:TEMP "git-adventure-docs-$(Get-Random)"
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
Copy-Item -Path "docs/*" -Destination $tempDir -Recurse -Force

# Mudando para o branch gh-pages
git checkout gh-pages
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao mudar para o branch gh-pages." -ForegroundColor Red
    exit 1
}

# Atualizando arquivos - agora copiando para a raiz em vez da pasta docs
Write-Host "📝 Atualizando arquivos do GitHub Pages..." -ForegroundColor Cyan

# Preservando o arquivo .nojekyll e o index.html de redirecionamento na raiz
$preserveTempDir = Join-Path $env:TEMP "git-adventure-preserve-$(Get-Random)"
New-Item -ItemType Directory -Path $preserveTempDir -Force | Out-Null

if (Test-Path ".nojekyll") {
    Copy-Item -Path ".nojekyll" -Destination $preserveTempDir -Force
}

if (Test-Path "index.html") {
    Copy-Item -Path "index.html" -Destination $preserveTempDir -Force
}

# Removendo arquivos da pasta docs
Remove-Item -Path "docs/*" -Recurse -Force -ErrorAction SilentlyContinue

# Copiando os novos arquivos para a raiz
Copy-Item -Path "$tempDir/*" -Destination "./" -Recurse -Force

# Restaurando os arquivos preservados
if (Test-Path "$preserveTempDir/.nojekyll") {
    Copy-Item -Path "$preserveTempDir/.nojekyll" -Destination "./" -Force
}

# Criando um novo index.html na raiz que redireciona para a versão correta
$indexContent = @"
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="0;url=index.html">
  <title>Git Adventure - Aprenda Git de forma interativa</title>
</head>
<body>
  <p>Redirecionando para <a href="index.html">Git Adventure</a>...</p>
</body>
</html>
"@

Set-Content -Path "index.html" -Value $indexContent

# Garantindo que o arquivo .nojekyll existe
"" | Set-Content -Path ".nojekyll"

# Commitando alterações
git add .
$deployMessage = "Update GitHub Pages (root): $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git commit -m $deployMessage
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Nenhuma alteração detectada no GitHub Pages." -ForegroundColor Yellow
} else {
    # Enviando para o repositório remoto
    git push origin gh-pages
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erro ao fazer push do GitHub Pages." -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ GitHub Pages atualizado com sucesso!" -ForegroundColor Green
}

# Voltando para o branch master
git checkout master

# Limpando diretório temporário
Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path $preserveTempDir -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "🎉 Deploy concluído com sucesso!" -ForegroundColor Green
Write-Host "   O site está disponível em: https://tatyquebralayout.github.io/GitAdventure/" -ForegroundColor Cyan 