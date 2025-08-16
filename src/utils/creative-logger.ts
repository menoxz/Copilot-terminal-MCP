/**
 * 🎨 CREATIVE LOGGER - Spectacular Logging with Style and Intelligence
 * 
 * This creative logger brings color, style, and personality to terminal management.
 * It's designed to make debugging and monitoring a delightful experience with
 * beautiful formatting, intelligent categorization, and spectacular visual effects.
 * 
 * Features:
 * - 🌈 Rainbow colors and creative formatting
 * - ⚡ Lightning-fast performance logging
 * - 🎭 Contextual emoji integration
 * - 📊 Intelligent log categorization
 * - 🎪 Spectacular visual effects
 * - 💾 Persistent logging with rotation
 * 
 * @author Super Agent Ultra 2025
 */

import chalk from 'chalk';
import { writeFile, appendFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import * as path from 'path';

/**
 * 🎭 Log Level Enum with Creative Styling
 */
export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    SUCCESS = 2,
    WARN = 3,
    ERROR = 4,
    SPECTACULAR = 5
}

/**
 * 🎨 Log Entry Interface
 */
interface ILogEntry {
    timestamp: Date;
    level: LogLevel;
    category: string;
    message: string;
    metadata?: any;
    duration?: number;
    stackTrace?: string;
}

/**
 * 🌟 Creative Logger Class - Where Logging Meets Art
 */
export class CreativeLogger {
    private category: string;
    private logLevel: LogLevel;
    private entries: ILogEntry[] = [];
    private logFile?: string;
    private colorEnabled: boolean = true;
    private isMCPMode: boolean = false;
    private performanceTracker = new Map<string, number>();

    // 🎨 Creative Color Palette
    private readonly COLORS = {
        debug: chalk.gray,
        info: chalk.blue,
        success: chalk.green,
        warn: chalk.yellow,
        error: chalk.red,
        spectacular: chalk.magenta.bold,
        highlight: chalk.cyan.bold,
        subtle: chalk.gray.dim,
        rainbow: [
            chalk.red,
            chalk.yellow,
            chalk.green,
            chalk.cyan,
            chalk.blue,
            chalk.magenta
        ]
    };

    // 🎭 Emoji Collection for Different Contexts
    private readonly EMOJIS = {
        debug: '🔍',
        info: 'ℹ️',
        success: '✅',
        warn: '⚠️',
        error: '❌',
        spectacular: '🌟',
        performance: '⚡',
        memory: '🧠',
        network: '🌐',
        security: '🔒',
        database: '🗄️',
        api: '🔌',
        terminal: '💻',
        process: '⚙️',
        file: '📁',
        config: '🔧'
    };

    constructor(category: string, options: {
        logLevel?: LogLevel;
        logFile?: string;
        colorEnabled?: boolean;
    } = {}) {
        this.category = category;
        this.logLevel = options.logLevel ?? LogLevel.INFO;
        this.logFile = options.logFile;

        // 🎯 Detect MCP mode - disable colors and console output
        this.isMCPMode = process.argv.some(arg => arg.includes('stdio')) ||
            process.env.NODE_ENV === 'mcp' ||
            process.stdout.isTTY === false ||
            process.env.MCP_MODE === 'true';

        this.colorEnabled = this.isMCPMode ? false : (options.colorEnabled ?? true);

        // Only log initialization in non-MCP mode
        this.setupFileLogging();
        if (!this.isMCPMode) {
            this.info(`🎪 Creative Logger initialized for category: ${category}`);
        }
    }

    /**
     * 🔍 Debug Level Logging
     */
    debug(message: string, metadata?: any): void {
        this.log(LogLevel.DEBUG, message, metadata);
    }

    /**
     * ℹ️ Info Level Logging
     */
    info(message: string, metadata?: any): void {
        this.log(LogLevel.INFO, message, metadata);
    }

    /**
     * ✅ Success Level Logging
     */
    success(message: string, metadata?: any): void {
        this.log(LogLevel.SUCCESS, message, metadata);
    }

    /**
     * ⚠️ Warning Level Logging
     */
    warn(message: string, metadata?: any): void {
        this.log(LogLevel.WARN, message, metadata);
    }

    /**
     * ❌ Error Level Logging
     */
    error(message: string, error?: Error | any, metadata?: any): void {
        const entry: ILogEntry = {
            timestamp: new Date(),
            level: LogLevel.ERROR,
            category: this.category,
            message,
            metadata,
            stackTrace: error?.stack
        };

        this.addEntry(entry);
        this.formatAndOutput(entry);
    }

    /**
     * 🌟 Spectacular Level Logging - For Special Moments
     */
    spectacular(message: string, metadata?: any): void {
        this.log(LogLevel.SPECTACULAR, message, metadata);
    }

    /**
     * 🌈 Rainbow Text Effect
     */
    rainbow(message: string): void {
        // 🚫 Skip in MCP mode
        if (this.isMCPMode || !this.colorEnabled) {
            return; // No output in MCP mode
        }

        const colors = this.COLORS.rainbow;
        let colorIndex = 0;
        let output = '';

        for (const char of message) {
            if (char === ' ') {
                output += char;
            } else {
                output += colors[colorIndex % colors.length](char);
                colorIndex++;
            }
        }

        console.log(output);
    }

    /**
     * ⚡ Performance Timing
     */
    startTimer(operation: string): void {
        this.performanceTracker.set(operation, Date.now());
    }

    endTimer(operation: string, message?: string): number {
        const startTime = this.performanceTracker.get(operation);
        if (!startTime) {
            this.warn(`⚡ Timer not found for operation: ${operation}`);
            return 0;
        }

        const duration = Date.now() - startTime;
        this.performanceTracker.delete(operation);

        const logMessage = message || `Operation '${operation}' completed`;
        this.info(`${this.EMOJIS.performance} ${logMessage} in ${this.formatDuration(duration)}`);

        return duration;
    }

    /**
     * 📊 Log Statistics
     */
    getStats(): any {
        const stats = {
            totalEntries: this.entries.length,
            byLevel: {} as Record<string, number>,
            last24Hours: 0,
            avgEntriesPerHour: 0,
            topCategories: {} as Record<string, number>
        };

        // Count by level
        for (const level of Object.values(LogLevel)) {
            if (typeof level === 'number') {
                stats.byLevel[LogLevel[level]] = this.entries.filter(e => e.level === level).length;
            }
        }

        // Last 24 hours
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        stats.last24Hours = this.entries.filter(e => e.timestamp > oneDayAgo).length;
        stats.avgEntriesPerHour = stats.last24Hours / 24;

        return stats;
    }

    /**
     * 🎭 Create Contextual Logger
     */
    createContextual(context: string): CreativeLogger {
        return new CreativeLogger(`${this.category}:${context}`, {
            logLevel: this.logLevel,
            colorEnabled: this.colorEnabled
        });
    }

    /**
     * 🧹 Cleanup Old Logs
     */
    async cleanup(daysToKeep: number = 7): Promise<void> {
        const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);
        const initialCount = this.entries.length;

        this.entries = this.entries.filter(entry => entry.timestamp > cutoffDate);

        const removedCount = initialCount - this.entries.length;
        if (removedCount > 0) {
            this.info(`🧹 Cleaned up ${removedCount} old log entries`);
        }
    }

    // ==========================================
    // 🎨 PRIVATE CREATIVE METHODS
    // ==========================================

    /**
     * 📝 Core Logging Method
     */
    private log(level: LogLevel, message: string, metadata?: any): void {
        if (level < this.logLevel) return;

        const entry: ILogEntry = {
            timestamp: new Date(),
            level,
            category: this.category,
            message,
            metadata
        };

        this.addEntry(entry);
        this.formatAndOutput(entry);
    }

    /**
     * 💾 Add Entry to Memory and File
     */
    private addEntry(entry: ILogEntry): void {
        this.entries.push(entry);

        // Keep memory usage reasonable
        if (this.entries.length > 10000) {
            this.entries = this.entries.slice(-8000);
        }

        // Write to file if configured
        if (this.logFile) {
            this.writeToFile(entry).catch(error => {
                console.error(`Failed to write to log file: ${error.message}`);
            });
        }
    }

    /**
     * 🎨 Format and Output to Console
     */
    private formatAndOutput(entry: ILogEntry): void {
        // 🚫 Skip console output in MCP mode to avoid interference with JSON protocol
        if (this.isMCPMode) {
            return; // Only write to file, no console output
        }

        const timestamp = entry.timestamp.toISOString().slice(11, 23);
        const levelName = LogLevel[entry.level];

        if (!this.colorEnabled) {
            console.log(`[${timestamp}] ${levelName} ${entry.category}: ${entry.message}`);
            return;
        }

        // Select color and emoji based on level
        const color = this.getColorForLevel(entry.level);
        const emoji = this.getEmojiForLevel(entry.level);

        // Format message with style
        const formattedMessage = this.formatMessage(entry);

        // Output with creative styling
        console.log(
            chalk.gray(`[${timestamp}]`) + ' ' +
            color(`${emoji} ${levelName}`) + ' ' +
            this.COLORS.subtle(`${entry.category}:`) + ' ' +
            formattedMessage
        );

        // Add metadata if present
        if (entry.metadata) {
            console.log(this.COLORS.subtle('  └─ Metadata:'),
                chalk.gray(JSON.stringify(entry.metadata, null, 2)));
        }

        // Add stack trace for errors
        if (entry.stackTrace && entry.level === LogLevel.ERROR) {
            console.log(this.COLORS.error('  └─ Stack Trace:'));
            console.log(chalk.gray(entry.stackTrace));
        }
    }

    /**
     * 🎨 Get Color for Log Level
     */
    private getColorForLevel(level: LogLevel): any {
        switch (level) {
            case LogLevel.DEBUG: return this.COLORS.debug;
            case LogLevel.INFO: return this.COLORS.info;
            case LogLevel.SUCCESS: return this.COLORS.success;
            case LogLevel.WARN: return this.COLORS.warn;
            case LogLevel.ERROR: return this.COLORS.error;
            case LogLevel.SPECTACULAR: return this.COLORS.spectacular;
            default: return this.COLORS.info;
        }
    }

    /**
     * 🎭 Get Emoji for Log Level
     */
    private getEmojiForLevel(level: LogLevel): string {
        switch (level) {
            case LogLevel.DEBUG: return this.EMOJIS.debug;
            case LogLevel.INFO: return this.EMOJIS.info;
            case LogLevel.SUCCESS: return this.EMOJIS.success;
            case LogLevel.WARN: return this.EMOJIS.warn;
            case LogLevel.ERROR: return this.EMOJIS.error;
            case LogLevel.SPECTACULAR: return this.EMOJIS.spectacular;
            default: return this.EMOJIS.info;
        }
    }

    /**
     * 🎨 Format Message with Intelligence
     */
    private formatMessage(entry: ILogEntry): string {
        let message = entry.message;

        // Highlight important keywords
        const keywords = ['terminal', 'command', 'process', 'error', 'success', 'failed', 'completed'];

        for (const keyword of keywords) {
            const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
            message = message.replace(regex, (match) => this.COLORS.highlight(match));
        }

        // Highlight numbers
        message = message.replace(/\b\d+(\.\d+)?\b/g, (match) => this.COLORS.highlight(match));

        // Highlight quoted strings
        message = message.replace(/'([^']+)'/g, (match, content) => this.COLORS.highlight(`'${content}'`));
        message = message.replace(/"([^"]+)"/g, (match, content) => this.COLORS.highlight(`"${content}"`));

        return message;
    }

    /**
     * ⏱️ Format Duration
     */
    private formatDuration(ms: number): string {
        if (ms < 1000) {
            return `${ms}ms`;
        } else if (ms < 60000) {
            return `${(ms / 1000).toFixed(2)}s`;
        } else {
            return `${(ms / 60000).toFixed(2)}m`;
        }
    }

    /**
     * 💾 Setup File Logging
     */
    private async setupFileLogging(): Promise<void> {
        if (!this.logFile) return;

        try {
            const logDir = path.dirname(this.logFile);

            if (!existsSync(logDir)) {
                await mkdir(logDir, { recursive: true });
            }
        } catch (error) {
            console.error(`Failed to setup log file: ${error}`);
        }
    }

    /**
     * 📝 Write to File
     */
    private async writeToFile(entry: ILogEntry): Promise<void> {
        if (!this.logFile) return;

        const logLine = JSON.stringify({
            ...entry,
            timestamp: entry.timestamp.toISOString()
        }) + '\n';

        try {
            await appendFile(this.logFile, logLine);
        } catch (error) {
            // Fail silently to avoid infinite recursion
            console.error(`Failed to write to log file: ${error}`);
        }
    }
}
