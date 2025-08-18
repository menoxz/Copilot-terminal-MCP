/**
 * 🛠️ TOOLS REGISTRY - Spectacular MCP Tools Registration System
 * 
 * This module registers all the spectacular terminal management tools
 * with the MCP server. Each tool is carefully designed with creative
 * descriptions, comprehensive parameters, and intelligent validation.
 * 
 * Features:
 * - 🎯 Comprehensive tool definitions
 * - 🎨 Creative and helpful descriptions
 * - 🔍 Intelligent parameter validation
 * - 📊 Categorized tool organization
 * - ⚡ Performance-optimized schemas
 * 
 * @author Super Agent Ultra 2025
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { workspaceProblemsTools } from './workspace-problems.js';

/**
 * 🎭 Tool Categories for Organized Management
 */
export const TOOL_CATEGORIES = {
    TERMINAL_MANAGEMENT: 'Terminal Management',
    COMMAND_EXECUTION: 'Command Execution',
    DEVELOPMENT_STACK: 'Development Stack',
    MONITORING_OUTPUT: 'Monitoring & Output',
    INTELLIGENT_SELECTION: 'Intelligent Selection',
    ENVIRONMENT_CONFIG: 'Environment & Configuration',
    PORTS_PROCESSES: 'Ports & Process Management',
    WORKSPACE_DIAGNOSTICS: 'Workspace Diagnostics & Analysis',
    MAINTENANCE_CLEANUP: 'Maintenance & Cleanup'
} as const;

/**
 * 🎪 Register All Spectacular Tools
 */
export function registerAllTools(): Tool[] {
    const tools: Tool[] = [
        // 🔧 TERMINAL MANAGEMENT TOOLS
        ...getTerminalManagementTools(),

        // ⚡ COMMAND EXECUTION TOOLS
        ...getCommandExecutionTools(),

        // 🚀 DEVELOPMENT STACK TOOLS
        ...getDevelopmentStackTools(),

        // 📊 MONITORING & OUTPUT TOOLS
        ...getMonitoringOutputTools(),

        // 🔍 INTELLIGENT SELECTION TOOLS
        ...getIntelligentSelectionTools(),

        // 🛠️ ENVIRONMENT & CONFIGURATION TOOLS
        ...getEnvironmentConfigTools(),

        // 🌐 PORTS & PROCESS MANAGEMENT TOOLS
        ...getPortsProcessTools(),

        // � WORKSPACE DIAGNOSTICS & ANALYSIS TOOLS
        ...getWorkspaceDiagnosticsTools(),

        // �🔧 MAINTENANCE & CLEANUP TOOLS
        ...getMaintenanceCleanupTools()
    ];

    return tools;
}

/**
 * 🔧 Terminal Management Tools
 */
function getTerminalManagementTools(): Tool[] {
    return [
        {
            name: 'createTerminal',
            description: 'Create a spectacular named terminal with optional shell, working directory, and environment variables. Perfect for setting up dedicated development environments with style!',
            inputSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Unique name for the terminal (e.g., "dev-server", "build-terminal", "testing-suite")'
                    },
                    cwd: {
                        type: 'string',
                        description: 'Working directory path for the terminal (optional, defaults to current directory)'
                    },
                    shell: {
                        type: 'string',
                        description: 'Shell to use (optional, auto-detected: powershell.exe on Windows, /bin/zsh on macOS, /bin/bash on Linux)'
                    },
                    env: {
                        type: 'object',
                        additionalProperties: { type: 'string' },
                        description: 'Environment variables as key-value pairs (optional)'
                    },
                    visible: {
                        type: 'boolean',
                        description: 'Whether the terminal should be visible in VS Code (default: true)'
                    },
                    focus: {
                        type: 'boolean',
                        description: 'Whether to focus the terminal after creation (default: false)'
                    }
                },
                required: ['name']
            }
        },
        {
            name: 'listTerminals',
            description: 'List all spectacular managed terminals with comprehensive details including status, performance metrics, and health information. Great for getting an overview of your terminal ecosystem!',
            inputSchema: {
                type: 'object',
                properties: {},
                required: []
            }
        },
        {
            name: 'deleteTerminal',
            description: 'Gracefully delete a terminal with style, ensuring all processes are properly terminated and resources are cleaned up. Safety first, but with spectacular flair!',
            inputSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the terminal to delete'
                    }
                },
                required: ['name']
            }
        },
        {
            name: 'getTerminalState',
            description: 'Get comprehensive state information for a terminal including health metrics, performance analytics, and intelligent recommendations. Your terminal health checkup!',
            inputSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the terminal to inspect'
                    }
                },
                required: ['name']
            }
        },
        {
            name: 'deleteAllTerminals',
            description: 'Perform spectacular cleanup by deleting all terminals. Nuclear option with grace and style! Perfect for fresh starts.',
            inputSchema: {
                type: 'object',
                properties: {},
                required: []
            }
        }
    ];
}

/**
 * ⚡ Command Execution Tools
 */
function getCommandExecutionTools(): Tool[] {
    return [
        {
            name: 'sendCommand',
            description: 'Execute a command in a terminal with INSTANT response! Sends command immediately without waiting for completion. Perfect for servers, long builds, and any command. Use getTerminalOutput() afterwards to retrieve results.',
            inputSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the target terminal'
                    },
                    command: {
                        type: 'string',
                        description: 'Command to execute (automatically optimized for the shell type). Returns immediately without waiting!'
                    },
                    background: {
                        type: 'boolean',
                        description: 'Whether to run in background mode (default: false). Always non-blocking regardless.'
                    }
                },
                required: ['name', 'command']
            }
        },
        {
            name: 'sendCommandAndWait',
            description: 'Execute a command and automatically wait then retrieve output! Perfect helper for quick commands where you want both send + result in one call.',
            inputSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the target terminal'
                    },
                    command: {
                        type: 'string',
                        description: 'Command to execute with automatic waiting and output retrieval'
                    },
                    waitMs: {
                        type: 'number',
                        description: 'Time to wait before retrieving output (default: auto-detected based on command type)'
                    }
                },
                required: ['name', 'command']
            }
        },
        {
            name: 'sendCommandWithOutput',
            description: 'Execute a command with reliable output capture using advanced sentinel-based parsing. Perfect for commands that need guaranteed output retrieval!',
            inputSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the target terminal'
                    },
                    command: {
                        type: 'string',
                        description: 'Command to execute with reliable output capture'
                    },
                    waitMs: {
                        type: 'number',
                        description: 'Time to wait for output stabilization (default: 2000ms)'
                    }
                },
                required: ['name', 'command']
            }
        },
        {
            name: 'runSequence',
            description: 'Run multiple commands sequentially in a terminal with intelligent error handling and progress tracking. Your command pipeline conductor!',
            inputSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the target terminal'
                    },
                    commands: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'Array of commands to execute in sequence'
                    },
                    stopOnError: {
                        type: 'boolean',
                        description: 'Whether to stop execution if a command fails (default: true)'
                    },
                    timeoutMs: {
                        type: 'number',
                        description: 'Timeout per command in milliseconds (default: 30000ms)'
                    },
                    captureOutput: {
                        type: 'boolean',
                        description: 'Whether to capture output from all commands (default: true)'
                    }
                },
                required: ['name', 'commands']
            }
        },
        {
            name: 'safeSendCommand',
            description: 'AI-powered safe command execution with intelligent terminal selection and auto-recovery. The smartest way to run commands with confidence!',
            inputSchema: {
                type: 'object',
                properties: {
                    task: {
                        type: 'string',
                        description: 'Optional task description for AI terminal selection (e.g., "build", "test", "serve")'
                    },
                    preferred: {
                        type: 'string',
                        description: 'Preferred terminal name if available and healthy'
                    },
                    name: {
                        type: 'string',
                        description: 'Specific terminal name to use (overrides AI selection)'
                    },
                    command: {
                        type: 'string',
                        description: 'Command to execute safely'
                    },
                    createIfMissing: {
                        type: 'boolean',
                        description: 'Whether to create terminal if it doesn\'t exist (default: true)'
                    },
                    cwd: {
                        type: 'string',
                        description: 'Working directory for new terminal (if created)'
                    },
                    shell: {
                        type: 'string',
                        description: 'Shell for new terminal (if created, auto-detected by default)'
                    },
                    captureOutput: {
                        type: 'boolean',
                        description: 'Whether to capture command output (default: true)'
                    },
                    timeoutMs: {
                        type: 'number',
                        description: 'Command timeout in milliseconds (default: 30000ms)'
                    },
                    background: {
                        type: 'boolean',
                        description: 'Whether to run in background mode (default: false)'
                    },
                    fallbackCancel: {
                        type: 'boolean',
                        description: 'Whether to attempt cancel and retry on failure (default: true)'
                    }
                },
                required: ['command']
            }
        },
        {
            name: 'safeRunSequence',
            description: 'AI-powered safe sequence execution with intelligent terminal selection, auto-recovery, and comprehensive error handling. Maximum safety with spectacular results!',
            inputSchema: {
                type: 'object',
                properties: {
                    task: {
                        type: 'string',
                        description: 'Task description for AI terminal selection'
                    },
                    preferred: {
                        type: 'string',
                        description: 'Preferred terminal name'
                    },
                    name: {
                        type: 'string',
                        description: 'Specific terminal name'
                    },
                    createIfMissing: {
                        type: 'boolean',
                        description: 'Create terminal if missing (default: true)'
                    },
                    cwd: {
                        type: 'string',
                        description: 'Working directory for new terminal'
                    },
                    shell: {
                        type: 'string',
                        description: 'Shell for new terminal'
                    },
                    commands: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'Commands to execute in sequence'
                    },
                    stopOnError: {
                        type: 'boolean',
                        description: 'Stop on first error (default: true)'
                    },
                    timeoutMs: {
                        type: 'number',
                        description: 'Timeout per command (default: 30000ms)'
                    },
                    captureOutput: {
                        type: 'boolean',
                        description: 'Capture output (default: true)'
                    },
                    fallbackCancel: {
                        type: 'boolean',
                        description: 'Auto-cancel and retry on failure (default: true)'
                    }
                },
                required: ['commands']
            }
        },
        {
            name: 'cancelCommand',
            description: 'Gracefully cancel a running command with style. Sends appropriate interrupt signals (Ctrl+C/SIGINT) to stop execution safely.',
            inputSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the terminal running the command to cancel'
                    }
                },
                required: ['name']
            }
        }
    ];
}

/**
 * 🚀 Development Stack Tools
 */
function getDevelopmentStackTools(): Tool[] {
    return [
        {
            name: 'startDevStack',
            description: 'Start a complete development stack with backend and frontend servers. Orchestrates multiple terminals with intelligent timing and health checks!',
            inputSchema: {
                type: 'object',
                properties: {
                    backendName: {
                        type: 'string',
                        description: 'Name for backend terminal (default: "backend-dev")'
                    },
                    frontendName: {
                        type: 'string',
                        description: 'Name for frontend terminal (default: "frontend-dev")'
                    },
                    backendCwd: {
                        type: 'string',
                        description: 'Working directory for backend (default: current directory)'
                    },
                    frontendCwd: {
                        type: 'string',
                        description: 'Working directory for frontend (default: current directory)'
                    },
                    backendShell: {
                        type: 'string',
                        description: 'Shell for backend terminal (auto-detected by default)'
                    },
                    frontendShell: {
                        type: 'string',
                        description: 'Shell for frontend terminal (auto-detected by default)'
                    },
                    backendCommand: {
                        type: 'string',
                        description: 'Command to start backend server (e.g., "npm run dev", "python manage.py runserver")'
                    },
                    frontendCommand: {
                        type: 'string',
                        description: 'Command to start frontend server (e.g., "npm start", "ng serve")'
                    },
                    delayMs: {
                        type: 'number',
                        description: 'Delay between starting backend and frontend in milliseconds (default: 3000ms)'
                    }
                },
                required: []
            }
        },
        {
            name: 'restartDevStack',
            description: 'Intelligently restart development stack with heuristics and order control. Detects running servers and restarts them gracefully!',
            inputSchema: {
                type: 'object',
                properties: {
                    backendMatch: {
                        type: 'string',
                        description: 'Pattern to match backend terminal names (default: "backend")'
                    },
                    frontendMatch: {
                        type: 'string',
                        description: 'Pattern to match frontend terminal names (default: "frontend")'
                    },
                    delayMs: {
                        type: 'number',
                        description: 'Delay between restarts (default: 2000ms)'
                    },
                    fallbackDelete: {
                        type: 'boolean',
                        description: 'Delete and recreate if restart fails (default: true)'
                    },
                    restartOrder: {
                        type: 'string',
                        enum: ['backend-first', 'frontend-first', 'parallel'],
                        description: 'Order of restart operations (default: "backend-first")'
                    }
                },
                required: []
            }
        },
        {
            name: 'stopDevStack',
            description: 'Stop development stack gracefully with optional cleanup. Terminates servers in the correct order and cleans up resources!',
            inputSchema: {
                type: 'object',
                properties: {
                    backendMatch: {
                        type: 'string',
                        description: 'Pattern to match backend terminals (default: "backend")'
                    },
                    frontendMatch: {
                        type: 'string',
                        description: 'Pattern to match frontend terminals (default: "frontend")'
                    },
                    delete: {
                        type: 'boolean',
                        description: 'Whether to delete terminals after stopping (default: false)'
                    }
                },
                required: []
            }
        },
        {
            name: 'restartDev',
            description: 'Gracefully restart detected development servers with intelligent detection and recovery. Your dev server whisperer!',
            inputSchema: {
                type: 'object',
                properties: {
                    targets: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'Specific terminal names to restart (optional)'
                    },
                    match: {
                        type: 'string',
                        description: 'Pattern to match terminal names for restart (default: "dev")'
                    },
                    delayMs: {
                        type: 'number',
                        description: 'Delay between operations (default: 2000ms)'
                    },
                    fallbackDelete: {
                        type: 'boolean',
                        description: 'Delete and recreate on failure (default: true)'
                    }
                },
                required: []
            }
        }
    ];
}

/**
 * 📊 Monitoring & Output Tools
 */
function getMonitoringOutputTools(): Tool[] {
    return [
        {
            name: 'getTerminalOutput',
            description: 'Get the complete buffered output from a terminal. Perfect for retrieving results after sendCommand()! Shows all accumulated output including command results, server logs, build output, and errors.',
            inputSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the terminal to get output from'
                    }
                },
                required: ['name']
            }
        },
        {
            name: 'tailOutput',
            description: 'Get the last N lines of terminal output, like the Unix tail command but with spectacular formatting!',
            inputSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the terminal'
                    },
                    lines: {
                        type: 'number',
                        description: 'Number of lines to return (default: 20)'
                    }
                },
                required: ['name']
            }
        },
        {
            name: 'followOutput',
            description: 'Read incremental terminal output starting from a specific offset. Perfect for real-time monitoring and streaming updates!',
            inputSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the terminal to follow'
                    },
                    offset: {
                        type: 'number',
                        description: 'Byte offset to start reading from (default: 0)'
                    }
                },
                required: ['name']
            }
        },
        {
            name: 'searchOutput',
            description: 'Search terminal output for specific patterns with advanced options. Your terminal grep with superpowers!',
            inputSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the terminal to search'
                    },
                    query: {
                        type: 'string',
                        description: 'Search pattern or regular expression'
                    },
                    caseSensitive: {
                        type: 'boolean',
                        description: 'Whether search is case sensitive (default: false)'
                    },
                    maxMatches: {
                        type: 'number',
                        description: 'Maximum number of matches to return (default: 50)'
                    }
                },
                required: ['name', 'query']
            }
        },
        {
            name: 'statusSummary',
            description: 'Get a comprehensive status summary of all terminals with counts, categories, and health metrics. Your terminal dashboard!',
            inputSchema: {
                type: 'object',
                properties: {},
                required: []
            }
        }
    ];
}

/**
 * 🔍 Intelligent Selection Tools
 */
function getIntelligentSelectionTools(): Tool[] {
    return [
        {
            name: 'selectOptimalTerminal',
            description: 'AI-powered terminal selection that recommends the best terminal for a task based on health, performance, and context. Your intelligent terminal advisor!',
            inputSchema: {
                type: 'object',
                properties: {
                    task: {
                        type: 'string',
                        description: 'Description of the task to perform (e.g., "build", "test", "serve", "deploy")'
                    },
                    preferred: {
                        type: 'string',
                        description: 'Preferred terminal name if available and healthy'
                    }
                },
                required: []
            }
        }
    ];
}

/**
 * 🛠️ Environment & Configuration Tools
 */
function getEnvironmentConfigTools(): Tool[] {
    return [
        {
            name: 'changeDirectory',
            description: 'Change the working directory inside a terminal session with validation and confirmation. Navigate with confidence!',
            inputSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the terminal'
                    },
                    cwd: {
                        type: 'string',
                        description: 'New working directory path'
                    }
                },
                required: ['name', 'cwd']
            }
        },
        {
            name: 'setEnvVars',
            description: 'Set environment variables in a terminal session with intelligent validation and persistence. Configure your environment with style!',
            inputSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the terminal'
                    },
                    env: {
                        type: 'object',
                        additionalProperties: { type: 'string' },
                        description: 'Environment variables as key-value pairs'
                    }
                },
                required: ['name', 'env']
            }
        }
    ];
}

/**
 * 🌐 Ports & Process Management Tools
 */
function getPortsProcessTools(): Tool[] {
    return [
        {
            name: 'killProcessByPort',
            description: 'Find and kill processes using a specific TCP port with smart detection and graceful termination. Port liberator extraordinaire!',
            inputSchema: {
                type: 'object',
                properties: {
                    port: {
                        type: 'number',
                        description: 'TCP port number to clear'
                    }
                },
                required: ['port']
            }
        },
        {
            name: 'checkPorts',
            description: 'Check which common development ports are in use with detailed process information. Your port usage detective!',
            inputSchema: {
                type: 'object',
                properties: {
                    ports: {
                        type: 'array',
                        items: { type: 'number' },
                        description: 'Specific ports to check (default: common dev ports 3000, 4200, 8000, 8080, etc.)'
                    }
                },
                required: []
            }
        }
    ];
}

/**
 * 🔧 Maintenance & Cleanup Tools
 */
function getMaintenanceCleanupTools(): Tool[] {
    return [
        {
            name: 'fixTerminals',
            description: 'Diagnose and auto-recover terminal issues with comprehensive health checks and intelligent repairs. Your terminal doctor!',
            inputSchema: {
                type: 'object',
                properties: {
                    idleMs: {
                        type: 'number',
                        description: 'Consider terminals idle after this duration (default: 600000ms = 10min)'
                    },
                    killBlockedOverMs: {
                        type: 'number',
                        description: 'Kill terminals blocked for this duration (default: 120000ms = 2min)'
                    },
                    ensureTerminals: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'Ensure these terminals exist and are healthy'
                    },
                    cwd: {
                        type: 'string',
                        description: 'Working directory for new terminals'
                    },
                    shell: {
                        type: 'string',
                        description: 'Shell for new terminals (auto-detected by default)'
                    }
                },
                required: []
            }
        },
        {
            name: 'healthCheck',
            description: 'Perform comprehensive health analysis of all terminals with detailed metrics and recommendations. Your terminal wellness exam!',
            inputSchema: {
                type: 'object',
                properties: {},
                required: []
            }
        },
        {
            name: 'stopAll',
            description: 'Cancel all running processes in all terminals with best-effort approach. Emergency stop button with grace!',
            inputSchema: {
                type: 'object',
                properties: {},
                required: []
            }
        },
        {
            name: 'cleanupIdle',
            description: 'Delete terminals that have been idle beyond the threshold with intelligent cleanup. Keep your terminal ecosystem tidy!',
            inputSchema: {
                type: 'object',
                properties: {
                    idleMs: {
                        type: 'number',
                        description: 'Idle threshold in milliseconds (default: 600000ms = 10min)'
                    }
                },
                required: []
            }
        }
    ];
}

/**
 * 🔍 Workspace Diagnostics & Analysis Tools
 */
function getWorkspaceDiagnosticsTools(): Tool[] {
    return [
        {
            name: 'getWorkspaceProblems',
            description: 'Comprehensive workspace analysis with intelligent problem detection, categorization, and solution recommendations. Provides detailed insights into code quality, errors, warnings, and improvement opportunities.',
            inputSchema: {
                type: 'object',
                properties: {
                    refresh: {
                        type: 'boolean',
                        description: 'Force refresh cache to perform fresh analysis (default: false)'
                    }
                },
                required: []
            }
        },
        {
            name: 'getFileProblems',
            description: 'Analyze a specific file for problems and issues with detailed breakdown by severity, source, and category.',
            inputSchema: {
                type: 'object',
                properties: {
                    filePath: {
                        type: 'string',
                        description: 'Absolute path to the file to analyze for problems'
                    }
                },
                required: ['filePath']
            }
        },
        {
            name: 'getWorkspaceHealth',
            description: 'Quick workspace health overview with key metrics, health score, and improvement recommendations.',
            inputSchema: {
                type: 'object',
                properties: {},
                required: []
            }
        },
        {
            name: 'clearDiagnosticsCache',
            description: '----------------------------------------------------Clear diagnostics cache to force fresh analysis on next workspace scan.',
            inputSchema: {
                type: 'object',
                properties: {},
                required: []
            }
        }
    ];
}

export default registerAllTools;
