#!/usr/bin/env node

/**
 * 🚀 Post-install script - Configuration automatique MCP
 * Exécuté automatiquement après `npm install`
 */

import { execSync } from 'child_process';

console.log('\n🎉 Copilot Terminal MCP Server installé avec succès !');

// Vérifier si nous sommes dans un contexte d'installation globale
const isGlobalInstall = process.env.npm_config_global === 'true' || 
                       process.argv.includes('-g') || 
                       process.argv.includes('--global');

if (isGlobalInstall) {
    console.log('\n📦 Installation globale détectée');
    console.log('🔧 Configuration automatique du serveur MCP...\n');
    
    try {
        // Exécuter l'installation MCP automatique
        execSync('node bin/install.js install', { stdio: 'inherit', cwd: __dirname });
        
        console.log('\n✅ Configuration terminée !');
        console.log('\n🚀 Prochaines étapes :');
        console.log('   1. Redémarrez VS Code');
        console.log('   2. Ouvrez GitHub Copilot Chat');
        console.log('   3. Testez : @workspace Liste tous les terminaux actifs');
        
    } catch (error) {
        console.log('\n⚠️  Configuration automatique échouée');
        console.log('📋 Configuration manuelle :');
        console.log('   npx @luxtech/copilot-terminal-mcp-server install');
    }
} else {
    console.log('\n📋 Pour configurer le serveur MCP :');
    console.log('   npx @luxtech/copilot-terminal-mcp-server install');
}

console.log('\n📖 Documentation : https://github.com/jeanluc-dev/copilot-terminal-mcp-server');
console.log('🐛 Support : https://github.com/jeanluc-dev/copilot-terminal-mcp-server/issues\n');
