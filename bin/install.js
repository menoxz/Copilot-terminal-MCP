#!/usr/bin/env node

/**
 * 🚀 Copilot Terminal MCP Server - Auto Installer
 * Installation automatique pour GitHub Copilot et VS Code
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration par plateforme
const getPlatformConfig = () => {
    const platform = os.platform();
    const userHome = os.homedir();
    
    switch (platform) {
        case 'win32':
            return {
                mcpConfigPath: path.join(userHome, 'AppData', 'Roaming', 'Code', 'User', 'mcp.json'),
                packagePath: path.dirname(__dirname), // Where this package is installed
                shell: 'powershell.exe'
            };
        case 'darwin':
            return {
                mcpConfigPath: path.join(userHome, 'Library', 'Application Support', 'Code', 'User', 'mcp.json'),
                packagePath: path.dirname(__dirname),
                shell: '/bin/zsh'
            };
        case 'linux':
            return {
                mcpConfigPath: path.join(userHome, '.config', 'Code', 'User', 'mcp.json'),
                packagePath: path.dirname(__dirname),
                shell: '/bin/bash'
            };
        default:
            throw new Error(`Plateforme non supportée: ${platform}`);
    }
};

// Template de configuration MCP
const generateMcpConfig = (packagePath) => {
    const serverPath = path.join(packagePath, 'dist', 'index.js');
    const sharedStatePath = path.join(packagePath, 'shared-state.json');
    
    return {
        servers: {
            "copilot-terminal": {
                command: "node",
                args: [serverPath],
                env: {
                    "NODE_ENV": "production",
                    "MCP_MODE": "true",
                    "LOG_LEVEL": "info",
                    "MAX_TERMINALS": "20",
                    "COMMAND_TIMEOUT": "30000",
                    "WEBVIEW_ENABLED": "true",
                    "VSCODE_EXTENSION": "true",
                    "EXTENSION_PORT": "3001",
                    "SHARED_STATE_FILE": sharedStatePath
                },
                type: "stdio"
            }
        }
    };
};

// Installation principale
async function install() {
    console.log('🚀 Installation du Copilot Terminal MCP Server...\n');
    
    try {
        const config = getPlatformConfig();
        
        console.log('📍 Configuration détectée :');
        console.log(`   Plateforme: ${os.platform()}`);
        console.log(`   Chemin MCP: ${config.mcpConfigPath}`);
        console.log(`   Package: ${config.packagePath}\n`);
        
        // 1. Créer le répertoire de config VS Code si nécessaire
        const configDir = path.dirname(config.mcpConfigPath);
        if (!fs.existsSync(configDir)) {
            console.log('📁 Création du répertoire de configuration VS Code...');
            fs.mkdirSync(configDir, { recursive: true });
        }
        
        // 2. Lire la configuration MCP existante ou créer une nouvelle
        let mcpConfig = {};
        if (fs.existsSync(config.mcpConfigPath)) {
            console.log('📖 Lecture de la configuration MCP existante...');
            const existingConfig = fs.readFileSync(config.mcpConfigPath, 'utf8');
            mcpConfig = JSON.parse(existingConfig);
        }
        
        // 3. Ajouter notre serveur à la configuration
        console.log('⚙️  Ajout du serveur copilot-terminal...');
        const newConfig = generateMcpConfig(config.packagePath);
        
        // Fusionner avec la config existante
        if (!mcpConfig.servers) {
            mcpConfig.servers = {};
        }
        mcpConfig.servers["copilot-terminal"] = newConfig.servers["copilot-terminal"];
        
        // 4. Écrire la nouvelle configuration
        console.log('💾 Sauvegarde de la configuration...');
        fs.writeFileSync(config.mcpConfigPath, JSON.stringify(mcpConfig, null, 2));
        
        // 5. Créer le fichier d'état partagé
        const sharedStatePath = path.join(config.packagePath, 'shared-state.json');
        if (!fs.existsSync(sharedStatePath)) {
            console.log('📄 Création du fichier d\'état partagé...');
            fs.writeFileSync(sharedStatePath, JSON.stringify({
                terminals: {},
                createdAt: new Date().toISOString(),
                version: "1.0.0"
            }, null, 2));
        }
        
        // 6. Message de succès
        console.log('\n✅ Installation réussie ! 🎉');
        console.log('\n📋 Prochaines étapes :');
        console.log('   1. Redémarrez VS Code');
        console.log('   2. Ouvrez GitHub Copilot Chat');
        console.log('   3. Tapez "@workspace" pour vérifier que le serveur MCP est actif');
        console.log('   4. Utilisez les outils de terminal : createTerminal, sendCommand, etc.');
        
        console.log('\n🔧 Configuration ajoutée dans :');
        console.log(`   ${config.mcpConfigPath}`);
        
        console.log('\n🚀 Commandes disponibles :');
        console.log('   • mcp_copilot-termi_createTerminal');
        console.log('   • mcp_copilot-termi_sendCommand');
        console.log('   • mcp_copilot-termi_getTerminalOutput');
        console.log('   • mcp_copilot-termi_listTerminals');
        console.log('   • Et 20+ autres outils !');
        
    } catch (error) {
        console.error('\n❌ Erreur lors de l\'installation :', error.message);
        console.error('\n🔧 Solutions possibles :');
        console.error('   • Vérifiez que VS Code est installé');
        console.error('   • Exécutez en tant qu\'administrateur/sudo si nécessaire');
        console.error('   • Vérifiez les permissions du répertoire');
        process.exit(1);
    }
}

// Désinstallation
async function uninstall() {
    console.log('🗑️  Désinstallation du Copilot Terminal MCP Server...\n');
    
    try {
        const config = getPlatformConfig();
        
        if (fs.existsSync(config.mcpConfigPath)) {
            const existingConfig = fs.readFileSync(config.mcpConfigPath, 'utf8');
            const mcpConfig = JSON.parse(existingConfig);
            
            if (mcpConfig.servers && mcpConfig.servers["copilot-terminal"]) {
                delete mcpConfig.servers["copilot-terminal"];
                fs.writeFileSync(config.mcpConfigPath, JSON.stringify(mcpConfig, null, 2));
                console.log('✅ Serveur copilot-terminal retiré de la configuration MCP');
            } else {
                console.log('ℹ️  Serveur copilot-terminal non trouvé dans la configuration');
            }
        } else {
            console.log('ℹ️  Aucune configuration MCP trouvée');
        }
        
        console.log('\n✅ Désinstallation terminée !');
        console.log('   Redémarrez VS Code pour que les changements prennent effet.');
        
    } catch (error) {
        console.error('\n❌ Erreur lors de la désinstallation :', error.message);
        process.exit(1);
    }
}

// Affichage du statut
async function status() {
    console.log('📊 Statut du Copilot Terminal MCP Server...\n');
    
    try {
        const config = getPlatformConfig();
        
        console.log('📍 Configuration système :');
        console.log(`   Plateforme: ${os.platform()}`);
        console.log(`   Architecture: ${os.arch()}`);
        console.log(`   Node.js: ${process.version}`);
        console.log(`   Répertoire home: ${os.homedir()}`);
        
        console.log('\n📁 Chemins :');
        console.log(`   Config MCP: ${config.mcpConfigPath}`);
        console.log(`   Package: ${config.packagePath}`);
        
        // Vérifier si la config MCP existe
        if (fs.existsSync(config.mcpConfigPath)) {
            const existingConfig = fs.readFileSync(config.mcpConfigPath, 'utf8');
            const mcpConfig = JSON.parse(existingConfig);
            
            console.log('\n⚙️  Configuration MCP :');
            console.log(`   Fichier trouvé: ✅`);
            console.log(`   Serveurs configurés: ${Object.keys(mcpConfig.servers || {}).length}`);
            
            if (mcpConfig.servers && mcpConfig.servers["copilot-terminal"]) {
                console.log(`   Copilot Terminal: ✅ Configuré`);
                const serverConfig = mcpConfig.servers["copilot-terminal"];
                console.log(`   Chemin serveur: ${serverConfig.args[0]}`);
                console.log(`   Environment: ${Object.keys(serverConfig.env).length} variables`);
            } else {
                console.log(`   Copilot Terminal: ❌ Non configuré`);
            }
        } else {
            console.log('\n⚙️  Configuration MCP :');
            console.log(`   Fichier trouvé: ❌`);
            console.log('   → Exécutez "npx @luxtech/copilot-terminal-mcp-server install" pour l\'installer');
        }
        
        // Vérifier si les fichiers du serveur existent
        const serverPath = path.join(config.packagePath, 'dist', 'index.js');
        console.log('\n📦 Fichiers du serveur :');
        console.log(`   Serveur principal: ${fs.existsSync(serverPath) ? '✅' : '❌'}`);
        console.log(`   Répertoire dist: ${fs.existsSync(path.dirname(serverPath)) ? '✅' : '❌'}`);
        
    } catch (error) {
        console.error('\n❌ Erreur lors de la vérification du statut :', error.message);
    }
}

// Interface CLI
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'install':
        install();
        break;
    case 'uninstall':
        uninstall();
        break;
    case 'status':
        status();
        break;
    default:
        console.log('🚀 Copilot Terminal MCP Server - Installation CLI\n');
        console.log('Commandes disponibles :');
        console.log('  install    Installe le serveur MCP dans VS Code');
        console.log('  uninstall  Désinstalle le serveur MCP');
        console.log('  status     Affiche le statut d\'installation');
        console.log('\nExemples :');
        console.log('  npx @luxtech/copilot-terminal-mcp-server install');
        console.log('  npx @luxtech/copilot-terminal-mcp-server status');
        break;
}
