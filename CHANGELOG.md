# Changelog

All notable changes to this project will be documented in this file.

## [1.0.3] - 2025-08-18

### 🎨 User Improvements Release

#### Changed
- **README Enhancement**: User-driven improvements to documentation
- **Content Optimization**: Better structure and clarity based on user feedback
- **Examples Refinement**: Improved usage examples and clarity

#### Technical
- **Stability Improvements**: Enhanced error handling and robustness
- **Performance Tuning**: Minor optimizations for better user experience
- **Documentation Polish**: Refined documentation based on user insights

## [1.0.2] - 2025-08-18

### 🔧 Hotfix Release

#### Fixed
- **CLI Executable**: Fixed NPX installation issues with proper command-line interface
- **Binary Mapping**: Corrected package.json bin paths for global installations
- **Documentation**: Updated all documentation to English for international audience

#### Changed
- **Tool Count**: Corrected from 29 to 34 tools in all documentation
- **Language**: Switched primary language from French to English
- **README**: Complete rewrite with improved structure and examples

#### Added
- Proper CLI help system (`copilot-terminal-mcp-server help`)
- Enhanced error messages for troubleshooting
- Improved installation verification commands

## [1.0.0] - 2025-08-18

### 🎉 Initial Release

#### Added
- **34 Advanced Terminal Management Tools**
  - `createTerminal` - Create named terminals with custom configurations
  - `sendCommand` - Non-blocking command execution (< 10ms response)  
  - `getTerminalOutput` - Real-time output capture and analysis
  - `listTerminals` - Comprehensive terminal overview with metrics
  - `cancelCommand` - Graceful process termination
  - `deleteTerminal` - Clean resource management
  - `sendCommandAndWait` - Convenience helper for quick operations
  - And 27+ additional specialized tools

- **🚀 Non-Blocking Architecture**
  - Commands return instantly (< 10ms) instead of 30s timeout
  - Parallel terminal management without blocking
  - Real-time output streaming and monitoring  
  - Smart process lifecycle management

- **🔧 GitHub Copilot Integration**
  - Seamless VS Code Copilot Chat integration
  - Natural language terminal commands
  - Intelligent command suggestions and auto-completion
  - Context-aware error handling and recovery

- **📦 Easy Installation**
  - One-command NPM installation: `npx @luxtech/copilot-terminal-mcp-server install`
  - Automatic VS Code MCP configuration
  - Cross-platform support (Windows, macOS, Linux)
  - Built-in diagnostics and status checking
- GitHub Copilot Chat integration
- Terminal Management tools (create, list, delete, state)
- Command Execution tools (send, safe send, sequences)  
- Development Stack tools (start, stop, restart dev servers)
- Monitoring & Output tools (get output, search, tail)
- Intelligent Selection tools (optimal terminal selection)
- Environment Configuration tools (env vars, directories)
- Ports & Process Management tools (port checking, process killing)
- Maintenance & Cleanup tools (cleanup, health checks)
- Professional logging with creative formatting
- Performance analytics and monitoring
- Cross-platform compatibility (Windows, macOS, Linux)
- Security-focused design and validation
- Comprehensive documentation and examples
- TypeScript implementation with full type safety

### Features
- Named terminal creation with custom configurations
- Intelligent command execution with error recovery
- Development stack automation (backend/frontend coordination)
- Port conflict detection and resolution
- Real-time output monitoring and search
- Environment variable management
- Process lifecycle management
- Health diagnostics and auto-repair
- Performance metrics and optimization suggestions
- Cross-shell compatibility (PowerShell, Bash, Zsh)

### Technical Details
- Built with TypeScript for type safety
- Uses Model Context Protocol (MCP) v2024-11-05
- Supports Node.js >= 18.0.0
- Modular architecture with plugin system
- Comprehensive error handling and logging
- Performance optimized for large-scale usage
- Memory efficient terminal management
- Async/await throughout for optimal performance
