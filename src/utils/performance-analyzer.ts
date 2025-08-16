/**
 * 📊 PERFORMANCE ANALYZER - Ultra-Intelligent Performance Monitoring
 * 
 * This performance analyzer provides real-time insights into terminal operations,
 * command execution patterns, and system resource utilization. It uses advanced
 * analytics to predict performance issues and suggest optimizations.
 * 
 * Features:
 * - ⚡ Real-time performance monitoring
 * - 🧠 Predictive analytics with AI
 * - 📈 Advanced metrics collection
 * - 🎯 Intelligent optimization suggestions
 * - 🔮 Future performance predictions
 * - 📊 Beautiful performance visualizations
 * 
 * @author Super Agent Ultra 2025
 */

import { EventEmitter } from 'events';
import { CreativeLogger } from './creative-logger.js';

/**
 * 📊 Performance Metrics Interface
 */
interface IPerformanceMetrics {
    timestamp: Date;
    operation: string;
    duration: number;
    success: boolean;
    memoryUsage?: number;
    cpuUsage?: number;
    context?: any;
}

/**
 * 🎯 Performance Insight Interface
 */
interface IPerformanceInsight {
    type: 'optimization' | 'warning' | 'prediction' | 'achievement';
    severity: 'low' | 'medium' | 'high' | 'critical';
    title: string;
    description: string;
    recommendations: string[];
    impact: number; // 0-100 score
    category: string;
    metadata?: any;
}

/**
 * 📈 Performance Trend Analysis
 */
interface IPerformanceTrend {
    metric: string;
    direction: 'improving' | 'degrading' | 'stable';
    changePercent: number;
    confidence: number;
    prediction: {
        nextValue: number;
        timeframe: string;
    };
}

/**
 * 🚀 Performance Analyzer Class - The Intelligence Engine
 */
export class PerformanceAnalyzer extends EventEmitter {
    private logger = new CreativeLogger('📊 PERFORMANCE-ANALYZER');
    private metrics: IPerformanceMetrics[] = [];
    private insights: IPerformanceInsight[] = [];
    private trends = new Map<string, IPerformanceTrend>();
    private isMonitoring = false;
    private monitoringInterval?: NodeJS.Timeout;
    private thresholds = {
        slowCommand: 5000,      // 5 seconds
        highErrorRate: 0.2,     // 20%
        memoryWarning: 0.8,     // 80% of available memory
        cpuWarning: 0.9         // 90% CPU usage
    };

    // 🎨 Performance Categories for Intelligent Analysis
    private readonly PERFORMANCE_CATEGORIES = {
        'command-execution': ['sendCommand', 'runSequence', 'safeSendCommand'],
        'terminal-management': ['createTerminal', 'deleteTerminal', 'selectOptimalTerminal'],
        'system-operations': ['healthCheck', 'fixTerminals', 'cleanup'],
        'monitoring': ['getTerminalOutput', 'followOutput', 'searchOutput'],
        'development': ['startDevStack', 'restartDevStack', 'stopDevStack']
    };

    constructor() {
        super();
        this.logger.spectacular('🎪 Initializing Ultra Performance Analyzer with AI Intelligence!');
        this.setupEventListeners();
    }

    /**
     * 📊 Record Tool Usage Metrics
     */
    recordToolUsage(toolName: string, context?: any): void {
        const metric: IPerformanceMetrics = {
            timestamp: new Date(),
            operation: `tool:${toolName}`,
            duration: 0,
            success: true,
            context
        };

        this.addMetric(metric);
    }

    /**
     * ⚡ Record Performance Metrics
     */
    recordPerformance(operation: string, duration: number, context?: any): void {
        const metric: IPerformanceMetrics = {
            timestamp: new Date(),
            operation,
            duration,
            success: true,
            context
        };

        this.addMetric(metric);
        this.analyzePerformance(metric);
    }

    /**
     * 💥 Record Error Metrics
     */
    recordError(operation: string, error: Error, context?: any): void {
        const metric: IPerformanceMetrics = {
            timestamp: new Date(),
            operation,
            duration: 0,
            success: false,
            context: {
                ...context,
                error: {
                    message: error.message,
                    name: error.name,
                    stack: error.stack
                }
            }
        };

        this.addMetric(metric);
        this.analyzeError(metric);
    }

    /**
     * 🎬 Start Monitoring
     */
    startMonitoring(intervalMs: number = 30000): void {
        if (this.isMonitoring) {
            this.logger.warn('⚠️ Performance monitoring is already running');
            return;
        }

        this.logger.info('🎬 Starting spectacular performance monitoring...');
        this.isMonitoring = true;

        this.monitoringInterval = setInterval(() => {
            this.performPeriodicAnalysis();
        }, intervalMs);

        this.logger.success('✨ Performance monitoring started successfully!');
        this.emit('monitoringStarted');
    }

    /**
     * 🛑 Stop Monitoring
     */
    stopMonitoring(): void {
        if (!this.isMonitoring) {
            this.logger.warn('⚠️ Performance monitoring is not running');
            return;
        }

        this.logger.info('🛑 Stopping performance monitoring...');

        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
            this.monitoringInterval = undefined;
        }

        this.isMonitoring = false;
        this.logger.success('✨ Performance monitoring stopped successfully!');
        this.emit('monitoringStopped');
    }

    /**
     * 🎯 Start Performance Tracking
     */
    async startTracking(): Promise<void> {
        this.logger.info('🎯 Starting advanced performance tracking...');
        this.startMonitoring();
        this.emit('trackingStarted');
    }

    /**
     * ⚡ Time Function Execution
     */
    async timeExecution<T>(
        fn: () => Promise<T> | T,
        operationName: string,
        context?: any
    ): Promise<T> {
        const startTime = Date.now();
        let result: T;
        let error: Error | undefined;

        try {
            result = await Promise.resolve(fn());
            const duration = Date.now() - startTime;

            this.recordPerformance(operationName, duration, context);
            this.logger.debug(`⚡ ${operationName} completed in ${duration}ms`);

            return result;
        } catch (err) {
            const duration = Date.now() - startTime;
            error = err as Error;

            this.recordError(operationName, error, context);
            this.logger.error(`❌ ${operationName} failed after ${duration}ms: ${error.message}`);

            throw error;
        }
    }

    /**
     * 📊 Get Current Performance Stats
     */
    getPerformanceStats(timeframeMs: number = 3600000): any {
        const cutoffTime = new Date(Date.now() - timeframeMs);
        const recentMetrics = this.metrics.filter(m => m.timestamp >= cutoffTime);

        if (recentMetrics.length === 0) {
            return {
                totalOperations: 0,
                avgDuration: 0,
                successRate: 100,
                errorRate: 0,
                slowOperations: 0,
                topOperations: [],
                categoryStats: {}
            };
        }

        const successfulOps = recentMetrics.filter(m => m.success);
        const failedOps = recentMetrics.filter(m => !m.success);
        const slowOps = recentMetrics.filter(m => m.duration > this.thresholds.slowCommand);

        // Calculate average duration for successful operations
        const avgDuration = successfulOps.length > 0
            ? successfulOps.reduce((sum, m) => sum + m.duration, 0) / successfulOps.length
            : 0;

        // Get top operations by frequency
        const operationCounts = new Map<string, number>();
        for (const metric of recentMetrics) {
            operationCounts.set(metric.operation, (operationCounts.get(metric.operation) || 0) + 1);
        }

        const topOperations = Array.from(operationCounts.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([operation, count]) => ({ operation, count }));

        // Category statistics
        const categoryStats: any = {};
        for (const [category, operations] of Object.entries(this.PERFORMANCE_CATEGORIES)) {
            const categoryMetrics = recentMetrics.filter(m =>
                operations.some(op => m.operation.includes(op))
            );

            if (categoryMetrics.length > 0) {
                categoryStats[category] = {
                    totalOperations: categoryMetrics.length,
                    avgDuration: categoryMetrics.reduce((sum, m) => sum + m.duration, 0) / categoryMetrics.length,
                    successRate: (categoryMetrics.filter(m => m.success).length / categoryMetrics.length) * 100,
                    errorRate: (categoryMetrics.filter(m => !m.success).length / categoryMetrics.length) * 100
                };
            }
        }

        return {
            timeframe: `${timeframeMs / 1000}s`,
            totalOperations: recentMetrics.length,
            avgDuration: Math.round(avgDuration),
            successRate: Math.round((successfulOps.length / recentMetrics.length) * 100),
            errorRate: Math.round((failedOps.length / recentMetrics.length) * 100),
            slowOperations: slowOps.length,
            topOperations,
            categoryStats
        };
    }

    /**
     * 🔮 Get Performance Insights
     */
    getInsights(): IPerformanceInsight[] {
        // Sort by impact and severity
        return this.insights.sort((a, b) => {
            if (a.severity !== b.severity) {
                const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
                return severityOrder[b.severity] - severityOrder[a.severity];
            }
            return b.impact - a.impact;
        });
    }

    /**
     * 📈 Get Performance Trends
     */
    getTrends(): IPerformanceTrend[] {
        return Array.from(this.trends.values());
    }

    /**
     * 🎯 Generate Optimization Recommendations
     */
    generateOptimizationRecommendations(): string[] {
        const recommendations: string[] = [];
        const stats = this.getPerformanceStats();

        if (stats.errorRate > 20) {
            recommendations.push('🔧 High error rate detected - review command patterns and error handling');
        }

        if (stats.avgDuration > 10000) {
            recommendations.push('⚡ Commands are executing slowly - consider optimizing terminal selection');
        }

        if (stats.slowOperations > 5) {
            recommendations.push('🐌 Multiple slow operations detected - implement caching or parallel execution');
        }

        const insights = this.getInsights();
        const criticalInsights = insights.filter(i => i.severity === 'critical');

        for (const insight of criticalInsights.slice(0, 3)) {
            recommendations.push(...insight.recommendations);
        }

        return recommendations;
    }

    /**
     * 📊 Generate Performance Report
     */
    generateReport(): string {
        const stats = this.getPerformanceStats();
        const insights = this.getInsights();
        const trends = this.getTrends();
        const recommendations = this.generateOptimizationRecommendations();

        let report = '\n';
        report += '╔══════════════════════════════════════════════════════════════════╗\n';
        report += '║  📊 ULTRA PERFORMANCE ANALYZER - COMPREHENSIVE REPORT          ║\n';
        report += '╠══════════════════════════════════════════════════════════════════╣\n';
        report += '║                                                                  ║\n';
        report += `║  📈 Performance Overview (Last Hour)                           ║\n`;
        report += `║    • Total Operations: ${stats.totalOperations.toString().padEnd(10)}                              ║\n`;
        report += `║    • Success Rate: ${stats.successRate}%                                      ║\n`;
        report += `║    • Average Duration: ${stats.avgDuration}ms                               ║\n`;
        report += `║    • Slow Operations: ${stats.slowOperations}                                       ║\n`;
        report += '║                                                                  ║\n';

        if (insights.length > 0) {
            report += '║  🔍 Key Insights                                                ║\n';
            for (const insight of insights.slice(0, 3)) {
                const icon = this.getInsightIcon(insight.type);
                report += `║    ${icon} ${insight.title.slice(0, 50).padEnd(50)}   ║\n`;
            }
            report += '║                                                                  ║\n';
        }

        if (recommendations.length > 0) {
            report += '║  💡 Optimization Recommendations                               ║\n';
            for (const rec of recommendations.slice(0, 3)) {
                report += `║    • ${rec.slice(0, 58).padEnd(58)} ║\n`;
            }
            report += '║                                                                  ║\n';
        }

        report += '╚══════════════════════════════════════════════════════════════════╝\n';

        this.logger.spectacular(report);
        return report;
    }

    // ==========================================
    // 🎨 PRIVATE ANALYTICAL METHODS
    // ==========================================

    /**
     * 📊 Add Metric to Collection
     */
    private addMetric(metric: IPerformanceMetrics): void {
        this.metrics.push(metric);

        // Keep memory usage reasonable (last 24 hours of metrics)
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        this.metrics = this.metrics.filter(m => m.timestamp >= oneDayAgo);

        this.emit('metricRecorded', metric);
    }

    /**
     * 🔍 Analyze Performance Metric
     */
    private analyzePerformance(metric: IPerformanceMetrics): void {
        // Check for slow operations
        if (metric.duration > this.thresholds.slowCommand) {
            this.addInsight({
                type: 'warning',
                severity: 'medium',
                title: `Slow Operation Detected: ${metric.operation}`,
                description: `Operation took ${metric.duration}ms to complete, which is above the ${this.thresholds.slowCommand}ms threshold.`,
                recommendations: [
                    'Consider optimizing the operation logic',
                    'Check for resource contention',
                    'Review terminal selection algorithm'
                ],
                impact: Math.min(100, (metric.duration / this.thresholds.slowCommand) * 50),
                category: this.categorizeOperation(metric.operation)
            });
        }

        // Update trends
        this.updateTrends(metric);
    }

    /**
     * 💥 Analyze Error Metric
     */
    private analyzeError(metric: IPerformanceMetrics): void {
        const error = metric.context?.error;

        this.addInsight({
            type: 'warning',
            severity: this.determineErrorSeverity(error),
            title: `Operation Failed: ${metric.operation}`,
            description: error?.message || 'Unknown error occurred',
            recommendations: [
                'Review error logs for patterns',
                'Implement retry logic if appropriate',
                'Check system resources and permissions'
            ],
            impact: 75,
            category: this.categorizeOperation(metric.operation),
            metadata: { error }
        });
    }

    /**
     * 📈 Update Performance Trends
     */
    private updateTrends(metric: IPerformanceMetrics): void {
        const key = `${metric.operation}-duration`;
        const existingTrend = this.trends.get(key);

        if (!existingTrend) {
            this.trends.set(key, {
                metric: key,
                direction: 'stable',
                changePercent: 0,
                confidence: 0.5,
                prediction: {
                    nextValue: metric.duration,
                    timeframe: '1h'
                }
            });
            return;
        }

        // Simple trend analysis (could be enhanced with more sophisticated algorithms)
        const recentMetrics = this.metrics
            .filter(m => m.operation === metric.operation && m.success)
            .slice(-10);

        if (recentMetrics.length >= 3) {
            const recent = recentMetrics.slice(-3).reduce((sum, m) => sum + m.duration, 0) / 3;
            const older = recentMetrics.slice(-6, -3).reduce((sum, m) => sum + m.duration, 0) / 3;

            if (older > 0) {
                const changePercent = ((recent - older) / older) * 100;

                existingTrend.changePercent = changePercent;
                existingTrend.direction = changePercent > 5 ? 'degrading' :
                    changePercent < -5 ? 'improving' : 'stable';
                existingTrend.confidence = Math.min(1, recentMetrics.length / 10);
                existingTrend.prediction = {
                    nextValue: Math.round(recent + (recent * changePercent / 100)),
                    timeframe: '1h'
                };

                this.trends.set(key, existingTrend);
            }
        }
    }

    /**
     * 🔍 Perform Periodic Analysis
     */
    private performPeriodicAnalysis(): void {
        this.logger.debug('🔍 Performing periodic performance analysis...');

        const stats = this.getPerformanceStats(1800000); // Last 30 minutes

        // Check for degrading trends
        for (const trend of this.trends.values()) {
            if (trend.direction === 'degrading' && trend.confidence > 0.7 && trend.changePercent > 25) {
                this.addInsight({
                    type: 'prediction',
                    severity: 'high',
                    title: `Performance Degradation Predicted: ${trend.metric}`,
                    description: `Performance is degrading by ${trend.changePercent.toFixed(1)}% with ${(trend.confidence * 100).toFixed(0)}% confidence.`,
                    recommendations: [
                        'Monitor resource usage',
                        'Consider optimization strategies',
                        'Review recent changes'
                    ],
                    impact: Math.min(100, Math.abs(trend.changePercent)),
                    category: 'prediction'
                });
            }
        }

        // Achievement insights
        if (stats.successRate >= 95 && stats.totalOperations > 50) {
            this.addInsight({
                type: 'achievement',
                severity: 'low',
                title: 'Excellent Performance Achievement',
                description: `Maintained ${stats.successRate}% success rate over ${stats.totalOperations} operations.`,
                recommendations: [
                    'Continue current optimization practices',
                    'Share successful patterns with team',
                    'Document best practices'
                ],
                impact: 20,
                category: 'achievement'
            });
        }

        this.emit('periodicAnalysisCompleted', stats);
    }

    /**
     * 💡 Add Performance Insight
     */
    private addInsight(insight: IPerformanceInsight): void {
        // Avoid duplicate insights
        const existing = this.insights.find(i =>
            i.title === insight.title && i.type === insight.type
        );

        if (!existing) {
            this.insights.push(insight);

            // Keep insights manageable
            if (this.insights.length > 100) {
                this.insights = this.insights.slice(-80);
            }

            this.emit('insightGenerated', insight);

            if (insight.severity === 'critical' || insight.severity === 'high') {
                this.logger.warn(`💡 Performance insight: ${insight.title}`);
            }
        }
    }

    /**
     * 🏷️ Categorize Operation
     */
    private categorizeOperation(operation: string): string {
        for (const [category, operations] of Object.entries(this.PERFORMANCE_CATEGORIES)) {
            if (operations.some(op => operation.includes(op))) {
                return category;
            }
        }
        return 'unknown';
    }

    /**
     * ⚠️ Determine Error Severity
     */
    private determineErrorSeverity(error: any): 'low' | 'medium' | 'high' | 'critical' {
        if (!error) return 'medium';

        const message = error.message?.toLowerCase() || '';

        if (message.includes('timeout') || message.includes('network')) {
            return 'medium';
        }

        if (message.includes('permission') || message.includes('access')) {
            return 'high';
        }

        if (message.includes('memory') || message.includes('system')) {
            return 'critical';
        }

        return 'medium';
    }

    /**
     * 🎭 Get Insight Icon
     */
    private getInsightIcon(type: string): string {
        const icons = {
            optimization: '⚡',
            warning: '⚠️',
            prediction: '🔮',
            achievement: '🏆'
        };

        return icons[type as keyof typeof icons] || '💡';
    }

    /**
     * 🎪 Setup Event Listeners
     */
    private setupEventListeners(): void {
        this.on('metricRecorded', (metric) => {
            this.logger.debug(`📊 Metric recorded: ${metric.operation} (${metric.duration}ms)`);
        });

        this.on('insightGenerated', (insight) => {
            this.logger.debug(`💡 Insight generated: ${insight.title}`);
        });
    }
}
