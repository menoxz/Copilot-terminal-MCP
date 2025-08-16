export interface ToolMetrics {
    executionCount: number;
    totalExecutionTime: number;
    successRate: number;
    errors: string[];
    lastUsed: Date;
}

export interface ToolHealth {
    status: 'healthy' | 'warning' | 'error';
    lastCheck: Date;
    issues: string[];
    uptime: number;
}

export interface Tool {
    name: string;
    description: string;
    inputSchema: any;
    handler: (args: any) => Promise<any>;
    metrics?: ToolMetrics;
    health?: ToolHealth;
}

export interface TerminalInfo {
    id: string;
    name: string;
    process: any;
    cwd: string;
    shell: string;
    isRunning: boolean;
    pid?: number;
    lastActivity: Date;
    metrics: {
        commandCount: number;
        totalUptime: number;
        errorCount: number;
        successRate: number;
    };
}

export interface TerminalCommand {
    id: string;
    terminalId: string;
    command: string;
    timestamp: Date;
    status: 'pending' | 'running' | 'completed' | 'failed';
    exitCode?: number;
    output?: string;
    error?: string;
    duration?: number;
}

export interface PerformanceMetric {
    timestamp: number;
    metric: string;
    value: number;
    metadata?: Record<string, any>;
}

export interface CreativeLogEntry {
    timestamp: Date;
    level: 'info' | 'warn' | 'error' | 'debug';
    message: string;
    emoji?: string;
    color?: string;
    metadata?: Record<string, any>;
}
