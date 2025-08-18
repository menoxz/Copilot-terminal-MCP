# 📦 Guide de Publication NPM

## 🚀 **Publication du Package**

### **Étape 1 : Préparation**

```bash
# Vérifier que tout est prêt
npm run package

# Build final
npm run build

# Tests complets
npm test
```

### **Étape 2 : Publication Test**

```bash
# Test de publication (dry-run)
npm publish --dry-run

# Vérifier le contenu du package
npm pack --dry-run
```

**Vérifications :**
- ✅ Fichiers `dist/` compilés
- ✅ Fichiers `bin/` inclus
- ✅ README.md et documentation
- ✅ LICENSE et CHANGELOG.md
- ✅ package.json correct

### **Étape 3 : Publication NPM**

```bash
# Se connecter à NPM
npm login

# Publier sur NPM
npm publish

# Ou avec tag beta pour tests
npm publish --tag beta
```

## 🧪 **Tests Post-Publication**

### **Test 1 : Installation Globale**

```bash
# Installation depuis NPM
npm install -g @luxtech/copilot-terminal-mcp-server

# Vérification
copilot-terminal-install status
```

### **Test 2 : Installation via NPX**

```bash
# Installation one-shot
npx @luxtech/copilot-terminal-mcp-server install

# Vérification
npx @luxtech/copilot-terminal-mcp-server status
```

### **Test 3 : Test dans VS Code**

1. Redémarrer VS Code
2. Ouvrir Copilot Chat
3. Tester : `@workspace Liste tous les terminaux actifs`

## 📋 **Checklist de Publication**

### **Avant Publication**
- [ ] Version incrémentée dans `package.json`
- [ ] CHANGELOG.md mis à jour
- [ ] README.md complet et à jour
- [ ] Tests passent tous
- [ ] Build réussit sans erreurs
- [ ] Scripts d'installation testés

### **Publication**
- [ ] `npm login` effectué
- [ ] `npm publish --dry-run` validé
- [ ] `npm publish` exécuté
- [ ] Publication confirmée sur npmjs.com

### **Post-Publication**
- [ ] Installation testée via `npm install -g`
- [ ] Installation testée via `npx`
- [ ] Configuration VS Code testée
- [ ] GitHub Copilot intégration testée
- [ ] Documentation mise à jour

## 🔄 **Mise à Jour du Package**

### **Version Patch (1.0.1)**
```bash
# Correction bugs
npm version patch
npm publish
```

### **Version Minor (1.1.0)**
```bash
# Nouvelles fonctionnalités
npm version minor
npm publish
```

### **Version Major (2.0.0)**
```bash
# Breaking changes
npm version major
npm publish
```

## 🌍 **Distribution**

### **URLs du Package**
- **NPM Registry** : https://www.npmjs.com/package/@luxtech/copilot-terminal-mcp-server
- **Unpkg CDN** : https://unpkg.com/@luxtech/copilot-terminal-mcp-server/
- **JSDelivr CDN** : https://cdn.jsdelivr.net/npm/@luxtech/copilot-terminal-mcp-server/

### **Statistiques**
```bash
# Stats de téléchargement
npm info @luxtech/copilot-terminal-mcp-server

# Versions disponibles
npm view @luxtech/copilot-terminal-mcp-server versions --json
```

## 🛠️ **Dépannage**

### **Erreur "Package already exists"**
```bash
# Incrémenter la version
npm version patch
npm publish
```

### **Erreur d'authentification**
```bash
# Se reconnecter
npm logout
npm login
```

### **Erreur de permissions**
```bash
# Vérifier les droits sur le package
npm owner ls @luxtech/copilot-terminal-mcp-server
```

## 📊 **Monitoring**

### **Surveillance des téléchargements**
- Tableau de bord NPM : https://www.npmjs.com/settings/luxtech/packages
- Analytics : `npm info @luxtech/copilot-terminal-mcp-server`

### **Feedback utilisateurs**
- Issues GitHub : Surveiller les remontées
- NPM Reviews : Vérifier les commentaires

## 🎯 **Promotion**

### **Documentation**
- [ ] README.md avec exemples
- [ ] Wiki GitHub détaillé  
- [ ] Guides d'utilisation
- [ ] Vidéos de démonstration

### **Communication**
- [ ] Annonce sur les forums dev
- [ ] Articles de blog
- [ ] Réseaux sociaux
- [ ] Communauté VS Code

---

**🎉 Le package est maintenant prêt pour aider des milliers de développeurs !**
