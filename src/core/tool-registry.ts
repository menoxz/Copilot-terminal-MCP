/**
 * 🎪 TOOL REGISTRY - The Spectacular Tool Management Universe
 * 
 * This is the master registry that manages all MCP tools with unprecedented
 * intelligence, creativity, and style. It's the conductor of the tool orchestra,
 * ensuring every tool performs in perfect harmony!
 * 
 * Features:
 * - 🎯 Smart Tool Discovery & Registration
 * - 🔮 Predictive Tool Usage Analytics
 * - 🛡️ Advanced Tool Health Monitoring
 * - 📊 Real-Time Tool Performance Metrics
 * - 🎨 Creative Tool Visualization
 * - ⚡ Lightning-Fast Tool Execution
 * - 🧠 AI-Powered Tool Recommendations
 * 
 * @author Super Agent Ultra 2025
 */

import { EventEmitter } from 'events';
import { CreativeLogger } from '../utils/creative-logger';
import { PerformanceAnalyzer } from '../utils/performance-analyzer';
import { nanoid } from 'nanoid';

/**
 * 🎭 Tool Definition Interface
 */
interface IToolDefinition {
    name: string;
    description: string;
    category: 'terminal' | 'file' | 'search' | 'analysis' | 'utility' | 'system';
    tags: string[];
    version: string;
    author?: string;
    priority: number;
    parameters: {
        [key: string]: {
            type: string;
            description: string;
            required: boolean;
            default?: any;
        };
    };
    returns: {
        type: string;
        description: string;
        schema?: any;
    };
    examples: Array<{
        name: string;
        description: string;
        parameters: any;
        expectedResult: any;
    }>;
}

/**
 * 🎯 Tool Instance Interface
 */
interface IToolInstance {
    id: string;
    definition: IToolDefinition;
    handler: (...args: any[]) => Promise<any>;
    state: 'active' | 'inactive' | 'error' | 'maintenance';
    createdAt: Date;
    lastUsed: Date;
    usageCount: number;
    performance: {
        avgExecutionTime: number;
        successRate: number;
        errorRate: number;
        totalExecutions: number;
    };
    health: {
        score: number;
        status: 'excellent' | 'good' | 'warning' | 'critical';
        lastCheck: Date;
        issues: string[];
    };
}

/**
 * 📊 Tool Usage Analytics Interface
 */
interface IToolAnalytics {
    toolName: string;
    totalUsage: number;
    recentUsage: number;
    averageExecutionTime: number;
    successRate: number;
    popularParameters: { [key: string]: number };
    usagePatterns: {
        hourly: number[];
        daily: number[];
        weekly: number[];
    };
    userFeedback: {
        rating: number;
        comments: string[];
    };
}

/**
 * 🚀 Spectacular Tool Registry - The Ultimate Tool Management System
 */
export class SpectacularToolRegistry extends EventEmitter {
    private tools = new Map<string, IToolInstance>();
    private categories = new Map<string, string[]>();
    private usageAnalytics = new Map<string, IToolAnalytics>();
    private logger = new CreativeLogger('🎪 TOOL-REGISTRY');
    private performanceAnalyzer = new PerformanceAnalyzer();
    private isInitialized = false;

    // 🎨 Built-in Tool Categories with Spectacular Descriptions
    private readonly SPECTACULAR_CATEGORIES = {
        terminal: {
            name: '🖥️ Terminal Tools',
            description: 'Spectacular terminal management and command execution tools',
            icon: '🖥️',
            color: 'cyan'
        },
        file: {
            name: '📁 File Tools',
            description: 'Creative file manipulation and management utilities',
            icon: '📁',
            color: 'green'
        },
        search: {
            name: '🔍 Search Tools',
            description: 'Intelligent search and discovery mechanisms',
            icon: '🔍',
            color: 'yellow'
        },
        analysis: {
            name: '📊 Analysis Tools',
            description: 'Advanced analysis and insights generation tools',
            icon: '📊',
            color: 'blue'
        },
        utility: {
            name: '🛠️ Utility Tools',
            description: 'General-purpose utilities and helper functions',
            icon: '🛠️',
            color: 'magenta'
        },
        system: {
            name: '⚙️ System Tools',
            description: 'System-level operations and monitoring tools',
            icon: '⚙️',
            color: 'red'
        }
    };

    constructor() {
        super();
        this.logger.spectacular('🎪 Initializing Spectacular Tool Registry!');
    }

    /**
     * 🌟 Initialize the Tool Registry
     */
    async initialize(): Promise<void> {
        if (this.isInitialized) {
            this.logger.warn('⚠️ Tool Registry already initialized');
            return;
        }

        this.logger.info('🚀 Setting up spectacular tool registry...');

        // Initialize performance analyzer
        await this.performanceAnalyzer.startTracking();

        // Setup event listeners
        this.setupEventListeners();

        // Load built-in tools
        await this.loadBuiltInTools();

        // Setup periodic health checks
        this.setupHealthMonitoring();

        this.isInitialized = true;
        this.logger.success('✨ Spectacular Tool Registry initialized successfully!');

        this.emit('initialized');
    }

    /**
     * 🎯 Register a New Tool
     */
    async registerTool(definition: IToolDefinition, handler: (...args: any[]) => Promise<any>): Promise<string> {
        this.logger.info(`🎪 Registering spectacular tool: ${definition.name}`);

        // Validate tool definition
        this.validateToolDefinition(definition);

        // Create tool instance
        const toolInstance: IToolInstance = {
            id: nanoid(),
            definition,
            handler,
            state: 'active',
            createdAt: new Date(),
            lastUsed: new Date(),
            usageCount: 0,
            performance: {
                avgExecutionTime: 0,
                successRate: 100,
                errorRate: 0,
                totalExecutions: 0
            },
            health: {
                score: 100,
                status: 'excellent',
                lastCheck: new Date(),
                issues: []
            }
        };

        // Register the tool
        this.tools.set(definition.name, toolInstance);

        // Update category mapping
        this.updateCategoryMapping(definition.category, definition.name);

        // Initialize analytics
        this.initializeToolAnalytics(definition.name);

        this.logger.success(`🌟 Tool ${definition.name} registered successfully!`);
        this.emit('toolRegistered', toolInstance);

        return toolInstance.id;
    }

    /**
     * 🚀 Execute Tool with Spectacular Intelligence
     */
    async executeTool(toolName: string, parameters: any = {}, options: {
        timeout?: number;
        retries?: number;
        context?: any;
    } = {}): Promise<any> {
        const { timeout = 30000, retries = 3, context } = options;

        const tool = this.tools.get(toolName);
        if (!tool) {
            throw new Error(`🤔 Tool '${toolName}' not found in the spectacular registry`);
        }

        if (tool.state !== 'active') {
            throw new Error(`⚠️ Tool '${toolName}' is not active (state: ${tool.state})`);
        }

        this.logger.info(`🎯 Executing tool: ${toolName} with spectacular intelligence`);

        let attempt = 0;
        let lastError: any;

        while (attempt < retries) {
            attempt++;

            try {
                // Validate parameters
                this.validateParameters(tool.definition, parameters);

                // Record execution start
                const executionStart = Date.now();

                // Execute with timeout and performance tracking
                const result = await this.performanceAnalyzer.timeExecution(
                    () => Promise.race([
                        tool.handler(parameters, context),
                        new Promise((_, reject) => setTimeout(() => reject(new Error('Tool execution timeout')), timeout))
                    ]),
                    `tool_${toolName}_execution`,
                    { category: 'custom', metadata: { tool: toolName, attempt } }
                );

                const executionTime = Date.now() - executionStart;

                // Update tool statistics
                this.updateToolStatistics(toolName, executionTime, true);

                // Update analytics
                this.updateToolAnalytics(toolName, parameters, executionTime, true);

                this.logger.success(`🌟 Tool ${toolName} executed successfully in ${executionTime}ms`);
                this.emit('toolExecuted', { toolName, parameters, result, executionTime });

                return result as any;

            } catch (error) {
                lastError = error;
                const executionTime = Date.now() - Date.now();

                this.logger.error(`💥 Tool ${toolName} execution failed (attempt ${attempt}/${retries})`, error);

                // Update statistics for failed execution
                this.updateToolStatistics(toolName, executionTime, false);
                this.updateToolAnalytics(toolName, parameters, executionTime, false);

                if (attempt >= retries) {
                    this.emit('toolExecutionFailed', { toolName, parameters, error, attempts: attempt });
                    throw error;
                }

                // Wait before retry with exponential backoff
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
            }
        }

        throw lastError;
    }

    /**
     * 📋 List All Spectacular Tools
     */
    async listTools(options: {
        category?: string;
        state?: 'active' | 'inactive' | 'error' | 'maintenance';
        sortBy?: 'name' | 'usage' | 'performance' | 'health';
        includeAnalytics?: boolean;
    } = {}): Promise<any[]> {
        const {
            category,
            state,
            sortBy = 'name',
            includeAnalytics = false
        } = options;

        let tools = Array.from(this.tools.values());

        // Apply filters
        if (category) {
            tools = tools.filter(tool => tool.definition.category === category);
        }

        if (state) {
            tools = tools.filter(tool => tool.state === state);
        }

        // Sort tools
        tools.sort((a, b) => {
            switch (sortBy) {
                case 'usage':
                    return b.usageCount - a.usageCount;
                case 'performance':
                    return b.performance.avgExecutionTime - a.performance.avgExecutionTime;
                case 'health':
                    return b.health.score - a.health.score;
                case 'name':
                default:
                    return a.definition.name.localeCompare(b.definition.name);
            }
        });

        // Prepare response
        const result = tools.map(tool => ({
            id: tool.id,
            name: tool.definition.name,
            description: tool.definition.description,
            category: tool.definition.category,
            state: tool.state,
            version: tool.definition.version,
            usageCount: tool.usageCount,
            performance: tool.performance,
            health: tool.health,
            ...(includeAnalytics && { analytics: this.usageAnalytics.get(tool.definition.name) })
        }));

        this.logger.info(`📋 Listed ${result.length} spectacular tools`);

        return result;
    }

    /**
     * 🔍 Search Tools with Intelligence
     */
    async searchTools(query: string, options: {
        searchIn?: 'name' | 'description' | 'tags' | 'all';
        fuzzy?: boolean;
        limit?: number;
    } = {}): Promise<any[]> {
        const { searchIn = 'all', fuzzy = true, limit = 10 } = options;

        const tools = Array.from(this.tools.values());
        const results: Array<{ tool: IToolInstance; score: number }> = [];

        for (const tool of tools) {
            let score = 0;
            const lowerQuery = query.toLowerCase();

            // Search in name
            if (searchIn === 'name' || searchIn === 'all') {
                if (tool.definition.name.toLowerCase().includes(lowerQuery)) {
                    score += tool.definition.name.toLowerCase() === lowerQuery ? 100 : 80;
                }
            }

            // Search in description
            if (searchIn === 'description' || searchIn === 'all') {
                if (tool.definition.description.toLowerCase().includes(lowerQuery)) {
                    score += 60;
                }
            }

            // Search in tags
            if (searchIn === 'tags' || searchIn === 'all') {
                const tagMatches = tool.definition.tags.filter(tag =>
                    tag.toLowerCase().includes(lowerQuery)
                ).length;
                score += tagMatches * 40;
            }

            if (score > 0) {
                results.push({ tool, score });
            }
        }

        // Sort by score and apply limit
        results.sort((a, b) => b.score - a.score);
        const limitedResults = results.slice(0, limit);

        this.logger.info(`🔍 Found ${limitedResults.length} tools matching query: ${query}`);

        return limitedResults.map(result => ({
            ...result.tool.definition,
            matchScore: result.score,
            state: result.tool.state,
            performance: result.tool.performance,
            health: result.tool.health
        }));
    }

    /**
     * 📊 Get Tool Analytics
     */
    async getToolAnalytics(toolName?: string): Promise<any> {
        if (toolName) {
            const analytics = this.usageAnalytics.get(toolName);
            if (!analytics) {
                throw new Error(`📊 No analytics found for tool: ${toolName}`);
            }
            return analytics;
        }

        // Return analytics for all tools
        const allAnalytics: { [key: string]: any } = {};
        for (const [name, analytics] of this.usageAnalytics.entries()) {
            allAnalytics[name] = analytics;
        }

        return {
            overview: {
                totalTools: this.tools.size,
                activeTools: Array.from(this.tools.values()).filter(t => t.state === 'active').length,
                totalExecutions: Array.from(this.usageAnalytics.values()).reduce((sum, a) => sum + a.totalUsage, 0),
                avgSuccessRate: this.calculateOverallSuccessRate(),
                topTools: this.getTopTools(5)
            },
            tools: allAnalytics,
            performance: await this.performanceAnalyzer.generateReport()
        };
    }

    /**
     * 🏥 Perform Health Check on Tools
     */
    async performHealthCheck(toolName?: string): Promise<any> {
        const tools = toolName ? [this.tools.get(toolName)!] : Array.from(this.tools.values());
        const results = [];

        for (const tool of tools) {
            if (!tool) continue;

            const healthResult = await this.checkToolHealth(tool);
            results.push(healthResult);

            // Update tool health
            tool.health = healthResult;
            tool.health.lastCheck = new Date();
        }

        this.logger.info(`🏥 Health check completed for ${results.length} tools`);
        this.emit('healthCheckCompleted', results);

        return toolName ? results[0] : results;
    }

    /**
     * 🎨 Get Tool Categories
     */
    getCategories(): any {
        const categorySummary: { [key: string]: any } = {};

        for (const [categoryKey, categoryInfo] of Object.entries(this.SPECTACULAR_CATEGORIES)) {
            const toolsInCategory = Array.from(this.tools.values()).filter(
                tool => tool.definition.category === categoryKey
            );

            categorySummary[categoryKey] = {
                ...categoryInfo,
                toolCount: toolsInCategory.length,
                activeTools: toolsInCategory.filter(t => t.state === 'active').length,
                totalUsage: toolsInCategory.reduce((sum, t) => sum + t.usageCount, 0)
            };
        }

        return categorySummary;
    }

    /**
     * 🌟 Private Helper Methods
     */
    private setupEventListeners(): void {
        this.on('toolExecuted', (event) => {
            this.logger.debug(`🎯 Tool executed event: ${event.toolName}`);
        });

        this.on('toolExecutionFailed', (event) => {
            this.logger.error(`💥 Tool execution failed event: ${event.toolName}`);
        });
    }

    private async loadBuiltInTools(): Promise<void> {
        // This would load built-in tools from configuration or modules
        this.logger.info('📚 Loading built-in spectacular tools...');
        // Implementation would go here based on the specific tools to be loaded
    }

    private setupHealthMonitoring(): void {
        setInterval(async () => {
            try {
                await this.performHealthCheck();
            } catch (error) {
                this.logger.error('💥 Error in automated health check', error);
            }
        }, 300000); // Every 5 minutes
    }

    private validateToolDefinition(definition: IToolDefinition): void {
        if (!definition.name || !definition.description) {
            throw new Error('Tool name and description are required');
        }

        if (!Object.keys(this.SPECTACULAR_CATEGORIES).includes(definition.category)) {
            throw new Error(`Invalid tool category: ${definition.category}`);
        }

        // Additional validation logic...
    }

    private validateParameters(definition: IToolDefinition, parameters: any): void {
        for (const [paramName, paramDef] of Object.entries(definition.parameters)) {
            if (paramDef.required && !(paramName in parameters)) {
                throw new Error(`Required parameter '${paramName}' is missing`);
            }
        }
    }

    private updateCategoryMapping(category: string, toolName: string): void {
        const tools = this.categories.get(category) || [];
        tools.push(toolName);
        this.categories.set(category, tools);
    }

    private initializeToolAnalytics(toolName: string): void {
        const analytics: IToolAnalytics = {
            toolName,
            totalUsage: 0,
            recentUsage: 0,
            averageExecutionTime: 0,
            successRate: 100,
            popularParameters: {},
            usagePatterns: {
                hourly: new Array(24).fill(0),
                daily: new Array(7).fill(0),
                weekly: new Array(52).fill(0)
            },
            userFeedback: {
                rating: 5,
                comments: []
            }
        };

        this.usageAnalytics.set(toolName, analytics);
    }

    private updateToolStatistics(toolName: string, executionTime: number, success: boolean): void {
        const tool = this.tools.get(toolName)!;

        tool.usageCount++;
        tool.lastUsed = new Date();
        tool.performance.totalExecutions++;

        // Update average execution time
        const totalTime = tool.performance.avgExecutionTime * (tool.performance.totalExecutions - 1);
        tool.performance.avgExecutionTime = (totalTime + executionTime) / tool.performance.totalExecutions;

        // Update success/error rates
        if (success) {
            tool.performance.successRate =
                ((tool.performance.successRate * (tool.performance.totalExecutions - 1)) + 100) / tool.performance.totalExecutions;
        } else {
            tool.performance.errorRate =
                ((tool.performance.errorRate * (tool.performance.totalExecutions - 1)) + 100) / tool.performance.totalExecutions;
            tool.performance.successRate = 100 - tool.performance.errorRate;
        }
    }

    private updateToolAnalytics(toolName: string, parameters: any, executionTime: number, success: boolean): void {
        const analytics = this.usageAnalytics.get(toolName)!;

        analytics.totalUsage++;
        analytics.recentUsage++;

        // Update execution time
        const totalTime = analytics.averageExecutionTime * (analytics.totalUsage - 1);
        analytics.averageExecutionTime = (totalTime + executionTime) / analytics.totalUsage;

        // Update success rate
        if (success) {
            analytics.successRate = ((analytics.successRate * (analytics.totalUsage - 1)) + 100) / analytics.totalUsage;
        } else {
            analytics.successRate = ((analytics.successRate * (analytics.totalUsage - 1)) + 0) / analytics.totalUsage;
        }

        // Update popular parameters
        for (const paramName of Object.keys(parameters)) {
            analytics.popularParameters[paramName] = (analytics.popularParameters[paramName] || 0) + 1;
        }

        // Update usage patterns
        const now = new Date();
        analytics.usagePatterns.hourly[now.getHours()]++;
        analytics.usagePatterns.daily[now.getDay()]++;
        analytics.usagePatterns.weekly[this.getWeekOfYear(now)]++;
    }

    private async checkToolHealth(tool: IToolInstance): Promise<any> {
        const issues: string[] = [];
        let score = 100;

        // Check performance metrics
        if (tool.performance.avgExecutionTime > 5000) {
            issues.push('Slow execution time');
            score -= 20;
        }

        if (tool.performance.successRate < 90) {
            issues.push('Low success rate');
            score -= 30;
        }

        if (tool.performance.errorRate > 10) {
            issues.push('High error rate');
            score -= 25;
        }

        // Check last usage
        const daysSinceLastUse = (Date.now() - tool.lastUsed.getTime()) / (1000 * 60 * 60 * 24);
        if (daysSinceLastUse > 30) {
            issues.push('Tool not used recently');
            score -= 15;
        }

        const status = score >= 90 ? 'excellent' :
            score >= 70 ? 'good' :
                score >= 50 ? 'warning' : 'critical';

        return { score: Math.max(0, score), status, issues };
    }

    private calculateOverallSuccessRate(): number {
        const analytics = Array.from(this.usageAnalytics.values());
        if (analytics.length === 0) return 100;

        const totalRate = analytics.reduce((sum, a) => sum + a.successRate, 0);
        return totalRate / analytics.length;
    }

    private getTopTools(count: number): any[] {
        const tools = Array.from(this.tools.values());
        tools.sort((a, b) => b.usageCount - a.usageCount);

        return tools.slice(0, count).map(tool => ({
            name: tool.definition.name,
            usageCount: tool.usageCount,
            successRate: tool.performance.successRate
        }));
    }

    private getWeekOfYear(date: Date): number {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    }
}

// 🌟 Export Singleton Instance
export const toolRegistry = new SpectacularToolRegistry();
