declare const __webpack_init_sharing__: (scope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: unknown };

declare module NodeJS {
  interface Module {
    hot?: {
      accept(
        dependencies: string | string[],
        callback?: (updatedDependencies: any[]) => void,
      ): void;
      accept(callback?: (updatedDependencies: any[]) => void): void;
      decline(dependencies?: string | string[]): void;
    };
  }
} 