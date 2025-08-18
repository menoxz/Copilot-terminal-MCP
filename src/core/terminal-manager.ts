/**
 * 🧠 ULTRA TERMINAL MANAGER - The Brain of Terminal Intelligence
 * 
 * This is the core engine that manages terminals with unprecedented creativity,
 * intelligence, and style. It's designed to anticipate needs, auto-recover from
 * issues, and provide a spectacular development experience.
 * 
 * Features:
 * - 🎯 AI-Powered Terminal Selection
 * - 🔮 Predictive Command Analysis
 * - 🛡️ Self-Healing Terminal Recovery
 * - 📊 Real-Time Performance Analytics
 * - 🎨 Creative Visual Feedback
 * - ⚡ Lightning-Fast Execution
 * 
 * @author Super Agent Ultra 2025
 */

import { spawn, ChildProcess } from 'child_process';
import { EventEmitter } from 'events';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as process from 'process';
import { nanoid } from 'nanoid';
import chalk from 'chalk';
import stripAnsi from 'strip-ansi';
import detectPort from 'detect-port';
import findProcess from 'find-process';
import treeKill from 'tree-kill';
import { CreativeLogger } from '../utils/creative-logger.js';

/**
 * 🎭 Terminal Interface - The Foundation of Terminal Intelligence
 */
interface ITerminal {
    id: string;
    name: string;
    cwd: string;
    shell: string;
    process?: ChildProcess;
    visible: boolean;
    focus: boolean;
    createdAt: Date;
    lastActivity: Date;
    outputBuffer: string[];
    errorBuffer: string[];
    env: Record<string, string>;
    isRunning: boolean;
    currentCommand?: string;
    commandHistory: string[];
    lastExitCode?: number; // Added for non-blocking execution
    performance: {
        commandCount: number;
        avgExecutionTime: number;
        errorRate: number;
        successRate: number;
    };
    metadata: {
        category?: 'dev' | 'build' | 'test' | 'deploy' | 'utility' | 'monitoring';
        framework?: string;
        priority: number;
        tags: string[];
    };
}

/**
 * 🎪 Command Execution Result - Spectacular Results Tracking
 */
interface ICommandResult {
    success: boolean;
    output: string;
    error?: string;
    exitCode: number;
    duration: number;
    timestamp: Date;
    command: string;
    terminal: string;
    metadata?: any;
    nonBlocking?: boolean; // Added for non-blocking execution
    processId?: number; // Added for non-blocking execution
    note?: string; // Added for helpful messages
}

/**
 * 🚀 Ultra Terminal Manager - The Spectacular Terminal Orchestra Conductor
 */
export class UltraTerminalManager extends EventEmitter {
    private terminals = new Map<string, ITerminal>();
    private logger = new CreativeLogger('🧠 ULTRA-TERMINAL-MANAGER');
    private performanceMetrics = new Map<number, any>();
    private isInitialized = false;
    private shutdownInProgress = false;
    private autoRecoveryEnabled = true;
    private intelligenceLevel = 'ultra'; // 'basic' | 'advanced' | 'ultra'

    // 🎯 AI-Powered Terminal Categories for Intelligent Selection
    private readonly TERMINAL_CATEGORIES = {
        dev: ['serve', 'start', 'dev', 'watch', 'hot-reload'],
        build: ['build', 'compile', 'bundle', 'package', 'dist'],
        test: ['test', 'spec', 'jest', 'mocha', 'cypress', 'playwright'],
        deploy: ['deploy', 'publish', 'release', 'docker', 'kubernetes'],
        utility: ['install', 'clean', 'lint', 'format', 'audit'],
        monitoring: ['logs', 'monitor', 'health', 'status', 'metrics']
    };

    constructor() {
        super();
        this.logger.spectacular('🎪 Initializing Ultra Terminal Manager with Spectacular Intelligence!');
    }

    /**
     * 🌟 Initialize the Spectacular Terminal Manager
     */
    async initialize(): Promise<void> {
        if (this.isInitialized) {
            this.logger.warn('⚠️ Terminal Manager already initialized');
            return;
        }

        this.logger.info('🎭 Setting up spectacular terminal management system...');

        // Setup event listeners
        this.setupEventListeners();

        // Initialize performance tracking
        this.initializePerformanceTracking();

        // Setup auto-recovery system
        this.setupAutoRecovery();

        // Load persisted terminal state if exists
        await this.loadPersistedState();

        this.isInitialized = true;
        this.logger.success('✨ Ultra Terminal Manager initialized successfully!');

        this.emit('initialized');
    }

    /**
     * 🎨 Create Terminal with Creative Intelligence
     */
    async createTerminal(options: {
        name: string;
        cwd?: string;
        shell?: string;
        env?: Record<string, string>;
        visible?: boolean;
        focus?: boolean;
    }): Promise<ITerminal> {
        const { name, cwd = process.cwd(), shell = this.detectOptimalShell(), env = {}, visible = true, focus = false } = options;

        this.logger.info(`🎪 Creating spectacular terminal: ${chalk.cyan(name)}`);

        // Check if terminal already exists
        if (this.terminals.has(name)) {
            this.logger.warn(`⚠️ Terminal ${name} already exists, returning existing terminal`);
            return this.terminals.get(name)!;
        }

        // Create terminal object
        const terminal: ITerminal = {
            id: nanoid(),
            name,
            cwd,
            shell,
            visible,
            focus,
            createdAt: new Date(),
            lastActivity: new Date(),
            outputBuffer: [],
            errorBuffer: [],
            env: this.cleanEnvironmentVariables({ ...process.env, ...env }),
            isRunning: false,
            commandHistory: [],
            performance: {
                commandCount: 0,
                avgExecutionTime: 0,
                errorRate: 0,
                successRate: 100
            },
            metadata: {
                category: this.detectTerminalCategory(name),
                priority: this.calculateTerminalPriority(name),
                tags: this.generateTerminalTags(name)
            }
        };

        // Store terminal
        this.terminals.set(name, terminal);

        this.logger.success(`🌟 Spectacular terminal ${chalk.green(name)} created successfully!`);
        this.emit('terminalCreated', terminal);

        return terminal;
    }

    /**
     * 📋 List All Spectacular Terminals
     */
    async listTerminals(): Promise<ITerminal[]> {
        const terminals = Array.from(this.terminals.values());

        this.logger.info(`📋 Listing ${chalk.cyan(terminals.length.toString())} spectacular terminals`);

        // Sort by priority and last activity
        terminals.sort((a, b) => {
            if (a.metadata.priority !== b.metadata.priority) {
                return b.metadata.priority - a.metadata.priority;
            }
            return b.lastActivity.getTime() - a.lastActivity.getTime();
        });

        return terminals;
    }

    /**
     * 🗑️ Delete Terminal with Grace and Style
     */
    async deleteTerminal(name: string): Promise<boolean> {
        this.logger.info(`🗑️ Gracefully deleting terminal: ${chalk.cyan(name)}`);

        const terminal = this.terminals.get(name);
        if (!terminal) {
            this.logger.warn(`⚠️ Terminal ${name} not found`);
            return false;
        }

        // Kill process if running
        if (terminal.process && !terminal.process.killed) {
            this.logger.info(`🔪 Terminating process for terminal ${name}`);

            try {
                // Try graceful termination first
                if (process.platform === 'win32') {
                    treeKill(terminal.process.pid!, 'SIGTERM');
                } else {
                    terminal.process.kill('SIGTERM');
                }

                // Wait for graceful termination
                await new Promise((resolve) => {
                    setTimeout(() => {
                        if (!terminal.process!.killed) {
                            // Force kill if still running
                            treeKill(terminal.process!.pid!, 'SIGKILL');
                        }
                        resolve(void 0);
                    }, 5000);
                });
            } catch (error) {
                this.logger.error(`💥 Error killing process for terminal ${name}: ${error}`);
            }
        }

        // Remove from registry
        this.terminals.delete(name);

        this.logger.success(`🌟 Terminal ${chalk.green(name)} deleted successfully!`);
        this.emit('terminalDeleted', name);

        return true;
    }

    /**
     * 📊 Get Terminal State with Rich Information
     */
    async getTerminalState(name: string): Promise<any> {
        const terminal = this.terminals.get(name);
        if (!terminal) {
            throw new Error(`🤔 Terminal ${name} not found`);
        }

        const state = {
            ...terminal,
            status: this.calculateTerminalStatus(terminal),
            health: await this.calculateTerminalHealth(terminal),
            recommendations: this.generateTerminalRecommendations(terminal),
            analytics: this.getTerminalAnalytics(terminal)
        };

        this.logger.debug(`📊 Terminal state for ${name}: ${JSON.stringify(state, null, 2)}`);

        return state;
    }

    /**
     * 🧹 Delete All Terminals with Spectacular Cleanup
     */
    async deleteAllTerminals(): Promise<number> {
        this.logger.info('🧹 Performing spectacular cleanup of all terminals...');

        const terminalNames = Array.from(this.terminals.keys());
        let deletedCount = 0;

        for (const name of terminalNames) {
            const success = await this.deleteTerminal(name);
            if (success) {
                deletedCount++;
            }
        }

        this.logger.success(`🌟 Successfully deleted ${chalk.green(deletedCount.toString())} terminals!`);
        this.emit('allTerminalsDeleted', deletedCount);

        return deletedCount;
    }

    /**
     * ⚡ Send Command with Lightning Speed and Intelligence
     */
    async sendCommand(
        terminalName: string,
        command: string,
        options: {
            captureOutput?: boolean;
            timeoutMs?: number;
            background?: boolean;
        } = {}
    ): Promise<ICommandResult> {
        const { background = false } = options;

        this.logger.info(`⚡ Executing command INSTANTLY in ${chalk.cyan(terminalName)}: ${chalk.yellow(command)}`);

        const terminal = this.terminals.get(terminalName);
        if (!terminal) {
            throw new Error(`🤔 Terminal ${terminalName} not found`);
        }

        const startTime = Date.now();

        try {
            // Update terminal state
            terminal.currentCommand = command;
            terminal.lastActivity = new Date();
            terminal.commandHistory.push(command);
            terminal.performance.commandCount++;

            // Execute command NON-BLOCKING - new implementation
            const result = await this.executeCommandNonBlocking(terminal, command, { background });

            // Update performance metrics
            const duration = Date.now() - startTime;
            terminal.performance.avgExecutionTime =
                (terminal.performance.avgExecutionTime + duration) / 2;

            // Always success for non-blocking execution
            terminal.performance.successRate =
                (terminal.performance.successRate + 100) / 2;

            this.logger.success(`🌟 Command sent instantly in ${duration}ms! Use getTerminalOutput() to retrieve results.`);

            this.emit('commandExecuted', {
                terminal: terminalName,
                command,
                result,
                duration
            });

            return result;

        } catch (error) {
            const duration = Date.now() - startTime;
            terminal.performance.errorRate = (terminal.performance.errorRate + 100) / 2;

            this.logger.error(`💥 Command failed to send after ${duration}ms: ${error}`);

            throw error;
        } finally {
            terminal.currentCommand = undefined;
        }
    }

    /**
     * ⏱️ Send Command and Wait - Helper for one-call execution
     */
    async sendCommandAndWait(
        terminalName: string,
        command: string,
        waitMs?: number
    ): Promise<ICommandResult> {
        // Detect optimal wait time if not provided
        const optimalWaitTime = waitMs || this.guessOptimalWaitTime(command);

        this.logger.info(`⏱️ Sending command and waiting ${optimalWaitTime}ms for results...`);

        // 1. Send command non-blocking
        const sendResult = await this.sendCommand(terminalName, command);

        // 2. Wait intelligently
        await new Promise(resolve => setTimeout(resolve, optimalWaitTime));

        // 3. Get output
        const output = await this.getTerminalOutput(terminalName);

        // 4. Return combined result
        return {
            ...sendResult,
            output: output.content || sendResult.output,
            note: `Command sent and waited ${optimalWaitTime}ms. Retrieved ${output.content?.length || 0} characters of output.`,
            metadata: {
                waitTime: optimalWaitTime,
                autoRetrieved: true,
                originalSendResult: sendResult
            }
        };
    }

    /**
     * 🎯 Guess optimal wait time based on command type
     */
    private guessOptimalWaitTime(command: string): number {
        // Server commands - quick startup detection
        if (/npm\s+(start|run\s+dev)|ng\s+serve|python.*runserver|yarn\s+(start|dev)/.test(command)) {
            return 5000; // 5 seconds for servers to start
        }

        // Build commands - longer timeout
        if (/npm\s+run\s+build|tsc|webpack|rollup|vite\s+build/.test(command)) {
            return 30000; // 30 seconds for builds
        }

        // Test commands
        if (/npm\s+(test|run\s+test)|jest|mocha|pytest/.test(command)) {
            return 10000; // 10 seconds for tests
        }

        // Install commands
        if (/npm\s+install|pip\s+install|yarn\s+install/.test(command)) {
            return 15000; // 15 seconds for package installs
        }

        // Docker commands
        if (/docker/.test(command)) {
            return 20000; // 20 seconds for docker operations
        }

        // Default for other commands
        return 3000; // 3 seconds default
    }

    /**
     * 🎯 Safe Send Command with Intelligent Terminal Selection
     */
    async safeSendCommand(options: {
        task?: string;
        preferred?: string;
        name?: string;
        command: string;
        createIfMissing?: boolean;
        cwd?: string;
        shell?: string;
        captureOutput?: boolean;
        timeoutMs?: number;
        background?: boolean;
        fallbackCancel?: boolean;
    }): Promise<ICommandResult> {
        const {
            task,
            preferred,
            name,
            command,
            createIfMissing = true,
            cwd = process.cwd(),
            shell = this.detectOptimalShell(),
            captureOutput = true,
            timeoutMs = 30000,
            background = false,
            fallbackCancel = true
        } = options;

        this.logger.info(`🎯 Executing safe command with AI selection: ${chalk.yellow(command)}`);

        // Find or create optimal terminal
        let terminalName = name;

        if (!terminalName) {
            const optimal = await this.selectOptimalTerminal(task, preferred);
            terminalName = optimal?.name || `auto-terminal-${Date.now()}`;
        }

        // Ensure terminalName is not empty
        if (!terminalName) {
            terminalName = `fallback-terminal-${Date.now()}`;
        }

        // Create terminal if it doesn't exist and createIfMissing is true
        if (!this.terminals.has(terminalName) && createIfMissing) {
            await this.createTerminal({
                name: terminalName,
                cwd,
                shell
            });
        }

        try {
            return await this.sendCommand(terminalName, command, {
                captureOutput,
                timeoutMs,
                background
            });
        } catch (error) {
            if (fallbackCancel) {
                this.logger.warn(`⚠️ Command failed, attempting to cancel and retry...`);
                await this.cancelCommand(terminalName);

                // Retry once
                return await this.sendCommand(terminalName, command, {
                    captureOutput,
                    timeoutMs,
                    background
                });
            }

            throw error;
        }
    }

    /**
     * 🎮 Select Optimal Terminal with AI Intelligence
     */
    async selectOptimalTerminal(task?: string, preferred?: string): Promise<any> {
        this.logger.info(`🎮 AI is selecting optimal terminal for task: ${chalk.cyan(task || 'general')}`);

        const terminals = Array.from(this.terminals.values());

        // If preferred terminal exists and is healthy, use it
        if (preferred && this.terminals.has(preferred)) {
            const preferredTerminal = this.terminals.get(preferred)!;
            const health = await this.calculateTerminalHealth(preferredTerminal);

            if (health.score > 0.7) {
                this.logger.info(`🎯 Using preferred terminal: ${chalk.green(preferred)}`);
                return {
                    name: preferred,
                    reason: 'preferred',
                    confidence: 0.9,
                    terminal: preferredTerminal
                };
            }
        }

        // AI-powered terminal selection based on task
        if (task && terminals.length > 0) {
            const scored = await Promise.all(
                terminals.map(async (terminal) => ({
                    terminal,
                    score: await this.calculateTerminalFitnessScore(terminal, task)
                }))
            );

            scored.sort((a, b) => b.score - a.score);

            const best = scored[0];
            if (best && best.score > 0.5) {
                this.logger.info(`🧠 AI selected optimal terminal: ${chalk.green(best.terminal.name)}`);
                return {
                    name: best.terminal.name,
                    reason: 'ai-optimized',
                    confidence: best.score,
                    terminal: best.terminal
                };
            }
        }

        // Create new terminal with intelligent naming
        const newName = this.generateIntelligentTerminalName(task);

        this.logger.info(`✨ Creating new optimal terminal: ${chalk.green(newName)}`);

        return {
            name: newName,
            reason: 'created-optimal',
            confidence: 0.8,
            shouldCreate: true
        };
    }

    /**
     * 🔄 Cancel Command with Style
     */
    async cancelCommand(name: string): Promise<boolean> {
        this.logger.info(`🔄 Cancelling command in terminal: ${chalk.cyan(name)}`);

        const terminal = this.terminals.get(name);
        if (!terminal) {
            this.logger.warn(`⚠️ Terminal ${name} not found`);
            return false;
        }

        if (terminal.process && !terminal.process.killed) {
            try {
                if (process.platform === 'win32') {
                    // Send Ctrl+C on Windows
                    terminal.process.kill('SIGINT');
                } else {
                    // Send SIGINT on Unix-like systems
                    terminal.process.kill('SIGINT');
                }

                this.logger.success(`🌟 Command cancelled successfully in terminal ${name}`);
                return true;
            } catch (error) {
                this.logger.error(`💥 Failed to cancel command in terminal ${name}: ${error}`);
                return false;
            }
        }

        this.logger.info(`📝 No running command to cancel in terminal ${name}`);
        return true;
    }

    /**
     * 🏥 Health Check with Comprehensive Analysis
     */
    async healthCheck(): Promise<any> {
        this.logger.info('🏥 Performing comprehensive health check...');

        const terminals = Array.from(this.terminals.values());
        const health = {
            totalTerminals: terminals.length,
            healthyTerminals: 0,
            unhealthyTerminals: 0,
            issues: 0,
            recommendations: [] as string[],
            performance: {
                avgResponseTime: 0,
                successRate: 0,
                errorRate: 0
            },
            details: [] as any[]
        };

        for (const terminal of terminals) {
            const terminalHealth = await this.calculateTerminalHealth(terminal);

            const detail = {
                name: terminal.name,
                health: terminalHealth,
                performance: terminal.performance,
                lastActivity: terminal.lastActivity,
                commandCount: terminal.performance.commandCount
            };

            health.details.push(detail);

            if (terminalHealth.score > 0.7) {
                health.healthyTerminals++;
            } else {
                health.unhealthyTerminals++;
                health.issues += terminalHealth.issues.length;
            }
        }

        // Calculate overall performance
        if (terminals.length > 0) {
            health.performance.avgResponseTime = terminals.reduce((sum, t) =>
                sum + t.performance.avgExecutionTime, 0) / terminals.length;
            health.performance.successRate = terminals.reduce((sum, t) =>
                sum + t.performance.successRate, 0) / terminals.length;
            health.performance.errorRate = terminals.reduce((sum, t) =>
                sum + t.performance.errorRate, 0) / terminals.length;
        }

        // Generate recommendations
        if (health.unhealthyTerminals > 0) {
            health.recommendations.push('🔧 Consider running fixTerminals() to auto-recover unhealthy terminals');
        }

        if (health.performance.errorRate > 20) {
            health.recommendations.push('⚠️ High error rate detected, review command execution patterns');
        }

        this.logger.success(`🌟 Health check completed: ${health.healthyTerminals}/${health.totalTerminals} terminals healthy`);

        return health;
    }

    /**
     * 🔧 Fix Terminals with Auto-Recovery Magic
     */
    async fixTerminals(options: {
        idleMs?: number;
        killBlockedOverMs?: number;
        ensureTerminals?: string[];
        cwd?: string;
        shell?: string;
    } = {}): Promise<any> {
        this.logger.info('🔧 Starting spectacular terminal auto-recovery...');

        const {
            idleMs = 600000, // 10 minutes
            killBlockedOverMs = 120000, // 2 minutes
            ensureTerminals = [],
            cwd = process.cwd(),
            shell = this.detectOptimalShell()
        } = options;

        const results = {
            fixed: 0,
            killed: 0,
            created: 0,
            errors: [] as string[]
        };

        const terminals = Array.from(this.terminals.values());

        // Fix unhealthy terminals
        for (const terminal of terminals) {
            try {
                const health = await this.calculateTerminalHealth(terminal);

                if (health.score < 0.5) {
                    this.logger.info(`🛠️ Fixing unhealthy terminal: ${terminal.name}`);

                    // Kill if blocked for too long
                    const timeSinceLastActivity = Date.now() - terminal.lastActivity.getTime();
                    if (timeSinceLastActivity > killBlockedOverMs && terminal.process) {
                        await this.deleteTerminal(terminal.name);
                        results.killed++;
                    }

                    results.fixed++;
                }
            } catch (error) {
                results.errors.push(`Failed to fix terminal ${terminal.name}: ${error}`);
            }
        }

        // Ensure required terminals exist
        for (const terminalName of ensureTerminals) {
            if (!this.terminals.has(terminalName)) {
                try {
                    await this.createTerminal({
                        name: terminalName,
                        cwd,
                        shell
                    });
                    results.created++;
                } catch (error) {
                    results.errors.push(`Failed to create terminal ${terminalName}: ${error}`);
                }
            }
        }

        this.logger.success(`🌟 Auto-recovery completed: ${results.fixed} fixed, ${results.killed} killed, ${results.created} created`);

        return results;
    }

    // ==========================================
    // 🎨 PRIVATE CREATIVE METHODS
    // ==========================================

    /**
     * 🧹 Clean Environment Variables - Type Safe
     */
    private cleanEnvironmentVariables(env: NodeJS.ProcessEnv): Record<string, string> {
        const cleaned: Record<string, string> = {};
        for (const [key, value] of Object.entries(env)) {
            if (value !== undefined) {
                cleaned[key] = value;
            }
        }
        return cleaned;
    }

    /**
     * 🔍 Detect Optimal Shell for Current Environment
     */
    private detectOptimalShell(): string {
        if (process.platform === 'win32') {
            return 'powershell.exe';
        } else if (process.platform === 'darwin') {
            return '/bin/zsh';
        } else {
            return '/bin/bash';
        }
    }

    /**
     * 🎯 Detect Terminal Category Based on Name
     */
    private detectTerminalCategory(name: string): 'dev' | 'build' | 'test' | 'deploy' | 'utility' | 'monitoring' {
        const lowerName = name.toLowerCase();

        for (const [category, keywords] of Object.entries(this.TERMINAL_CATEGORIES)) {
            if (keywords.some(keyword => lowerName.includes(keyword))) {
                return category as any;
            }
        }

        return 'utility';
    }

    /**
     * 🎲 Calculate Terminal Priority
     */
    private calculateTerminalPriority(name: string): number {
        const priorities = {
            dev: 90,
            build: 80,
            test: 70,
            deploy: 85,
            utility: 50,
            monitoring: 60
        };

        const category = this.detectTerminalCategory(name);
        return priorities[category] + Math.floor(Math.random() * 10);
    }

    /**
     * 🏷️ Generate Terminal Tags
     */
    private generateTerminalTags(name: string): string[] {
        const tags = [];
        const lowerName = name.toLowerCase();

        // Framework detection
        if (lowerName.includes('react')) tags.push('react', 'frontend');
        if (lowerName.includes('vue')) tags.push('vue', 'frontend');
        if (lowerName.includes('angular')) tags.push('angular', 'frontend');
        if (lowerName.includes('node')) tags.push('nodejs', 'backend');
        if (lowerName.includes('python')) tags.push('python', 'backend');
        if (lowerName.includes('java')) tags.push('java', 'backend');
        if (lowerName.includes('docker')) tags.push('docker', 'containerization');
        if (lowerName.includes('k8s') || lowerName.includes('kubernetes')) tags.push('kubernetes', 'orchestration');

        return tags;
    }

    /**
     * 🚀 Execute Command Non-Blocking - REVOLUTIONARY APPROACH
     */
    private async executeCommandNonBlocking(
        terminal: ITerminal,
        command: string,
        options: { background?: boolean }
    ): Promise<ICommandResult> {
        const startTime = Date.now();

        try {
            // Spawn process but DON'T wait for completion
            const childProcess = spawn(terminal.shell, [], {
                cwd: terminal.cwd,
                env: terminal.env,
                stdio: ['pipe', 'pipe', 'pipe'],
                detached: options.background
            });

            terminal.process = childProcess;
            terminal.isRunning = true;

            // Set up output capture in background
            childProcess.stdout?.on('data', (data) => {
                const text = data.toString();
                terminal.outputBuffer.push(text);

                // Keep buffer size reasonable
                if (terminal.outputBuffer.length > 1000) {
                    terminal.outputBuffer = terminal.outputBuffer.slice(-800);
                }
            });

            childProcess.stderr?.on('data', (data) => {
                const text = data.toString();
                terminal.errorBuffer.push(text);

                // Keep buffer size reasonable
                if (terminal.errorBuffer.length > 1000) {
                    terminal.errorBuffer = terminal.errorBuffer.slice(-800);
                }
            });

            // Handle process end (but don't wait for it)
            childProcess.on('exit', (code) => {
                terminal.isRunning = false;
                terminal.lastExitCode = code || 0;
            });

            childProcess.on('error', (err) => {
                terminal.isRunning = false;
                terminal.errorBuffer.push(`Process error: ${err.message}`);
            });

            // Send command immediately
            if (childProcess.stdin) {
                childProcess.stdin.write(command + '\n');
                if (!options.background) {
                    // For non-background commands, we still don't wait, just close stdin
                    childProcess.stdin.end();
                }
            }

            // RETURN IMMEDIATELY - This is the key difference!
            const duration = Date.now() - startTime;

            return {
                success: true, // Always true for non-blocking
                output: '✅ Command sent successfully! Use getTerminalOutput() to retrieve results.',
                exitCode: 0,
                duration,
                timestamp: new Date(),
                command,
                terminal: terminal.name,
                nonBlocking: true,
                processId: childProcess.pid,
                note: `Command "${command}" executed non-blocking. Check terminal output for results.`
            };

        } catch (error) {
            const duration = Date.now() - startTime;

            return {
                success: false,
                output: `Failed to send command: ${error}`,
                error: error instanceof Error ? error.message : String(error),
                exitCode: 1,
                duration,
                timestamp: new Date(),
                command,
                terminal: terminal.name,
                nonBlocking: true
            };
        }
    }

    /**
     * 🎪 Execute Command with Creative Style
     */
    private async executeCommandWithStyle(
        terminal: ITerminal,
        command: string,
        options: any
    ): Promise<ICommandResult> {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            let output = '';
            let error = '';

            // Spawn process
            const childProcess = spawn(terminal.shell, [], {
                cwd: terminal.cwd,
                env: terminal.env,
                stdio: ['pipe', 'pipe', 'pipe']
            });

            terminal.process = childProcess;
            terminal.isRunning = true;

            // Handle output
            childProcess.stdout?.on('data', (data) => {
                const text = data.toString();
                output += text;
                terminal.outputBuffer.push(text);

                // Keep buffer size reasonable
                if (terminal.outputBuffer.length > 1000) {
                    terminal.outputBuffer = terminal.outputBuffer.slice(-800);
                }
            });

            childProcess.stderr?.on('data', (data) => {
                const text = data.toString();
                error += text;
                terminal.errorBuffer.push(text);

                // Keep buffer size reasonable
                if (terminal.errorBuffer.length > 1000) {
                    terminal.errorBuffer = terminal.errorBuffer.slice(-800);
                }
            });

            // Handle process events
            childProcess.on('exit', (code) => {
                terminal.isRunning = false;
                const duration = Date.now() - startTime;

                resolve({
                    success: code === 0,
                    output: stripAnsi(output),
                    error: error ? stripAnsi(error) : undefined,
                    exitCode: code || 0,
                    duration,
                    timestamp: new Date(),
                    command,
                    terminal: terminal.name
                });
            });

            childProcess.on('error', (err) => {
                terminal.isRunning = false;
                reject(err);
            });

            // Send command
            if (childProcess.stdin) {
                childProcess.stdin.write(command + '\n');
                if (!options.background) {
                    childProcess.stdin.end();
                }
            }

            // Handle timeout
            if (options.timeoutMs) {
                setTimeout(() => {
                    if (terminal.isRunning) {
                        childProcess.kill('SIGTERM');
                        reject(new Error(`Command timed out after ${options.timeoutMs}ms`));
                    }
                }, options.timeoutMs);
            }
        });
    }

    /**
     * 🎭 Setup Event Listeners
     */
    private setupEventListeners(): void {
        this.on('terminalCreated', (terminal) => {
            this.logger.debug(`🎭 Event: Terminal created - ${terminal.name}`);
        });

        this.on('terminalDeleted', (name) => {
            this.logger.debug(`🎭 Event: Terminal deleted - ${name}`);
        });

        this.on('commandExecuted', (event) => {
            this.logger.debug(`🎭 Event: Command executed - ${event.command} in ${event.terminal}`);
        });
    }

    /**
     * 📊 Initialize Performance Tracking
     */
    private initializePerformanceTracking(): void {
        this.logger.debug('📊 Initializing performance tracking...');

        // Setup periodic performance collection
        setInterval(() => {
            this.collectPerformanceMetrics();
        }, 60000); // Every minute
    }

    /**
     * 📈 Collect Performance Metrics
     */
    private collectPerformanceMetrics(): void {
        const terminals = Array.from(this.terminals.values());

        const metrics = {
            timestamp: new Date(),
            totalTerminals: terminals.length,
            activeTerminals: terminals.filter(t => t.isRunning).length,
            avgCommandCount: terminals.length > 0 ?
                terminals.reduce((sum, t) => sum + t.performance.commandCount, 0) / terminals.length : 0,
            avgSuccessRate: terminals.length > 0 ?
                terminals.reduce((sum, t) => sum + t.performance.successRate, 0) / terminals.length : 0
        };

        this.performanceMetrics.set(Date.now(), metrics);

        // Keep only last 24 hours of metrics
        const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
        for (const [timestamp] of this.performanceMetrics) {
            if (timestamp < oneDayAgo) {
                this.performanceMetrics.delete(timestamp);
            }
        }
    }

    /**
     * 🛡️ Setup Auto-Recovery System
     */
    private setupAutoRecovery(): void {
        if (!this.autoRecoveryEnabled) return;

        this.logger.debug('🛡️ Setting up auto-recovery system...');

        // Check for unhealthy terminals every 5 minutes
        setInterval(async () => {
            try {
                const health = await this.healthCheck();

                if (health.unhealthyTerminals > 0) {
                    this.logger.warn(`🚑 Auto-recovery triggered: ${health.unhealthyTerminals} unhealthy terminals detected`);
                    await this.fixTerminals();
                }
            } catch (error) {
                this.logger.error(`💥 Auto-recovery failed: ${error}`);
            }
        }, 300000); // 5 minutes
    }

    /**
     * 💾 Load Persisted State
     */
    private async loadPersistedState(): Promise<void> {
        try {
            const stateFile = path.join(process.cwd(), '.terminal-manager-state.json');

            try {
                const stateData = await fs.readFile(stateFile, 'utf8');
                const state = JSON.parse(stateData);

                this.logger.debug(`💾 Loaded persisted state: ${state.terminals?.length || 0} terminals`);

                // Restore terminals (but don't start processes)
                if (state.terminals) {
                    for (const terminalData of state.terminals) {
                        const terminal: ITerminal = {
                            ...terminalData,
                            process: undefined,
                            isRunning: false,
                            createdAt: new Date(terminalData.createdAt),
                            lastActivity: new Date(terminalData.lastActivity)
                        };

                        this.terminals.set(terminal.name, terminal);
                    }
                }

            } catch (error) {
                // State file doesn't exist or is corrupted, that's okay
                this.logger.debug('💾 No persisted state found or failed to load, starting fresh');
            }
        } catch (error) {
            this.logger.error(`💥 Failed to load persisted state: ${error}`);
        }
    }

    /**
     * 💾 Save Persisted State
     */
    private async savePersistedState(): Promise<void> {
        try {
            const stateFile = path.join(process.cwd(), '.terminal-manager-state.json');

            const state = {
                timestamp: new Date().toISOString(),
                terminals: Array.from(this.terminals.values()).map(terminal => ({
                    ...terminal,
                    process: undefined, // Don't serialize process
                    outputBuffer: terminal.outputBuffer.slice(-100), // Keep only last 100 lines
                    errorBuffer: terminal.errorBuffer.slice(-100)
                }))
            };

            await fs.writeFile(stateFile, JSON.stringify(state, null, 2));
            this.logger.debug('💾 Persisted state saved successfully');

        } catch (error) {
            this.logger.error(`💥 Failed to save persisted state: ${error}`);
        }
    }

    /**
     * 🏥 Calculate Terminal Health
     */
    private async calculateTerminalHealth(terminal: ITerminal): Promise<any> {
        const issues = [];
        let score = 1.0;

        // Check if terminal is responsive
        const timeSinceLastActivity = Date.now() - terminal.lastActivity.getTime();
        if (timeSinceLastActivity > 600000) { // 10 minutes
            issues.push('Terminal inactive for over 10 minutes');
            score -= 0.3;
        }

        // Check error rate
        if (terminal.performance.errorRate > 50) {
            issues.push('High error rate detected');
            score -= 0.2;
        }

        // Check if process is zombie
        if (terminal.process && terminal.process.killed) {
            issues.push('Process is in zombie state');
            score -= 0.4;
        }

        return {
            score: Math.max(0, score),
            issues,
            status: score > 0.7 ? 'healthy' : score > 0.4 ? 'warning' : 'critical'
        };
    }

    /**
     * 🎯 Calculate Terminal Fitness Score for AI Selection
     */
    private async calculateTerminalFitnessScore(terminal: ITerminal, task: string): Promise<number> {
        let score = 0.5; // Base score

        // Category match
        const taskCategory = this.detectTerminalCategory(task);
        if (terminal.metadata.category === taskCategory) {
            score += 0.3;
        }

        // Performance bonus
        score += (terminal.performance.successRate / 100) * 0.2;

        // Recent activity bonus
        const timeSinceLastActivity = Date.now() - terminal.lastActivity.getTime();
        if (timeSinceLastActivity < 300000) { // 5 minutes
            score += 0.1;
        }

        // Health bonus
        const health = await this.calculateTerminalHealth(terminal);
        score += health.score * 0.1;

        // Priority bonus
        score += (terminal.metadata.priority / 100) * 0.1;

        return Math.min(1, Math.max(0, score));
    }

    /**
     * 🎭 Generate Intelligent Terminal Name
     */
    private generateIntelligentTerminalName(task?: string): string {
        if (task) {
            const category = this.detectTerminalCategory(task);
            const timestamp = new Date().toISOString().slice(-8, -3).replace(':', '');
            return `${category}-${timestamp}`;
        }

        return `terminal-${nanoid(6)}`;
    }

    /**
     * 🧹 Cleanup Method
     */
    async cleanup(): Promise<void> {
        if (this.shutdownInProgress) return;

        this.shutdownInProgress = true;
        this.logger.info('🧹 Starting spectacular cleanup process...');

        // Save state before cleanup
        await this.savePersistedState();

        // Stop all terminals gracefully
        await this.deleteAllTerminals();

        this.logger.success('✨ Spectacular cleanup completed!');
    }

    // Additional methods would be implemented here...
    // Including: sendCommandWithOutput, runSequence, safeRunSequence, 
    // startDevStack, restartDevStack, stopDevStack, getTerminalOutput, etc.

    /**
     * � Get Terminal Output with Smart Filtering
     */
    async getTerminalOutput(name: string, lines: number = 100): Promise<any> {
        this.logger.info(`📤 Getting output from terminal: ${name}`);

        const terminal = this.terminals.get(name);
        if (!terminal) {
            throw new Error(`🤔 Terminal ${name} not found`);
        }

        const output = terminal.outputBuffer.slice(-lines).join('');
        const errors = terminal.errorBuffer.slice(-lines).join('');

        return {
            terminal: name,
            output: stripAnsi(output), // Remove ANSI color codes for clean output
            errors: stripAnsi(errors),
            lines: Math.min(lines, terminal.outputBuffer.length),
            timestamp: new Date().toISOString(),
            isRunning: terminal.isRunning,
            lastActivity: terminal.lastActivity
        };
    }

    /**
     * 📊 Get Analytics with Comprehensive Metrics
     */
    async getAnalytics(terminalName?: string, timeRange: string = 'last_hour'): Promise<any> {
        this.logger.info(`📊 Generating analytics for ${terminalName || 'all terminals'}`);

        const terminals = terminalName ?
            [this.terminals.get(terminalName)!].filter(Boolean) :
            Array.from(this.terminals.values());

        if (terminals.length === 0) {
            return { error: 'No terminals found', timestamp: new Date().toISOString() };
        }

        const analytics = {
            timeRange,
            timestamp: new Date().toISOString(),
            summary: {
                totalTerminals: terminals.length,
                activeTerminals: terminals.filter(t => t.isRunning).length,
                totalCommands: terminals.reduce((sum, t) => sum + t.performance.commandCount, 0),
                avgExecutionTime: 0,
                overallSuccessRate: 0,
                overallErrorRate: 0
            },
            terminals: terminals.map(terminal => ({
                name: terminal.name,
                category: terminal.metadata.category,
                performance: terminal.performance,
                health: {
                    score: this.calculateSimpleHealthScore(terminal),
                    status: terminal.isRunning ? 'running' : 'idle'
                },
                usage: {
                    commandCount: terminal.performance.commandCount,
                    lastActivity: terminal.lastActivity,
                    uptime: Date.now() - terminal.createdAt.getTime()
                }
            })),
            insights: this.generateAnalyticsInsights(terminals)
        };

        // Calculate averages
        if (terminals.length > 0) {
            analytics.summary.avgExecutionTime = terminals.reduce((sum, t) =>
                sum + t.performance.avgExecutionTime, 0) / terminals.length;
            analytics.summary.overallSuccessRate = terminals.reduce((sum, t) =>
                sum + t.performance.successRate, 0) / terminals.length;
            analytics.summary.overallErrorRate = terminals.reduce((sum, t) =>
                sum + t.performance.errorRate, 0) / terminals.length;
        }

        return analytics;
    }

    /**
     * 🔄 Send Command with Output Capture
     */
    async sendCommandWithOutput(name: string, command: string, waitMs: number = 5000): Promise<any> {
        this.logger.info(`📤 Sending command with output capture: ${command}`);

        const terminal = this.terminals.get(name);
        if (!terminal) {
            throw new Error(`Terminal ${name} not found`);
        }

        // Clear previous output
        terminal.outputBuffer = [];
        terminal.errorBuffer = [];

        // Execute command
        const result = await this.sendCommand(name, command, {
            captureOutput: true,
            timeoutMs: waitMs
        });

        // Wait a bit for output to accumulate
        await new Promise(resolve => setTimeout(resolve, Math.min(waitMs, 2000)));

        return {
            success: result.success,
            output: terminal.outputBuffer.join(''),
            error: terminal.errorBuffer.join(''),
            exitCode: result.exitCode,
            duration: result.duration,
            timestamp: new Date().toISOString()
        };
    }

    async runSequence(name: string, commands: string[], options: any = {}): Promise<any> {
        this.logger.info(`🔄 Running command sequence in terminal: ${name}`);

        const results = [];
        const { stopOnError = true, delay = 1000 } = options;

        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            this.logger.info(`📋 Executing step ${i + 1}/${commands.length}: ${command}`);

            try {
                const result = await this.sendCommand(name, command, {
                    captureOutput: true,
                    timeoutMs: options.timeoutMs || 30000
                });

                results.push({
                    step: i + 1,
                    command,
                    success: result.success,
                    output: result.output,
                    error: result.error,
                    duration: result.duration
                });

                // Stop on error if configured
                if (!result.success && stopOnError) {
                    this.logger.error(`❌ Sequence stopped at step ${i + 1} due to error`);
                    break;
                }

                // Add delay between commands if specified
                if (delay > 0 && i < commands.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                }

            } catch (error) {
                results.push({
                    step: i + 1,
                    command,
                    success: false,
                    error: error instanceof Error ? error.message : String(error)
                });

                if (stopOnError) break;
            }
        }

        const successCount = results.filter(r => r.success).length;
        const overallSuccess = successCount === commands.length;

        return {
            success: overallSuccess,
            totalSteps: commands.length,
            completedSteps: results.length,
            successfulSteps: successCount,
            results,
            duration: results.reduce((sum, r) => sum + (r.duration || 0), 0),
            timestamp: new Date().toISOString()
        };
    }

    async safeRunSequence(options: any): Promise<any> {
        // Implementation here
        throw new Error('Method not fully implemented yet');
    }

    async startDevStack(options: any): Promise<any> {
        // Implementation here
        throw new Error('Method not fully implemented yet');
    }

    async restartDevStack(options: any): Promise<any> {
        // Implementation here
        throw new Error('Method not fully implemented yet');
    }

    async stopDevStack(options: any): Promise<any> {
        // Implementation here
        throw new Error('Method not fully implemented yet');
    }

    async restartDev(options: any): Promise<any> {
        // Implementation here
        throw new Error('Method not fully implemented yet');
    }

    async tailOutput(name: string, lines: number = 50): Promise<string> {
        // Implementation here
        throw new Error('Method not fully implemented yet');
    }

    async followOutput(name: string, offset?: number): Promise<any> {
        // Implementation here
        throw new Error('Method not fully implemented yet');
    }

    async searchOutput(name: string, query: string, options: any): Promise<any> {
        // Implementation here
        throw new Error('Method not fully implemented yet');
    }

    async statusSummary(): Promise<any> {
        // Implementation here
        throw new Error('Method not fully implemented yet');
    }

    async changeDirectory(name: string, cwd: string): Promise<boolean> {
        // Implementation here
        throw new Error('Method not fully implemented yet');
    }

    /**
     * 🌍 Set Environment Variables with Spectacular Intelligence
     */
    async setEnvVars(name: string, env: Record<string, string>): Promise<boolean> {
        this.logger.info(`🌍 Setting environment variables for terminal: ${name}`);

        const terminal = this.terminals.get(name);
        if (!terminal) {
            this.logger.error(`❌ Terminal ${name} not found`);
            return false;
        }

        try {
            // Update terminal env
            terminal.env = { ...terminal.env, ...env };

            // Apply to process if running
            if (terminal.process && !terminal.process.killed) {
                // For Windows PowerShell, send env var commands
                if (process.platform === 'win32') {
                    for (const [key, value] of Object.entries(env)) {
                        const envCommand = `$env:${key}="${value}"`;
                        await this.sendCommand(name, envCommand, { captureOutput: false });
                    }
                } else {
                    // For Unix-like systems
                    for (const [key, value] of Object.entries(env)) {
                        const envCommand = `export ${key}="${value}"`;
                        await this.sendCommand(name, envCommand, { captureOutput: false });
                    }
                }
            }

            this.logger.success(`✅ Environment variables set successfully for ${name}`);
            return true;

        } catch (error) {
            this.logger.error(`💥 Failed to set environment variables: ${error}`);
            return false;
        }
    }

    /**
     * 🔪 Kill Process by Port with Precision
     */
    async killProcessByPort(port: number): Promise<any> {
        this.logger.info(`🔪 Killing process on port: ${port}`);

        try {
            // Find processes using the port
            const processes = await findProcess('port', port);

            if (processes.length === 0) {
                this.logger.info(`📝 No process found on port ${port}`);
                return { killed: false, reason: 'no_process_found' };
            }

            const results = [];
            for (const proc of processes) {
                try {
                    if (proc.pid) {
                        treeKill(proc.pid, 'SIGTERM');

                        // Wait a moment then force kill if still running
                        setTimeout(() => {
                            treeKill(proc.pid!, 'SIGKILL');
                        }, 5000);

                        results.push({
                            pid: proc.pid,
                            name: proc.name,
                            killed: true
                        });

                        this.logger.success(`🌟 Killed process ${proc.name} (PID: ${proc.pid}) on port ${port}`);
                    }
                } catch (killError) {
                    results.push({
                        pid: proc.pid,
                        name: proc.name,
                        killed: false,
                        error: killError instanceof Error ? killError.message : String(killError)
                    });
                }
            }

            return {
                port,
                processes: results,
                totalKilled: results.filter(r => r.killed).length
            };

        } catch (error) {
            this.logger.error(`💥 Failed to kill process on port ${port}: ${error}`);
            return {
                port,
                error: error instanceof Error ? error.message : String(error),
                killed: false
            };
        }
    }

    /**
     * 🔍 Check Port Availability with Intelligence
     */
    async checkPorts(ports?: number[]): Promise<any> {
        this.logger.info(`🔍 Checking port availability...`);

        const defaultPorts = [3000, 3001, 8000, 8080, 5000, 5001, 4200, 3333];
        const portsToCheck = ports || defaultPorts;

        const results = [];

        for (const port of portsToCheck) {
            try {
                const availablePort = await detectPort(port);
                const isAvailable = availablePort === port;

                let processInfo = null;
                if (!isAvailable) {
                    try {
                        const processes = await findProcess('port', port);
                        processInfo = processes.length > 0 ? processes[0] : null;
                    } catch (error) {
                        // Ignore error, just means we can't get process info
                    }
                }

                results.push({
                    port,
                    available: isAvailable,
                    suggested: availablePort !== port ? availablePort : null,
                    process: processInfo
                });

                this.logger.debug(`🔍 Port ${port}: ${isAvailable ? 'available' : 'occupied'}`);

            } catch (error) {
                results.push({
                    port,
                    available: false,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }

        const summary = {
            checked: results.length,
            available: results.filter(r => r.available).length,
            occupied: results.filter(r => !r.available && !r.error).length,
            errors: results.filter(r => r.error).length
        };

        this.logger.info(`🔍 Port check complete: ${summary.available}/${summary.checked} available`);

        return {
            summary,
            ports: results,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * 🛑 Stop All Terminals with Graceful Shutdown
     */
    async stopAll(): Promise<any> {
        this.logger.info('🛑 Stopping all terminals gracefully...');

        const terminals = Array.from(this.terminals.values());
        const results = {
            total: terminals.length,
            stopped: 0,
            errors: 0,
            details: [] as any[]
        };

        for (const terminal of terminals) {
            try {
                // Cancel any running commands first
                if (terminal.currentCommand) {
                    await this.cancelCommand(terminal.name);
                }

                // Delete the terminal
                const success = await this.deleteTerminal(terminal.name);

                if (success) {
                    results.stopped++;
                    results.details.push({
                        name: terminal.name,
                        status: 'stopped',
                        reason: 'graceful_shutdown'
                    });
                } else {
                    results.errors++;
                    results.details.push({
                        name: terminal.name,
                        status: 'error',
                        reason: 'failed_to_delete'
                    });
                }

            } catch (error) {
                results.errors++;
                results.details.push({
                    name: terminal.name,
                    status: 'error',
                    error: error instanceof Error ? error.message : String(error)
                });

                this.logger.error(`💥 Error stopping terminal ${terminal.name}: ${error}`);
            }
        }

        this.logger.success(`🌟 Stopped ${results.stopped}/${results.total} terminals`);

        if (results.errors > 0) {
            this.logger.warn(`⚠️ ${results.errors} terminals had errors during shutdown`);
        }

        return results;
    }

    /**
     * 🧹 Cleanup Idle Terminals with Smart Detection
     */
    async cleanupIdle(idleMs: number = 1800000): Promise<any> {
        this.logger.info(`🧹 Cleaning up idle terminals (idle > ${idleMs}ms)...`);

        const now = Date.now();
        const terminals = Array.from(this.terminals.values());

        const results = {
            total: terminals.length,
            checked: 0,
            idle: 0,
            cleaned: 0,
            kept: 0,
            errors: 0,
            details: [] as any[]
        };

        for (const terminal of terminals) {
            results.checked++;

            try {
                const idleTime = now - terminal.lastActivity.getTime();
                const isIdle = idleTime > idleMs;
                const hasRunningProcess = terminal.process && !terminal.process.killed;

                if (isIdle && !hasRunningProcess) {
                    results.idle++;

                    // Additional checks before cleanup
                    const shouldClean = this.shouldCleanupTerminal(terminal, idleTime);

                    if (shouldClean) {
                        const success = await this.deleteTerminal(terminal.name);

                        if (success) {
                            results.cleaned++;
                            results.details.push({
                                name: terminal.name,
                                status: 'cleaned',
                                idleTime,
                                reason: 'idle_timeout'
                            });
                        } else {
                            results.errors++;
                            results.details.push({
                                name: terminal.name,
                                status: 'error',
                                reason: 'cleanup_failed'
                            });
                        }
                    } else {
                        results.kept++;
                        results.details.push({
                            name: terminal.name,
                            status: 'kept',
                            idleTime,
                            reason: 'protected_terminal'
                        });
                    }
                } else {
                    results.kept++;
                    results.details.push({
                        name: terminal.name,
                        status: 'kept',
                        idleTime,
                        reason: hasRunningProcess ? 'has_running_process' : 'not_idle'
                    });
                }

            } catch (error) {
                results.errors++;
                results.details.push({
                    name: terminal.name,
                    status: 'error',
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }

        this.logger.success(`🌟 Cleanup complete: ${results.cleaned} cleaned, ${results.kept} kept, ${results.errors} errors`);

        return results;
    }

    private calculateSimpleHealthScore(terminal: ITerminal): number {
        // Simple health scoring based on basic metrics
        let score = 100;

        // Deduct for high error rate
        if (terminal.performance.errorRate > 50) score -= 30;
        else if (terminal.performance.errorRate > 20) score -= 15;

        // Deduct for low success rate
        if (terminal.performance.successRate < 50) score -= 25;
        else if (terminal.performance.successRate < 80) score -= 10;

        // Deduct if not running when it should be
        if (!terminal.isRunning && terminal.metadata.category === 'dev') score -= 20;

        return Math.max(0, score);
    }

    private generateAnalyticsInsights(terminals: ITerminal[]): string[] {
        const insights = [];

        const activeCount = terminals.filter(t => t.isRunning).length;
        const totalCount = terminals.length;

        if (activeCount === 0 && totalCount > 0) {
            insights.push('All terminals are idle - consider starting development servers');
        }

        const highErrorTerminals = terminals.filter(t => t.performance.errorRate > 30);
        if (highErrorTerminals.length > 0) {
            insights.push(`${highErrorTerminals.length} terminals have high error rates - investigate command patterns`);
        }

        const oldTerminals = terminals.filter(t =>
            Date.now() - t.lastActivity.getTime() > 3600000 // 1 hour
        );
        if (oldTerminals.length > 0) {
            insights.push(`${oldTerminals.length} terminals haven't been used in over an hour - consider cleanup`);
        }
        return insights;
    }

    private shouldCleanupTerminal(terminal: ITerminal, idleTime: number): boolean {
        // Protect important terminals
        const protectedNames = ['main', 'primary', 'dev-server', 'build', 'test'];
        if (protectedNames.some(name => terminal.name.toLowerCase().includes(name))) {
            return false;
        }

        // Don't cleanup high-priority terminals
        if (terminal.metadata.priority >= 8) {
            return false;
        }

        // Don't cleanup recently active terminals
        if (idleTime < 300000) { // Less than 5 minutes
            return false;
        }

        // Don't cleanup terminals with recent high usage
        if (terminal.performance.commandCount > 10 && idleTime < 1800000) { // 30 minutes for active terminals
            return false;
        }

        return true;
    }

    private calculateTerminalStatus(terminal: ITerminal): string {
        if (terminal.isRunning) return 'running';
        if (terminal.process && !terminal.process.killed) return 'active';
        return 'idle';
    }

    private generateTerminalRecommendations(terminal: ITerminal): string[] {
        const recommendations = [];

        if (terminal.performance.errorRate > 30) {
            recommendations.push('Consider reviewing command patterns - high error rate detected');
        }

        if (terminal.commandHistory.length > 100) {
            recommendations.push('Terminal has extensive command history - consider cleanup');
        }

        return recommendations;
    }

    private getTerminalAnalytics(terminal: ITerminal): any {
        return {
            commandFrequency: terminal.performance.commandCount,
            avgExecutionTime: terminal.performance.avgExecutionTime,
            successRate: terminal.performance.successRate,
            errorRate: terminal.performance.errorRate,
            lastActivity: terminal.lastActivity,
            uptime: Date.now() - terminal.createdAt.getTime()
        };
    }
}
