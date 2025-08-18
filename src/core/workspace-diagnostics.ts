import * as fs from 'fs';
import * as path from 'path';
import { CreativeLogger } from '../utils/creative-logger.js';

// Define diagnostic types for MCP server
interface DiagnosticSeverity {
    Error: 0;
    Warning: 1;
    Information: 2;
    Hint: 3;
}

const DiagnosticSeverity: DiagnosticSeverity = {
    Error: 0,
    Warning: 1,
    Information: 2,
    Hint: 3
};

interface Diagnostic {
    severity: 0 | 1 | 2 | 3;
    message: string;
    range: {
        start: { line: number; character: number };
        end: { line: number; character: number };
    };
    source?: string;
    code?: string | number;
}

interface FileAnalysisResult {
    path: string;
    fileName: string;
    extension: string;
    problems: number;
    errors: number;
    warnings: number;
    info: number;
    hints: number;
    issues: any[];
}

/**
 * 🔍 ADVANCED WORKSPACE DIAGNOSTICS FOR MCP SERVER
 * 
 * Comprehensive workspace analysis with intelligent problem detection,
 * categorization, and solution recommendations.
 * Works independently without VS Code API.
 */
export class AdvancedWorkspaceDiagnostics {
    private logger = new CreativeLogger('🔍 WORKSPACE-DIAGNOSTICS');
    private diagnosticsCache = new Map<string, any>();
    private lastScanTime = 0;
    private cacheDuration = 30000; // 30 seconds cache
    private workspaceRoot = process.cwd();

    constructor(workspaceRoot?: string) {
        if (workspaceRoot) {
            this.workspaceRoot = workspaceRoot;
        }
    }

    /**
     * 🎯 Get comprehensive workspace problems analysis
     */
    async getWorkspaceProblems(): Promise<any> {
        const cacheKey = 'workspace_problems';
        const now = Date.now();

        // Check cache first
        if (this.diagnosticsCache.has(cacheKey) && (now - this.lastScanTime) < this.cacheDuration) {
            this.logger.info('📋 Returning cached diagnostics');
            return this.diagnosticsCache.get(cacheKey);
        }

        try {
            this.logger.info('🔍 Scanning workspace for problems...');
            const startTime = Date.now();

            // Get all files to analyze
            const files = await this.getAllProjectFiles();

            const problems = {
                summary: {
                    totalFiles: 0,
                    totalProblems: 0,
                    errors: 0,
                    warnings: 0,
                    info: 0,
                    hints: 0
                },
                files: [] as FileAnalysisResult[],
                categories: {} as Record<string, number>,
                languages: {} as Record<string, number>,
                sources: {} as Record<string, number>,
                recommendations: [] as string[],
                hotspots: [] as any[],
                trends: {
                    criticalFiles: [] as string[],
                    commonIssues: [] as string[],
                    improvementAreas: [] as string[]
                },
                severityBreakdown: {
                    errors: [] as any[],
                    warnings: [] as any[],
                    info: [] as any[],
                    hints: [] as any[]
                }
            };

            // Analyze each file
            for (const filePath of files) {
                const analysis = await this.analyzeFile(filePath);
                if (analysis.problems > 0) {
                    problems.summary.totalFiles++;
                    problems.summary.totalProblems += analysis.problems;
                    problems.summary.errors += analysis.errors;
                    problems.summary.warnings += analysis.warnings;
                    problems.summary.info += analysis.info;
                    problems.summary.hints += analysis.hints;

                    problems.files.push(analysis);

                    // Track categories, languages, sources
                    for (const issue of analysis.issues) {
                        // Categories
                        const category = issue.category;
                        problems.categories[category] = (problems.categories[category] || 0) + 1;

                        // Languages
                        problems.languages[analysis.extension] = (problems.languages[analysis.extension] || 0) + 1;

                        // Sources
                        const source = issue.source;
                        problems.sources[source] = (problems.sources[source] || 0) + 1;

                        // Add to severity breakdown
                        switch (issue.severity) {
                            case 'Error':
                                problems.severityBreakdown.errors.push({ file: filePath, ...issue });
                                break;
                            case 'Warning':
                                problems.severityBreakdown.warnings.push({ file: filePath, ...issue });
                                break;
                            case 'Info':
                                problems.severityBreakdown.info.push({ file: filePath, ...issue });
                                break;
                            case 'Hint':
                                problems.severityBreakdown.hints.push({ file: filePath, ...issue });
                                break;
                        }
                    }
                }
            }

            // Generate intelligent analysis
            this.generateIntelligentAnalysis(problems);

            // Limit severity breakdown for performance
            problems.severityBreakdown.errors = problems.severityBreakdown.errors.slice(0, 20);
            problems.severityBreakdown.warnings = problems.severityBreakdown.warnings.slice(0, 10);
            problems.severityBreakdown.info = problems.severityBreakdown.info.slice(0, 5);
            problems.severityBreakdown.hints = problems.severityBreakdown.hints.slice(0, 5);

            const result = {
                ...problems,
                scanTime: Date.now() - startTime,
                timestamp: new Date().toISOString(),
                healthScore: this.calculateHealthScore(problems.summary)
            };

            // Cache the results
            this.diagnosticsCache.set(cacheKey, result);
            this.lastScanTime = now;

            this.logger.success(`✅ Workspace scan completed in ${result.scanTime}ms`);
            this.logger.info(`📊 Found ${result.summary.totalProblems} problems in ${result.summary.totalFiles} files`);

            return result;

        } catch (error) {
            this.logger.error('❌ Error scanning workspace:', error);
            return {
                summary: { totalFiles: 0, totalProblems: 0, errors: 0, warnings: 0, info: 0, hints: 0 },
                error: `Failed to scan workspace: ${error instanceof Error ? error.message : String(error)}`,
                timestamp: new Date().toISOString(),
                healthScore: 0
            };
        }
    }

    /**
     * 🎯 Get all project files to analyze
     */
    private async getAllProjectFiles(): Promise<string[]> {
        const files: string[] = [];
        const extensions = ['.ts', '.js', '.tsx', '.jsx', '.vue', '.py', '.java', '.cs', '.cpp', '.c', '.php', '.rb', '.go'];

        const scanDirectory = (dirPath: string) => {
            try {
                const items = fs.readdirSync(dirPath);
                for (const item of items) {
                    const itemPath = path.join(dirPath, item);
                    const stat = fs.statSync(itemPath);

                    if (stat.isDirectory()) {
                        // Skip common ignored directories
                        if (!['node_modules', '.git', 'dist', 'build', 'out', '.vscode'].includes(item)) {
                            scanDirectory(itemPath);
                        }
                    } else if (stat.isFile()) {
                        const ext = path.extname(item).toLowerCase();
                        if (extensions.includes(ext)) {
                            files.push(itemPath);
                        }
                    }
                }
            } catch (error) {
                // Ignore permission errors
            }
        };

        scanDirectory(this.workspaceRoot);
        return files;
    }

    /**
     * 🎯 Analyze a single file for problems
     */
    private async analyzeFile(filePath: string): Promise<FileAnalysisResult> {
        const fileName = path.basename(filePath);
        const extension = path.extname(fileName).slice(1).toLowerCase();

        const result: FileAnalysisResult = {
            path: filePath,
            fileName,
            extension,
            problems: 0,
            errors: 0,
            warnings: 0,
            info: 0,
            hints: 0,
            issues: []
        };

        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const lines = content.split('\n');

            // Analyze based on file type
            switch (extension) {
                case 'ts':
                case 'tsx':
                    this.analyzeTypeScript(content, lines, result);
                    break;
                case 'js':
                case 'jsx':
                    this.analyzeJavaScript(content, lines, result);
                    break;
                case 'py':
                    this.analyzePython(content, lines, result);
                    break;
                case 'java':
                    this.analyzeJava(content, lines, result);
                    break;
                default:
                    this.analyzeGeneral(content, lines, result);
            }

            result.problems = result.errors + result.warnings + result.info + result.hints;

        } catch (error) {
            // File read error
            result.errors = 1;
            result.problems = 1;
            result.issues.push({
                severity: 'Error',
                message: `Cannot read file: ${error instanceof Error ? error.message : String(error)}`,
                line: 1,
                column: 1,
                source: 'filesystem',
                code: 'file-read-error',
                category: 'File System'
            });
        }

        return result;
    }

    /**
     * 🎯 Analyze TypeScript files
     */
    private analyzeTypeScript(content: string, lines: string[], result: FileAnalysisResult): void {
        lines.forEach((line, index) => {
            const lineNum = index + 1;
            const trimmed = line.trim();

            // Check for common TypeScript issues
            if (trimmed.includes('any') && !trimmed.includes('// @ts-ignore')) {
                this.addIssue(result, 'Warning', `Use of 'any' type - consider using specific types`, lineNum, 'TypeScript', 'any-type', 'Type Safety');
            }

            if (trimmed.includes('console.log') && !trimmed.startsWith('//')) {
                this.addIssue(result, 'Info', 'Console.log statement - remove before production', lineNum, 'ESLint', 'no-console', 'Code Quality');
            }

            if (trimmed.includes('@ts-ignore')) {
                this.addIssue(result, 'Warning', 'TypeScript error suppression - consider fixing the underlying issue', lineNum, 'TypeScript', 'ts-ignore', 'Type Safety');
            }

            if (trimmed.match(/^import .+ from ['"][^'"]+['"];?$/) && !trimmed.endsWith(';')) {
                this.addIssue(result, 'Hint', 'Missing semicolon in import statement', lineNum, 'ESLint', 'semi', 'Code Style');
            }
        });
    }

    /**
     * 🎯 Analyze JavaScript files
     */
    private analyzeJavaScript(content: string, lines: string[], result: FileAnalysisResult): void {
        lines.forEach((line, index) => {
            const lineNum = index + 1;
            const trimmed = line.trim();

            if (trimmed.includes('var ')) {
                this.addIssue(result, 'Warning', "Use 'let' or 'const' instead of 'var'", lineNum, 'ESLint', 'no-var', 'Modern JavaScript');
            }

            if (trimmed.includes('== ') || trimmed.includes('!= ')) {
                this.addIssue(result, 'Warning', "Use '===' or '!==' instead of '==' or '!='", lineNum, 'ESLint', 'eqeqeq', 'Code Quality');
            }

            if (trimmed.includes('console.log') && !trimmed.startsWith('//')) {
                this.addIssue(result, 'Info', 'Console.log statement - remove before production', lineNum, 'ESLint', 'no-console', 'Code Quality');
            }
        });
    }

    /**
     * 🎯 Analyze Python files
     */
    private analyzePython(content: string, lines: string[], result: FileAnalysisResult): void {
        lines.forEach((line, index) => {
            const lineNum = index + 1;
            const trimmed = line.trim();

            if (trimmed.includes('print(') && !trimmed.startsWith('#')) {
                this.addIssue(result, 'Info', 'Print statement - consider using logging', lineNum, 'Pylint', 'print-statement', 'Code Quality');
            }

            if (line.length > 120) {
                this.addIssue(result, 'Warning', 'Line too long (>120 characters)', lineNum, 'PEP8', 'line-too-long', 'Code Style');
            }

            if (trimmed.includes('import *')) {
                this.addIssue(result, 'Warning', 'Avoid wildcard imports', lineNum, 'Pylint', 'wildcard-import', 'Import Style');
            }
        });
    }

    /**
     * 🎯 Analyze Java files
     */
    private analyzeJava(content: string, lines: string[], result: FileAnalysisResult): void {
        lines.forEach((line, index) => {
            const lineNum = index + 1;
            const trimmed = line.trim();

            if (trimmed.includes('System.out.println') && !trimmed.startsWith('//')) {
                this.addIssue(result, 'Info', 'System.out.println statement - consider using logging', lineNum, 'Checkstyle', 'system-out', 'Code Quality');
            }

            if (trimmed.match(/^public class \w+/) && !result.fileName.includes(trimmed.split(' ')[2])) {
                this.addIssue(result, 'Error', 'Class name should match filename', lineNum, 'Java', 'class-name', 'Naming Convention');
            }
        });
    }

    /**
     * 🎯 Analyze general files
     */
    private analyzeGeneral(content: string, lines: string[], result: FileAnalysisResult): void {
        lines.forEach((line, index) => {
            const lineNum = index + 1;

            if (line.length > 200) {
                this.addIssue(result, 'Warning', 'Very long line (>200 characters)', lineNum, 'General', 'line-length', 'Code Style');
            }

            if (line.includes('\t')) {
                this.addIssue(result, 'Hint', 'Tab character found - consider using spaces', lineNum, 'General', 'tabs', 'Code Style');
            }
        });
    }

    /**
     * 🎯 Add an issue to the result
     */
    private addIssue(result: FileAnalysisResult, severity: 'Error' | 'Warning' | 'Info' | 'Hint', message: string, line: number, source: string, code: string, category: string): void {
        const issue = {
            severity,
            message,
            line,
            column: 1,
            source,
            code,
            category
        };

        result.issues.push(issue);

        switch (severity) {
            case 'Error':
                result.errors++;
                break;
            case 'Warning':
                result.warnings++;
                break;
            case 'Info':
                result.info++;
                break;
            case 'Hint':
                result.hints++;
                break;
        }
    }

    /**
     * 🎯 Generate intelligent analysis and recommendations
     */
    private generateIntelligentAnalysis(problems: any): void {
        const { summary, files, categories, languages, sources } = problems;

        // Calculate hotspots (files with most problems)
        const fileArray = files
            .sort((a: any, b: any) => b.problems - a.problems)
            .slice(0, 10);

        problems.hotspots = fileArray.map((file: any) => ({
            file: file.fileName,
            path: file.path,
            problems: file.problems,
            errors: file.errors,
            warnings: file.warnings,
            severity: file.errors > 0 ? 'critical' : file.warnings > 5 ? 'high' : 'medium'
        }));

        // Generate recommendations
        const recommendations = [];

        if (summary.errors > 0) {
            recommendations.push(`🚨 PRIORITY: Fix ${summary.errors} error(s) to improve code stability`);
        }

        if (summary.warnings > 10) {
            recommendations.push(`⚠️ Consider addressing ${summary.warnings} warning(s) for better code quality`);
        }

        // Language-specific recommendations
        const topLanguages = Object.entries(languages)
            .sort((a, b) => (b[1] as number) - (a[1] as number))
            .slice(0, 3);

        for (const [lang, count] of topLanguages) {
            if ((count as number) > 5) {
                recommendations.push(`🔧 Focus on ${lang} files - they have ${count} issues`);
            }
        }

        // Source-specific recommendations
        const topSources = Object.entries(sources)
            .sort((a, b) => (b[1] as number) - (a[1] as number))
            .slice(0, 3);

        for (const [source, count] of topSources) {
            if ((count as number) > 3 && source !== 'unknown') {
                recommendations.push(`🛠️ Review ${source} configuration - ${count} issues detected`);
            }
        }

        // Critical file trends
        problems.trends.criticalFiles = fileArray
            .filter((f: any) => f.errors > 0)
            .map((f: any) => f.fileName)
            .slice(0, 5);

        // Common issue patterns
        const topCategories = Object.entries(categories)
            .sort((a, b) => (b[1] as number) - (a[1] as number))
            .slice(0, 5)
            .map(([cat, count]) => `${cat} (${count})`);

        problems.trends.commonIssues = topCategories;

        // Improvement areas
        const improvementAreas = [];
        if (summary.errors > 0) improvementAreas.push('Error resolution');
        if (summary.warnings > summary.errors * 2) improvementAreas.push('Code quality');
        if (problems.hotspots.length > 3) improvementAreas.push('Code organization');

        problems.trends.improvementAreas = improvementAreas;
        problems.recommendations = recommendations;
    }

    /**
     * 🎯 Categorize issues for better organization
     */
    private categorizeIssue(diagnostic: Diagnostic): string {
        const message = diagnostic.message.toLowerCase();
        const source = (diagnostic.source || '').toLowerCase();

        // TypeScript/JavaScript categories
        if (source.includes('typescript') || source.includes('ts')) {
            if (message.includes('type')) return 'Type Issues';
            if (message.includes('import') || message.includes('module')) return 'Import/Module Issues';
            if (message.includes('unused')) return 'Unused Code';
            if (message.includes('any')) return 'Type Safety';
            return 'TypeScript';
        }

        // ESLint categories
        if (source.includes('eslint')) {
            if (message.includes('unused')) return 'Unused Variables';
            if (message.includes('prefer') || message.includes('should')) return 'Code Style';
            if (message.includes('async') || message.includes('await')) return 'Async/Await';
            if (message.includes('import')) return 'Import Organization';
            return 'Linting';
        }

        // General categories
        if (message.includes('syntax')) return 'Syntax Errors';
        if (message.includes('undefined') || message.includes('not found')) return 'Reference Errors';
        if (message.includes('deprecated')) return 'Deprecated Code';
        if (message.includes('security')) return 'Security';
        if (message.includes('performance')) return 'Performance';

        return 'General';
    }

    /**
     * 🎯 Convert diagnostic severity to readable string
     */
    private severityToString(severity: 0 | 1 | 2 | 3): string {
        switch (severity) {
            case 0: return 'Error';
            case 1: return 'Warning';
            case 2: return 'Info';
            case 3: return 'Hint';
            default: return 'Unknown';
        }
    }

    /**
     * 🎯 Calculate overall workspace health score (0-100)
     */
    private calculateHealthScore(summary: any): number {
        const { totalProblems, errors, warnings, info, hints } = summary;

        if (totalProblems === 0) return 100;

        // Weighted scoring: errors are most critical
        const errorWeight = 10;
        const warningWeight = 3;
        const infoWeight = 1;
        const hintWeight = 0.5;

        const totalWeight = (errors * errorWeight) + (warnings * warningWeight) +
            (info * infoWeight) + (hints * hintWeight);

        // Scale based on total problems (more lenient for larger codebases)
        const maxProblems = Math.max(100, totalProblems * 2);
        const healthScore = Math.max(0, 100 - (totalWeight / maxProblems * 100));

        return Math.round(healthScore);
    }

    /**
     * 🎯 Clear diagnostics cache
     */
    clearCache(): void {
        this.diagnosticsCache.clear();
        this.lastScanTime = 0;
        this.logger.info('🧹 Diagnostics cache cleared');
    }

    /**
     * 🎯 Get specific file problems
     */
    async getFileProblems(filePath: string): Promise<any> {
        try {
            const analysis = await this.analyzeFile(filePath);

            return {
                file: filePath,
                problems: analysis.problems,
                errors: analysis.errors,
                warnings: analysis.warnings,
                info: analysis.info,
                hints: analysis.hints,
                issues: analysis.issues
            };

        } catch (error) {
            this.logger.error(`❌ Error getting problems for ${filePath}:`, error);
            return {
                file: filePath,
                problems: 0,
                issues: [],
                error: `Failed to get problems: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
}
