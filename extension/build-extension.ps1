# Script de build de l'extension Terminal Orchestrator
Write-Host "🚀 Building Terminal Orchestrator Extension..." -ForegroundColor Green

# Compilation TypeScript
Write-Host "📦 Compiling TypeScript..." -ForegroundColor Yellow
npm run compile

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ TypeScript compilation successful" -ForegroundColor Green
    
    # Création du package VSIX
    Write-Host "📦 Creating VSIX package..." -ForegroundColor Yellow
    npx vsce package --no-dependencies
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "🎉 Extension created successfully!" -ForegroundColor Green
        Get-ChildItem -Name "*.vsix"
    } else {
        Write-Host "❌ VSIX packaging failed" -ForegroundColor Red
    }
} else {
    Write-Host "❌ TypeScript compilation failed" -ForegroundColor Red
}
