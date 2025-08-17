# Script pour supprimer tous les emojis du fichier TypeScript
$filePath = "c:\jeanluc\vscode_mcpserver\extension\src\extension-correct-structure.ts"
$content = Get-Content -Path $filePath -Raw

# Liste complète des emojis à remplacer
$emojiReplacements = @{
    # Emojis de statut
    '✅' = ''
    '❌' = 'ERROR'
    '⚠️' = 'WARNING'
    '🟢' = ''
    '🟡' = ''
    '🔴' = ''
    
    # Emojis d'action
    '🚀' = ''
    '🔄' = ''
    '⏹️' = ''
    '⏸️' = ''
    '▶️' = ''
    '🎯' = ''
    '🛡️' = ''
    '💀' = ''
    '🔧' = ''
    '🛠️' = ''
    
    # Emojis d'information
    '📋' = ''
    '📊' = ''
    '📄' = ''
    '📜' = ''
    '📤' = ''
    '📥' = ''
    '🖥️' = ''
    '⏱️' = ''
    '🔍' = ''
    '👁️' = ''
    '🏥' = ''
    
    # Emojis de développement
    '🎼' = ''
    '🌟' = ''
    '✨' = ''
    '💡' = ''
    '🎨' = ''
    '🎪' = ''
    '🎉' = ''
    
    # Autres emojis spéciaux
    '📍' = ''
    '🔗' = ''
    '💥' = ''
    '🌍' = ''
    '🔒' = ''
    '🎮' = ''
}

# Appliquer les remplacements
foreach ($emoji in $emojiReplacements.Keys) {
    $replacement = $emojiReplacements[$emoji]
    if ($replacement -eq '') {
        # Supprimer l'emoji en gardant un espace si nécessaire
        $content = $content -replace [regex]::Escape($emoji + ' '), ' '
        $content = $content -replace [regex]::Escape($emoji), ''
    } else {
        $content = $content -replace [regex]::Escape($emoji), $replacement
    }
}

# Nettoyer les espaces multiples
$content = $content -replace '  +', ' '
$content = $content -replace '^\s+', '', 'Multiline'

# Sauvegarder le fichier
Set-Content -Path $filePath -Value $content -NoNewline
Write-Host "Emojis supprimés du fichier extension-correct-structure.ts"
