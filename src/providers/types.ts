export type Providers = "whatsapp" | "instagram";

export type ProviderParams = {
  provider: Providers;
  envs: {
    WHATSAPP_SECRET_KEY: string;
    INSTAGRAM_SECRET_KEY: string;
  };
};

export type HealthCheckResponse = {
  healthy: boolean;
};

export type GetHealthCheckResponse = {
  whatsapp: HealthCheckResponse;
  instagram: HealthCheckResponse;
};
