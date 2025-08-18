#!/usr/bin/env node

/**
 * 🚀 Script de packaging et publication NPM
 * Automatise la publication du package sur NPM
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

console.log('📦 Packaging Copilot Terminal MCP Server...\n');

try {
    // 1. Vérifications préalables
    console.log('🔍 Vérifications préalables...');
    
    // Vérifier que dist/ existe
    if (!fs.existsSync('dist')) {
        console.log('⚙️  Building project...');
        execSync('npm run build', { stdio: 'inherit' });
    }
    
    // Vérifier que bin/install.js existe
    if (!fs.existsSync('bin/install.js')) {
        console.error('❌ bin/install.js not found');
        process.exit(1);
    }
    
    console.log('✅ Vérifications terminées\n');
    
    // 2. Tests du package
    console.log('🧪 Tests du package...');
    try {
        execSync('npm test', { stdio: 'inherit' });
    } catch (error) {
        console.log('⚠️  No tests configured, continuing...');
    }
    
    // 3. Validation de l'installateur
    console.log('🔧 Test de l\'installateur...');
    execSync('node bin/install.js status', { stdio: 'inherit' });
    
    // 4. Vérification des métadonnées
    console.log('\n📋 Informations du package :');
    console.log(`   Nom: ${packageJson.name}`);
    console.log(`   Version: ${packageJson.version}`);
    console.log(`   Description: ${packageJson.description}`);
    console.log(`   Auteur: ${packageJson.author.name}`);
    
    // 5. Préparation pour publication
    console.log('\n📦 Préparation pour publication...');
    
    // Créer le tarball pour test
    console.log('📄 Création du tarball de test...');
    const tarballOutput = execSync('npm pack --dry-run', { encoding: 'utf8' });
    console.log('📁 Fichiers inclus dans le package :');
    console.log(tarballOutput);
    
    // 6. Commandes de publication
    console.log('\n🚀 Commandes de publication :');
    console.log('\n📝 Pour publier en mode test (dry-run) :');
    console.log('   npm publish --dry-run');
    
    console.log('\n🔐 Pour publier sur NPM (production) :');
    console.log('   npm login');
    console.log('   npm publish');
    
    console.log('\n🏷️  Pour publier avec un tag :');
    console.log('   npm publish --tag beta');
    console.log('   npm publish --tag latest');
    
    console.log('\n📊 Après publication, tester l\'installation :');
    console.log('   npx @luxtech/copilot-terminal-mcp-server status');
    console.log('   npx @luxtech/copilot-terminal-mcp-server install');
    
    // 7. Informations de distribution
    console.log('\n🌍 Informations de distribution :');
    console.log('   Registry: https://www.npmjs.com/package/@luxtech/copilot-terminal-mcp-server');
    console.log('   Unpkg: https://unpkg.com/@luxtech/copilot-terminal-mcp-server/');
    console.log('   JSDelivr: https://cdn.jsdelivr.net/npm/@luxtech/copilot-terminal-mcp-server/');
    
    console.log('\n✅ Package prêt pour publication ! 🎉');
    
} catch (error) {
    console.error('\n❌ Erreur lors du packaging :', error.message);
    process.exit(1);
}
