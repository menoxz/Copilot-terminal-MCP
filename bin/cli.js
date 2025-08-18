#!/usr/bin/env node

/**
 * 🚀 Copilot Terminal MCP Server CLI
 * Point d'entrée principal pour les commandes utilisateur
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Récupérer les arguments de ligne de commande
const args = process.argv.slice(2);
const command = args[0];

// Aide par défaut
if (!command || command === 'help' || command === '--help' || command === '-h') {
    console.log(`
🚀 Copilot Terminal MCP Server v1.0.0

📋 Commandes disponibles :

   install      Configure le serveur MCP dans VS Code
   uninstall    Supprime la configuration MCP
   status       Affiche l'état de la configuration
   start        Démarre le serveur MCP
   help         Affiche cette aide

📖 Exemples :
   npx copilot-terminal-mcp-server install
   npx copilot-terminal-mcp-server status
   npx copilot-terminal-mcp-server start

🌍 Plus d'infos : https://github.com/jeanluc-dev/copilot-terminal-mcp-server
    `);
    process.exit(0);
}

// Mapping des commandes vers les scripts
const commandMap = {
    'install': join(__dirname, '..', 'bin', 'install.js'),
    'uninstall': join(__dirname, '..', 'bin', 'install.js'),
    'status': join(__dirname, '..', 'bin', 'install.js'),
    'start': join(__dirname, '..', 'dist', 'index.js')
};

// Vérifier si la commande existe
if (!commandMap[command]) {
    console.error(`❌ Commande inconnue : ${command}`);
    console.log(`💡 Utilisez 'npx copilot-terminal-mcp-server help' pour voir les commandes disponibles`);
    process.exit(1);
}

// Exécuter la commande appropriée
const scriptPath = commandMap[command];
const scriptArgs = command === 'start' ? [] : [command, ...args.slice(1)];

console.log(`🔄 Exécution : ${command}...`);

const child = spawn('node', [scriptPath, ...scriptArgs], {
    stdio: 'inherit',
    shell: false
});

child.on('error', (error) => {
    console.error(`❌ Erreur d'exécution : ${error.message}`);
    process.exit(1);
});

child.on('close', (code) => {
    process.exit(code || 0);
});
