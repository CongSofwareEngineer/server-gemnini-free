interface EnvironmentVariables {
  readonly GEMINI_API_KEY: number;
  readonly ALLOWED_ORIGINS: string;
  readonly REQUEST_PER_MINUTE: number;
  readonly REQUEST_PER_WINDOW: number;
  readonly WINDOW_MS: number;
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvironmentVariables { }
}