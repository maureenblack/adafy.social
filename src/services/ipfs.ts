import { create } from 'ipfs-http-client';

class IPFSService {
  private client;

  constructor() {
    // Connect to Infura IPFS gateway
    this.client = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
    });
  }

  async uploadContent(content: string): Promise<string> {
    try {
      const result = await this.client.add(JSON.stringify({
        content,
        timestamp: Date.now()
      }));
      return result.path;
    } catch (error) {
      console.error('IPFS upload error:', error);
      throw new Error('Failed to upload content to IPFS');
    }
  }

  async getContent(hash: string): Promise<any> {
    try {
      const stream = this.client.cat(hash);
      let data = '';
      
      for await (const chunk of stream) {
        data += chunk.toString();
      }
      
      return JSON.parse(data);
    } catch (error) {
      console.error('IPFS retrieval error:', error);
      throw new Error('Failed to retrieve content from IPFS');
    }
  }
}

export const ipfsService = new IPFSService();
