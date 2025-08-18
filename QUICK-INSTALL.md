# 🚀 **Installation Rapide - Copilot Terminal MCP Server**

## ⚡ **Installation en 30 Secondes**

### **Option 1 : Installation Automatique (Ultra-Simple)**

```bash
npx copilot-terminal-mcp-server install
```

**C'est tout !** 🎉 Le serveur sera automatiquement configuré dans VS Code.

### **Option 2 : Installation Globale**

```bash
# 1. Installation
npm install -g copilot-terminal-mcp-server

# 2. Configuration automatique
copilot-terminal-install install
```

## ✅ **Vérification de l'Installation**

```bash
# Vérifier le statut
npx copilot-terminal-mcp-server status
```

**Résultat attendu :**
```
📊 Statut du Copilot Terminal MCP Server...

📍 Configuration système :
   Plateforme: win32
   Node.js: v18.0.0+
   ✅ Configuration MCP trouvée
   ✅ Copilot Terminal configuré

📦 Fichiers du serveur :
   ✅ Serveur principal
   ✅ Répertoire dist
```

## 🔄 **Activation**

1. **Redémarrez VS Code**
2. **Ouvrez GitHub Copilot Chat**  
3. **Testez** :
   ```
   @workspace Liste tous les terminaux actifs
   ```

## 🚀 **Premier Test**

```
@workspace Crée un terminal nommé "test" et affiche "Hello MCP Server!"
```

**Résultat attendu :** Terminal créé et message affiché instantanément !

## 🛠️ **Résolution Problèmes Rapide**

### **❌ "Serveur MCP non trouvé"**
```bash
npx copilot-terminal-mcp-server install --force
```

### **❌ "Permission denied"**  
```bash
# Windows (Administrateur)
npm install -g copilot-terminal-mcp-server

# macOS/Linux  
sudo npm install -g copilot-terminal-mcp-server
```

## 🎯 **Utilisation Immédiate**

### **Commandes Magiques avec GitHub Copilot :**

```
🚀 Serveur de développement :
@workspace Lance npm start dans un terminal "dev-server"

🧪 Tests automatiques :
@workspace Lance les tests en mode watch dans un terminal "tests"

🔍 Monitoring :
@workspace Affiche l'output de tous les terminaux actifs

🛠️ Multi-tâches :
@workspace Lance le backend ET le frontend en parallèle
```

## 📊 **Fonctionnalités Clés**

- ⚡ **Retour instantané** (< 10ms)
- 🔄 **Zéro blocage** (fini les timeouts 30s)  
- 🚀 **Parallélisme** (plusieurs serveurs simultanés)
- 📈 **Monitoring** temps réel
- 🧠 **Auto-recovery** intelligent

---

**🎉 Installation réussie ! Votre développement vient de devenir 10x plus productif !**

[📖 Documentation complète](README.md) • [🐛 Support](https://github.com/jeanluc-dev/copilot-terminal-mcp-server/issues)
