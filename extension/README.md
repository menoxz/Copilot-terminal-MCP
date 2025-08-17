# Terminal Orchestrator

**Professional terminal management for VS Code with GitHub Copilot Chat integration**

## Overview

Terminal Orchestrator is a powerful VS Code extension that provides 29 advanced Language Model Tools for managing and orchestrating terminals directly through GitHub Copilot Chat. Designed for professional developers who need efficient command-line workflow management.

## Features

### 🔧 Core Terminal Management
- **List Active Terminals** - View all terminals with detailed status
- **Create New Terminal** - Create terminals with custom configurations
- **Send Commands** - Execute commands in specific terminals
- **Delete Terminals** - Clean terminal management
- **Cancel Commands** - Interrupt running processes

### 📊 Advanced Monitoring
- **Terminal Health Check** - Comprehensive terminal diagnostics
- **Status Summary** - Overview of all terminal states  
- **Get Terminal State** - Detailed terminal information
- **Follow Output** - Real-time output monitoring
- **Search Output** - Find patterns in terminal output

### ⚡ Smart Automation
- **Safe Commands** - Error-handling command execution
- **Command Sequences** - Run multiple commands sequentially
- **Optimal Terminal Selection** - AI-powered terminal recommendations
- **Environment Variables** - Configure terminal environments
- **Directory Navigation** - Change working directories

### 🚀 Development Workflow
- **Development Stack Management** - Start/stop/restart dev environments
- **Port Management** - Check and free ports automatically
- **Process Management** - Kill processes by port
- **Cleanup Tools** - Remove idle terminals automatically

## Installation

1. Install the extension from VS Code Marketplace or VSIX file
2. Ensure GitHub Copilot Chat is installed and configured
3. Restart VS Code to activate the extension

## Usage

### Basic Usage

Open GitHub Copilot Chat and use the Terminal Orchestrator tools:

```
@terminal-orchestrator listTerminals
```

```
@terminal-orchestrator createTerminal {"name": "dev-server"}
```

```
@terminal-orchestrator sendCommand {"terminalName": "dev-server", "command": "npm start"}
```

### Advanced Workflows

**Development Environment Setup:**
```
@terminal-orchestrator startDevStack
```

**Safe Command Execution:**
```
@terminal-orchestrator safeSendCommand {"command": "npm install"}
```

**Command Sequences:**
```
@terminal-orchestrator runSequence {"name": "build", "commands": ["npm ci", "npm run build", "npm test"]}
```

**Health Monitoring:**
```
@terminal-orchestrator healthCheck
@terminal-orchestrator statusSummary
```

## Tool Reference

### Terminal Management Tools
| Tool | Description |
|------|-------------|
| `listTerminals` | List all active terminals |
| `createTerminal` | Create new terminal |
| `sendCommand` | Send command to terminal |
| `deleteTerminal` | Delete specific terminal |
| `cancelCommand` | Cancel running command |

### Monitoring Tools  
| Tool | Description |
|------|-------------|
| `getTerminalState` | Get detailed terminal state |
| `statusSummary` | Terminal status overview |
| `healthCheck` | Comprehensive diagnostics |
| `followOutput` | Real-time output monitoring |
| `getTerminalOutput` | Retrieve terminal output |

### Automation Tools
| Tool | Description |
|------|-------------|
| `safeSendCommand` | Safe command execution |
| `runSequence` | Execute command sequences |
| `safeRunSequence` | Safe sequence execution |
| `selectOptimalTerminal` | AI terminal selection |
| `setEnvVars` | Set environment variables |

### Development Tools
| Tool | Description |
|------|-------------|
| `startDevStack` | Start development stack |
| `stopDevStack` | Stop development stack |
| `restartDev` | Restart dev servers |
| `restartDevStack` | Restart complete stack |

### Maintenance Tools
| Tool | Description |
|------|-------------|
| `fixTerminals` | Repair problematic terminals |
| `cleanupIdle` | Remove idle terminals |
| `deleteAllTerminals` | Emergency terminal cleanup |
| `stopAll` | Stop all running commands |

### Network Tools
| Tool | Description |
|------|-------------|
| `checkPorts` | Check port usage |
| `killProcessByPort` | Free specific ports |

## Configuration

Terminal Orchestrator works out-of-the-box with sensible defaults. Advanced users can configure terminal behavior through VS Code settings.

## Requirements

- VS Code 1.95.0 or later
- GitHub Copilot Chat extension
- Node.js (for development workflows)

## Troubleshooting

### Common Issues

**Terminal not responding:**
```
@terminal-orchestrator fixTerminals
```

**Port conflicts:**
```
@terminal-orchestrator checkPorts
@terminal-orchestrator killProcessByPort {"port": 3000}
```

**Multiple idle terminals:**
```
@terminal-orchestrator cleanupIdle
```

## Support

- **GitHub Issues**: [Report bugs and feature requests](https://github.com/jeanluc-dev/terminal-orchestrator/issues)
- **Documentation**: Complete tool reference in VS Code
- **Community**: Share workflows and best practices

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions welcome! Please see CONTRIBUTING.md for guidelines.

---

**Terminal Orchestrator** - Professional terminal management for modern developers.
