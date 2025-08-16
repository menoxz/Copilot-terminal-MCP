// 🎯 Types pour les outils MCP Server
export interface Tool {
    name: string;
    description: string;
    category: string;
    handler: (params: any) => Promise<any>;
    health?: {
        status: 'healthy' | 'degraded' | 'unhealthy';
        lastCheck: number;
        responseTime: number;
        errorCount: number;
    };
    metadata?: {
        version: string;
        lastUsed: number;
        usageCount: number;
        successRate: number;
        averageResponseTime: number;
    };
}

export interface ToolExecution {
    toolName: string;
    startTime: number;
    endTime?: number;
    success: boolean;
    params: any;
    result?: any;
    error?: string;
    duration?: number;
}

export interface ToolAnalytics {
    totalExecutions: number;
    successfulExecutions: number;
    failedExecutions: number;
    averageResponseTime: number;
    errorRate: number;
    lastExecution?: ToolExecution;
    popularParams: Array<{
        params: any;
        count: number;
    }>;
}

export interface HealthCheckResult {
    toolName: string;
    status: 'healthy' | 'degraded' | 'unhealthy';
    responseTime: number;
    timestamp: number;
    details?: string;
    error?: string;
}
