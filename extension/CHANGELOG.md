# Changelog

All notable changes to Terminal Orchestrator will be documented in this file.

## [4.0.0] - 2025-08-17

### Major Changes
- **BREAKING**: Renamed extension from "Terminal Orchestrator - Professional Edition" to "Terminal Orchestrator"
- **UI/UX**: Removed all emojis for professional appearance
- **Localization**: Converted entire interface from French to English for universal accessibility
- **Branding**: Simplified display name and descriptions for better discoverability

### Added
- Professional English interface throughout all 29 Language Model Tools
- Universal accessibility with standardized terminology
- Enhanced tool descriptions for better GitHub Copilot Chat integration
- Improved package metadata for marketplace visibility

### Changed
- Extension name: `terminal-orchestrator-professional` → `terminal-orchestrator`
- Display name: "Terminal Orchestrator - Professional Edition" → "Terminal Orchestrator"
- All tool names and descriptions converted to English
- Removed emojis from all user-facing text
- Updated repository URL and package identifiers
- Enhanced keywords for better discoverability

### Technical Improvements
- Standardized tool reference names for consistency
- Improved input schema descriptions
- Enhanced tool tags for better categorization
- Professional terminology alignment

## [3.1.0] - 2025-08-17

### Enhanced
- Optimized Language Model Tools performance
- Improved terminal state analytics
- Enhanced error handling and recovery
- Added comprehensive monitoring capabilities

## [3.0.0] - 2025-08-17

### Added
- Initial release with 29 Language Model Tools
- Complete terminal orchestration system
- GitHub Copilot Chat integration
- Advanced monitoring and diagnostics
- Development workflow automation
- Port and process management
- Safe command execution with error handling

### Features
- Terminal lifecycle management
- Real-time monitoring and analytics
- Command sequences and automation
- Development stack management
- Network port management
- Intelligent terminal selection
- Output capture and search
- Environment configuration

---

## Migration Guide

### From v3.x to v4.0.0

**Extension Name Change:**
- Old: `lux-tech.terminal-orchestrator-professional`  
- New: `lux-tech.terminal-orchestrator`

**Tool Usage:**
- All tool functionality remains identical
- Tool names unchanged (internal IDs preserved)
- Only display names and descriptions updated to English

**No Breaking Changes:**
- All existing workflows continue to work
- No configuration changes required  
- Same 29 Language Model Tools available

### Upgrade Steps
1. Uninstall old version: `code --uninstall-extension lux-tech.terminal-orchestrator-professional`
2. Install new version: `code --install-extension terminal-orchestrator-4.0.0.vsix`
3. Restart VS Code
4. Verify installation with `@terminal-orchestrator listTerminals`
