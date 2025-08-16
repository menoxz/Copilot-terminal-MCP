#!/usr/bin/env node

/**
 * 🚀 COPILOT TERMINAL MASTER MCP SERVER - ULTRA CREATIVE EDITION 2025
 * 
 * An intelligent, creative, and powerful Model Context Protocol server
 * designed to revolutionize terminal management for AI assistants like Copilot.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ErrorCode,
    ListToolsRequestSchema,
    McpError,
} from '@modelcontextprotocol/sdk/types.js';

// Import our creative modules
import { UltraTerminalManager } from './core/terminal-manager.js';
import { CreativeLogger } from './utils/creative-logger.js';
import { PerformanceAnalyzer } from './utils/performance-analyzer.js';
import { registerAllTools } from './tools/index.js';

// 🎯 Detect MCP mode early
const isMCPMode = process.env.MCP_MODE === 'true' ||
    process.stdout.isTTY === false ||
    process.argv.includes('--stdio') ||
    process.argv.includes('stdio');

// Initialize our creative components
const terminalManager = new UltraTerminalManager();
const logger = new CreativeLogger('🚀 COPILOT-TERMINAL-MASTER');
const analytics = new PerformanceAnalyzer();

// Welcome banner - only in interactive mode
if (!isMCPMode) {
    logger.spectacular('');
    logger.spectacular('╔════════════════════════════════════════════════════════════════╗');
    logger.spectacular('║  🚀 COPILOT TERMINAL MASTER MCP SERVER - ULTRA CREATIVE 2025  ║');
    logger.spectacular('║                                                                ║');
    logger.spectacular('║  🧠 AI-Powered Terminal Management                           ║');
    logger.spectacular('║  ⚡ Lightning-Fast Command Execution                         ║');
    logger.spectacular('║  🎨 Creative & Intelligent Interface                         ║');
    logger.spectacular('║  🔮 Predictive Analytics & Auto-Recovery                    ║');
    logger.spectacular('║                                                                ║');
    logger.spectacular('║  Ready to revolutionize your development experience! 🌟      ║');
    logger.spectacular('╚════════════════════════════════════════════════════════════════╝');
    logger.spectacular('');
}

/**
 * 🎭 Create and configure MCP Server
 */
const server = new Server(
    {
        name: 'copilot-terminal-master',
        version: '1.0.0',
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

/**
 * 🔮 Execute Terminal Tool
 */
async function executeTerminalTool(name: string, args: any): Promise<any> {
    // Terminal Management Tools
    switch (name) {
        case 'createTerminal':
            return terminalManager.createTerminal(args);
        case 'listTerminals':
            return terminalManager.listTerminals();
        case 'deleteTerminal':
            return terminalManager.deleteTerminal(args.name);
        case 'sendCommand':
            return terminalManager.sendCommand(args.name || args.terminalName, args.command, {
                captureOutput: args.captureOutput,
                timeoutMs: args.timeoutMs,
                background: args.background
            });
        case 'cancelCommand':
            return terminalManager.cancelCommand(args.name || args.terminalName);
        case 'getTerminalState':
            return terminalManager.getTerminalState(args.name);
        case 'healthCheck':
            return terminalManager.healthCheck();
        case 'fixTerminals':
            return terminalManager.fixTerminals(args);
        case 'getTerminalOutput':
            return terminalManager.getTerminalOutput(args.name, args.lines);
        case 'selectOptimalTerminal':
            return terminalManager.selectOptimalTerminal(args.task, args.preferred);
        case 'getPerformanceReport':
            return analytics.generateReport();
        default:
            throw new Error(`Unknown tool: ${name}`);
    }
}

// 🎨 Setup Request Handlers
server.setRequestHandler(ListToolsRequestSchema, async () => {
    if (!isMCPMode) {
        logger.info('📋 Listing terminal management tools...');
    }

    const tools = registerAllTools();

    if (!isMCPMode) {
        logger.success(`✨ Returning ${tools.length} powerful terminal tools!`);
    }

    return { tools };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (!isMCPMode) {
        logger.info(`🎪 Executing tool: ${name}`);
    }

    analytics.recordToolUsage(name);
    const startTime = Date.now();

    try {
        // Execute the tool
        const result = await executeTerminalTool(name, args || {});

        const duration = Date.now() - startTime;
        analytics.recordPerformance(name, duration);

        if (!isMCPMode) {
            logger.success(`🌟 Tool ${name} completed successfully in ${duration}ms`);
        }

        return {
            content: [
                {
                    type: 'text',
                    text: typeof result === 'string' ? result : JSON.stringify(result, null, 2)
                }
            ]
        };

    } catch (error) {
        const duration = Date.now() - startTime;
        analytics.recordError(name, error as Error);

        if (!isMCPMode) {
            logger.error(`💥 Tool ${name} failed after ${duration}ms: ${error}`);
        }

        throw new McpError(
            ErrorCode.InternalError,
            `Tool execution failed for ${name}: ${error instanceof Error ? error.message : error}`
        );
    }
});

/**
 * 🎬 Main function - Start the server
 */
async function main() {
    const transport = new StdioServerTransport();

    if (!isMCPMode) {
        logger.info('🎬 Starting Copilot Terminal Master MCP Server...');
    }

    // Initialize terminal manager
    await terminalManager.initialize();

    // Start analytics
    analytics.startMonitoring();

    // Connect server
    await server.connect(transport);

    if (!isMCPMode) {
        logger.success('🚀 Server is running and ready for terminal management!');
        logger.info('💫 Waiting for requests from VS Code Copilot...');
    } else {
        // In MCP mode, log to stderr so it doesn't interfere with protocol
        console.error('Copilot Terminal Master MCP server running');
    }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
    if (!isMCPMode) {
        logger.info('🎭 Gracefully shutting down...');
    }
    await terminalManager.cleanup();
    analytics.generateReport();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    if (!isMCPMode) {
        logger.info('🎭 Gracefully shutting down...');
    }
    await terminalManager.cleanup();
    analytics.generateReport();
    process.exit(0);
});

// Start the server
main().catch((error) => {
    if (!isMCPMode) {
        logger.error(`💥 Failed to start server: ${error}`);
    }
    console.error('Failed to start MCP server:', error);
    process.exit(1);
});
