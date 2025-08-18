# 🚀 Copilot Terminal MCP Server

[![NPM Version](https://img.shields.io/npm/v/copilot-terminal-mcp-server)](https://www.npmjs.com/package/copilot-terminal-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

**Serveur MCP avancé pour la gestion de terminaux avec intégration GitHub Copilot**

Transformez votre expérience de développement avec des terminaux intelligents, non-bloquants et parfaitement intégrés à GitHub Copilot et VS Code.

## ✨ **Fonctionnalités**

### � **Gestion Terminaux Avancée**
- **Terminaux nommés** : Créez et gérez des terminaux avec des noms spécifiques
- **Exécution non-bloquante** : Lancez des serveurs sans bloquer GitHub Copilot
- **Parallélisme intelligent** : Exécutez plusieurs processus simultanément
- **Récupération output** : Capturez et analysez les sorties en temps réel

### 🎯 **29 Outils Puissants**
- `createTerminal` - Création de terminaux personnalisés
- `sendCommand` - Exécution de commandes instantanées
- `getTerminalOutput` - Récupération des résultats
- `listTerminals` - Vue d'ensemble des terminaux actifs
- `cancelCommand` - Arrêt propre des processus
- `deleteTerminal` - Nettoyage des ressources
- Et 23+ autres outils avancés !

### 🚀 **Performance Exceptionnelle**
- ⚡ **Retour instantané** : < 10ms pour toutes les commandes
- 🔄 **Zéro blocage** : Plus jamais de timeout 30s
- 📊 **Monitoring temps réel** : Métriques et analytics intégrés
- 🧠 **Auto-recovery** : Récupération intelligente d'erreurs

## 📦 **Installation Ultra-Simple**

### **Option 1 : Installation Automatique (Recommandée)**

```bash
# Installation et configuration automatique en une commande
npx copilot-terminal-mcp-server install
```

**C'est tout !** Le serveur MCP sera automatiquement :
- ✅ Installé globalement  
- ✅ Configuré dans VS Code
- ✅ Prêt à utiliser avec GitHub Copilot

### **Option 2 : Installation via NPM Global**

```bash
# Installation globale
npm install -g copilot-terminal-mcp-server

# Auto-configuration
copilot-terminal-install install
```
npm install -g @luxtech/copilot-terminal-mcp-server
```

### Manual Installation
```bash
git clone https://github.com/jeanluc-dev/copilot-terminal-mcp-server.git
cd copilot-terminal-mcp-server
npm install
npm run build
```

## Configuration

Add to your MCP configuration file (`mcp.json`):

```json
{
  "servers": {
    "copilot-terminal": {
      "command": "npx",
      "args": ["@luxtech/copilot-terminal-mcp-server"],
      "env": {
        "NODE_ENV": "production",
        "MCP_MODE": "true"
      },
      "type": "stdio"
    }
  }
}
```

## Usage

The server provides 29 tools organized in categories:

### Terminal Management
- `createTerminal` - Create named terminals with configuration
- `listTerminals` - List all active terminals
- `deleteTerminal` - Remove terminals safely

### Command Execution
- `sendCommand` - Execute commands with monitoring
- `safeSendCommand` - AI-powered safe command execution
- `runSequence` - Execute command sequences

### Development Stack
- `startDevStack` - Start backend/frontend servers
- `restartDevStack` - Restart development environment
- `stopDevStack` - Stop development servers

### Monitoring & Output
- `getTerminalOutput` - Retrieve terminal output
- `searchOutput` - Search terminal output
- `tailOutput` - Get recent output lines

And many more advanced features!

## Requirements

- Node.js >= 18.0.0
- VS Code with GitHub Copilot
- MCP-compatible client

## License

MIT - See LICENSE file for details.

## Support

- 🐛 Report Issues: https://github.com/jeanluc-dev/copilot-terminal-mcp-server/issues
- 📖 Documentation: https://github.com/jeanluc-dev/copilot-terminal-mcp-server/wiki
- 💬 Discussions: https://github.com/jeanluc-dev/copilot-terminal-mcp-server/discussions

## Contributing

Contributions are welcome! Please read our Contributing Guide for details.

---

**Made with ❤️ by Jean-Luc KOUMAGLO**
