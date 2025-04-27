import type { ProviderParams } from "../types";

export class WhatsAppApi {
  constructor(params: Omit<ProviderParams, "provider">) {}

  async getHealthCheck(): Promise<boolean> {
    try {
      const response = await fetch("https://httpstat.us/200");

      return response.ok;
    } catch (error) {
      return false;
    }
  }
}
