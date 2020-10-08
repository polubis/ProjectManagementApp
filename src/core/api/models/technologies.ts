export interface Technology {
  id: number;
  name: string;
  description?: string;
  discriminator: 'technologies';
}
