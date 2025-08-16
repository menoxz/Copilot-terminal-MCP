# 🚀 Copilot Terminal Master MCP Server

Un serveur MCP (Model Context Protocol) ultra-intelligent pour la gestion avancée des terminaux avec Claude Desktop et autres clients MCP.

## ✨ Fonctionnalités

- 🖥️ **Gestion Intelligente des Terminaux** - Création, suppression, monitoring
- ⚡ **Exécution de Commandes** - Exécution rapide avec capture de sortie  
- 📊 **Analytics en Temps Réel** - Performance monitoring avec IA
- 🎨 **Interface Créative** - Logging coloré avec emojis
- 🔮 **Auto-Recovery** - Récupération automatique des erreurs
- 🧠 **Intelligence Prédictive** - Optimisation basée sur l'historique

## 🛠️ Installation

### Prérequis
- Node.js v18+ 
- npm ou yarn
- Windows PowerShell (pour l'exécution des commandes)

### Setup
```bash
cd c:\jeanluc\vscode_mcpserver
npm install
npm run build
```

## 🚀 Utilisation

### Démarrage du Serveur
```bash
npm start
```

### Test du Serveur
```bash
node test-mcp.js
```

### Utilisation avec VS Code Copilot

1. **Installation de l'extension MCP pour VS Code** (si pas déjà installée)
2. **Configuration automatique** : Copiez le contenu de `vscode-mcp-config.json` dans votre fichier `mcp.json`
3. **Redémarrez VS Code** pour activer la configuration
4. **Utilisez Copilot** - Les outils de terminal seront disponibles automatiquement

**Commandes Copilot avec Terminal Tools :**
- `@copilot créer un terminal pour mon projet React`  
- `@copilot lister tous les terminaux actifs`
- `@copilot exécuter npm install dans le terminal principal`
- `@copilot supprimer le terminal de test`

## 🔧 Configuration MCP

### 🎯 Installation Automatique VS Code Copilot

**Méthode recommandée** pour VS Code :

```bash
# Installation automatique complète
npm run build
npm run install-vscode
```

Cette commande :
- ✅ Configure automatiquement VS Code
- ✅ Merge avec la configuration existante
- ✅ Active tous les outils de terminal
- ✅ Prêt à utiliser avec @copilot

### 📋 Configuration Manuelle VS Code Copilot

Pour utiliser avec **VS Code Copilot** et l'extension MCP, ajoutez cette configuration à votre fichier `mcp.json` :

**Emplacement du fichier :** `%APPDATA%\Code\User\mcp.json`

```json
{
    "servers": {
        "copilot-terminal-tools": {
            "command": "node",
            "args": ["c:/jeanluc/vscode_mcpserver/dist/index.js"],
            "env": {
                "NODE_ENV": "production",
                "LOG_LEVEL": "info",
                "MAX_TERMINALS": "20",
                "COMMAND_TIMEOUT": "30000"
            },
            "type": "stdio"
        }
    }
}
```

### 🤖 Configuration Claude Desktop

Ajoutez cette configuration à votre fichier `claude_desktop_config.json` :

```json
{
    "mcpServers": {
        "copilot-terminal-tools": {
            "command": "node",
            "args": ["c:/jeanluc/vscode_mcpserver/dist/index.js"],
            "env": {
                "NODE_ENV": "production"
            }
        }
    }
}
```

## 🎯 Outils MCP Disponibles

### `listTerminals`
Liste tous les terminaux actifs avec leurs informations détaillées.

```typescript
// Exemple d'utilisation
{
    "name": "listTerminals", 
    "arguments": {}
}
```

### `createTerminal`
Crée un nouveau terminal avec configuration personnalisée.

```typescript
{
    "name": "createTerminal",
    "arguments": {
        "name": "my-terminal",
        "shellPath": "powershell",
        "workingDirectory": "C:\\projects"
    }
}
```

### `sendCommand`
Exécute une commande dans un terminal spécifique.

```typescript
{
    "name": "sendCommand",
    "arguments": {
        "terminalName": "my-terminal",
        "command": "npm install",
        "captureOutput": true
    }
}
```

### `deleteTerminal`
Supprime un terminal spécifique.

```typescript
{
    "name": "deleteTerminal",
    "arguments": {
        "terminalName": "my-terminal"
    }
}
```

### `cancelCommand`
Annule une commande en cours d'exécution.

```typescript
{
    "name": "cancelCommand",
    "arguments": {
        "terminalName": "my-terminal"
    }
}
```

## 📁 Structure du Projet

```
src/
├── core/
│   ├── terminal-manager.ts     # Gestionnaire principal des terminaux
│   └── tool-registry.ts        # Registre des outils MCP
├── utils/
│   ├── creative-logger.ts      # Logger créatif avec couleurs
│   └── performance-analyzer.ts # Analyseur de performance
├── tools/
│   └── index.ts               # Export des outils
├── types/
│   ├── index.ts               # Types généraux
│   └── tool.ts                # Types des outils
└── index.ts                   # Point d'entrée principal
```

## 🧪 Tests

Le projet inclut un suite de tests complète :

```bash
# Test complet du serveur
npm test

# Test de démarrage
node test-mcp.js
```

## 🎨 Fonctionnalités Avancées

### Intelligence Artificielle
- **Prédiction d'erreurs** basée sur l'historique
- **Auto-optimisation** des performances
- **Recommandations intelligentes** d'amélioration

### Monitoring en Temps Réel
- **Métriques de performance** par terminal
- **Health checks** automatiques
- **Analytics d'utilisation** détaillées

### Récupération d'Erreurs
- **Auto-recovery** en cas de blocage
- **Retry intelligent** des commandes échouées
- **Cleanup automatique** des ressources

## 🔧 Configuration Avancée

### Variables d'Environnement
```bash
NODE_ENV=production        # Mode de production
LOG_LEVEL=info            # Niveau de logging
MAX_TERMINALS=10          # Nombre max de terminaux
COMMAND_TIMEOUT=30000     # Timeout des commandes (ms)
```

### Personnalisation
Modifiez `src/core/terminal-manager.ts` pour personnaliser :
- Shells par défaut
- Répertoires de travail
- Stratégies de retry
- Niveaux de logging

## 🐛 Dépannage

### Erreurs Communes

**"Cannot find module"**
```bash
npm install
npm run build
```

**"Terminal creation failed"**
- Vérifiez que PowerShell est accessible
- Vérifiez les permissions d'exécution

**"Failed to parse message" en mode MCP**
- Le serveur a été optimisé pour VS Code MCP
- Les logs colorés sont automatiquement désactivés
- Variable d'environnement `MCP_MODE=true` active le mode silencieux

### Logs de Debug
```bash
# Mode développement avec logs complets
NODE_ENV=development npm start

# Mode MCP silencieux (pour VS Code)
MCP_MODE=true npm start
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature
3. Committez vos changements  
4. Push vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.

## 🌟 Crédits

Développé par **Super Agent Ultra 2025** avec ❤️ et beaucoup de ☕

---

🎉 **Profitez de votre expérience de développement révolutionnaire avec Copilot Terminal Master MCP !** 🚀
