export class MockOracle {
    async getCustomFeed(feedName: string) {
      return {
        totalModels: Math.floor(Math.random() * 1000),
        volume24h: (Math.random() * 100).toFixed(2)
      };
    }
  }