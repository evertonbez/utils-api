export interface Provider {
  getHealthCheck: () => Promise<boolean>;
}
