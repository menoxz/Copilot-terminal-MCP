import { AdvancedWorkspaceDiagnostics } from '../core/workspace-diagnostics.js';
import { CreativeLogger } from '../utils/creative-logger.js';

const diagnostics = new AdvancedWorkspaceDiagnostics();
const logger = new CreativeLogger('🔍 WORKSPACE-DIAGNOSTICS-TOOL');

// Simple input schema interface for now (can upgrade to zod later)
interface InputSchema {
    type: string;
    properties?: Record<string, any>;
    required?: string[];
}

/**
 * 🔍 WORKSPACE PROBLEMS ANALYZER TOOL
 * 
 * Advanced workspace analysis with intelligent problem detection,
 * categorization, and solution recommendations for MCP server.
 */
export const workspaceProblemsTools = [
    // Get comprehensive workspace problems
    {
        name: 'getWorkspaceProblems',
        description: 'Analyzes workspace for errors, warnings, and other problems with intelligent categorization and recommendations',
        inputSchema: {
            type: 'object',
            properties: {
                refresh: {
                    type: 'boolean',
                    description: 'Force refresh cache (default: false)'
                }
            },
            required: []
        } as InputSchema,
        handler: async ({ refresh = false }: { refresh?: boolean }) => {
            logger.info('🔍 Analyzing workspace problems...');

            if (refresh) {
                diagnostics.clearCache();
                logger.info('🧹 Cache cleared, performing fresh scan');
            }

            const startTime = Date.now();
            const result = await diagnostics.getWorkspaceProblems();
            const duration = Date.now() - startTime;

            logger.success(`✅ Workspace analysis completed in ${duration}ms`);

            // Enhanced result with execution metadata
            return {
                success: true,
                executionTime: duration,
                timestamp: new Date().toISOString(),
                ...result,
                summary_text: formatProblemsSummary(result.summary),
                recommendations_text: result.recommendations?.join('\\n') || 'No specific recommendations at this time.',
                next_steps: generateNextSteps(result)
            };
        }
    },

    // Get problems for a specific file
    {
        name: 'getFileProblems',
        description: 'Analyzes a specific file for problems and issues with detailed breakdown',
        inputSchema: {
            type: 'object',
            properties: {
                filePath: {
                    type: 'string',
                    description: 'Absolute path to the file to analyze'
                }
            },
            required: ['filePath']
        } as InputSchema,
        handler: async ({ filePath }: { filePath: string }) => {
            logger.info(`🔍 Analyzing file: ${filePath}`);

            const startTime = Date.now();
            const result = await diagnostics.getFileProblems(filePath);
            const duration = Date.now() - startTime;

            logger.success(`✅ File analysis completed in ${duration}ms`);

            return {
                success: true,
                executionTime: duration,
                timestamp: new Date().toISOString(),
                ...result,
                summary_text: `File: ${result.file}\\nProblems: ${result.problems} (${result.errors || 0} errors, ${result.warnings || 0} warnings)`,
                issues_by_severity: groupIssuesBySeverity(result.issues || [])
            };
        }
    },

    // Get workspace health summary
    {
        name: 'getWorkspaceHealth',
        description: 'Provides a quick health overview of the workspace with key metrics and scores',
        inputSchema: {
            type: 'object',
            properties: {},
            required: []
        } as InputSchema,
        handler: async () => {
            logger.info('🏥 Checking workspace health...');

            const startTime = Date.now();
            const result = await diagnostics.getWorkspaceProblems();
            const duration = Date.now() - startTime;

            const healthData = {
                healthScore: result.healthScore || 0,
                grade: getHealthGrade(result.healthScore || 0),
                summary: result.summary,
                topIssues: result.hotspots?.slice(0, 5) || [],
                criticalCount: result.summary?.errors || 0,
                improvementAreas: result.trends?.improvementAreas || [],
                status: determineWorkspaceStatus(result.summary)
            };

            logger.success(`✅ Health check completed - Score: ${healthData.healthScore}/100`);

            return {
                success: true,
                executionTime: duration,
                timestamp: new Date().toISOString(),
                ...healthData,
                health_summary: `Workspace Health: ${healthData.grade} (${healthData.healthScore}/100)\\nStatus: ${healthData.status}\\nCritical Issues: ${healthData.criticalCount}`,
                recommendations: generateHealthRecommendations(healthData)
            };
        }
    },

    // Clear diagnostics cache
    {
        name: 'clearDiagnosticsCache',
        description: 'Clears the diagnostics cache to force fresh analysis on next scan',
        inputSchema: {
            type: 'object',
            properties: {},
            required: []
        } as InputSchema,
        handler: async () => {
            logger.info('🧹 Clearing diagnostics cache...');

            diagnostics.clearCache();

            logger.success('✅ Cache cleared successfully');

            return {
                success: true,
                message: 'Diagnostics cache cleared successfully',
                timestamp: new Date().toISOString(),
                note: 'Next analysis will perform a fresh scan of the workspace'
            };
        }
    }
];

/**
 * 🎯 Format problems summary for readable output
 */
function formatProblemsSummary(summary: any): string {
    if (!summary) return 'No problems summary available';

    const { totalFiles, totalProblems, errors, warnings, info, hints } = summary;

    if (totalProblems === 0) {
        return '🎉 No problems detected in the workspace!';
    }

    return `📊 Workspace Problems Summary:
📁 Files with problems: ${totalFiles}
🔢 Total problems: ${totalProblems}
🚨 Errors: ${errors}
⚠️  Warnings: ${warnings}  
ℹ️  Info: ${info}
💡 Hints: ${hints}`;
}

/**
 * 🎯 Group issues by severity for better organization
 */
function groupIssuesBySeverity(issues: any[]): Record<string, any[]> {
    const grouped = {
        errors: [] as any[],
        warnings: [] as any[],
        info: [] as any[],
        hints: [] as any[]
    };

    for (const issue of issues) {
        switch (issue.severity?.toLowerCase()) {
            case 'error':
                grouped.errors.push(issue);
                break;
            case 'warning':
                grouped.warnings.push(issue);
                break;
            case 'info':
                grouped.info.push(issue);
                break;
            case 'hint':
                grouped.hints.push(issue);
                break;
        }
    }

    return grouped;
}

/**
 * 🎯 Get health grade based on score
 */
function getHealthGrade(score: number): string {
    if (score >= 90) return '🏆 Excellent';
    if (score >= 80) return '🥇 Very Good';
    if (score >= 70) return '🥈 Good';
    if (score >= 60) return '🥉 Fair';
    if (score >= 40) return '⚠️ Needs Attention';
    return '🚨 Critical';
}

/**
 * 🎯 Determine workspace status
 */
function determineWorkspaceStatus(summary: any): string {
    if (!summary) return 'Unknown';

    const { errors, warnings, totalProblems } = summary;

    if (errors === 0 && warnings === 0) return '✅ Clean';
    if (errors === 0 && warnings < 5) return '🟢 Good';
    if (errors === 0 && warnings < 15) return '🟡 Acceptable';
    if (errors < 3 && totalProblems < 20) return '🟠 Needs Review';
    return '🔴 Requires Attention';
}

/**
 * 🎯 Generate next steps based on analysis
 */
function generateNextSteps(result: any): string[] {
    const nextSteps = [];
    const summary = result.summary;

    if (summary?.errors > 0) {
        nextSteps.push('🚨 IMMEDIATE: Fix critical errors to restore stability');
    }

    if (summary?.warnings > 10) {
        nextSteps.push('⚠️ PRIORITY: Address warnings to improve code quality');
    }

    if (result.hotspots?.length > 3) {
        nextSteps.push('🎯 FOCUS: Review hotspot files with the most problems');
    }

    if (result.trends?.improvementAreas?.length > 0) {
        nextSteps.push(`🔧 IMPROVE: Work on ${result.trends.improvementAreas.join(', ')}`);
    }

    if (nextSteps.length === 0) {
        nextSteps.push('🎉 MAINTAIN: Keep up the good work!');
    }

    return nextSteps;
}

/**
 * 🎯 Generate health-based recommendations
 */
function generateHealthRecommendations(healthData: any): string[] {
    const recommendations = [];

    if (healthData.healthScore < 60) {
        recommendations.push('🔥 URGENT: Focus on critical issues immediately');
    }

    if (healthData.criticalCount > 0) {
        recommendations.push(`🚨 Fix ${healthData.criticalCount} critical error(s) first`);
    }

    if (healthData.topIssues?.length > 0) {
        recommendations.push(`📁 Review files: ${healthData.topIssues.map((h: any) => h.file).join(', ')}`);
    }

    if (healthData.improvementAreas?.length > 0) {
        recommendations.push(`🎯 Focus areas: ${healthData.improvementAreas.join(', ')}`);
    }

    return recommendations;
}
