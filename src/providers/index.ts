import { InstagramProvider } from "./instagram/instagram-provider";
import type {
  GetHealthCheckResponse,
  ProviderParams,
  Providers,
} from "./types";
import { WhatsAppProvider } from "./whatsapp/whatsapp-provider";

export class Provider<T extends Providers = Providers> {
  #name?: string;
  #provider: WhatsAppProvider | InstagramProvider | null = null;

  constructor(params?: ProviderParams) {
    this.#name = params?.provider;
    switch (params?.provider) {
      case "whatsapp":
        this.#provider = new WhatsAppProvider(params);
        break;
      case "instagram":
        this.#provider = new InstagramProvider(params);
        break;
      default:
    }
  }

  async getHealthCheck(
    params: Omit<ProviderParams, "provider">
  ): Promise<GetHealthCheckResponse> {
    const whatsappProvider = new WhatsAppProvider(params);
    const instagramProvider = new InstagramProvider(params);

    try {
      const [isWhatsappHealthy, isInstagramHealthy] = await Promise.all([
        whatsappProvider.getHealthCheck(),
        instagramProvider.getHealthCheck(),
      ]);

      return {
        whatsapp: {
          healthy: isWhatsappHealthy,
        },
        instagram: {
          healthy: isInstagramHealthy,
        },
      };
    } catch (error) {
      throw Error("Something went wrong");
    }
  }
}
