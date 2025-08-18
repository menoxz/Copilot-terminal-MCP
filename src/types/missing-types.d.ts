// Type declarations for modules without @types packages

declare module 'tree-kill' {
    function treeKill(pid: number, signal?: string | number, callback?: (error?: Error) => void): void;
    export = treeKill;
}

declare module 'strip-ansi' {
    function stripAnsi(input: string): string;
    export = stripAnsi;
}
