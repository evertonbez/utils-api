import type { Provider } from "../interface";
import type { ProviderParams } from "../types";

export class InstagramProvider implements Provider {
  constructor(params: Omit<ProviderParams, "provider">) {}

  async getHealthCheck(): Promise<boolean> {
    return true;
  }
}
