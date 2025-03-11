import { PrintfulApiService } from './printful-api.service'

// TODO
export class WebhooksService extends PrintfulApiService {
  async getWebhookConfig() {}
  async setupWebhookConfig() {}
  async disableWebhook() {}
  async getEventConfig() {}
  async setupEventConfig() {}
  async disableEvent() {}
}
