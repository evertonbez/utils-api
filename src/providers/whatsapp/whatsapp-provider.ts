import type { Provider } from "../interface";
import type { ProviderParams } from "../types";
import { WhatsAppApi } from "./whatsapp-api";

export class WhatsAppProvider implements Provider {
  #api: WhatsAppApi;

  constructor(params: Omit<ProviderParams, "provider">) {
    this.#api = new WhatsAppApi(params);
  }

  async getHealthCheck(): Promise<boolean> {
    return this.#api.getHealthCheck();
  }

  async sendMessage(): Promise<boolean> {
    return this.#api.getHealthCheck();
  }
}
