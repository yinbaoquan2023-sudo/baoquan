import { MarketingScenario } from './types';

export const SCENARIOS: MarketingScenario[] = [
  {
    id: 'mug',
    label: 'Coffee Mug',
    promptTemplate: 'Place this product design naturally onto a white ceramic coffee mug sitting on a wooden table. Maintain the product branding visibility clearly. Photorealistic, high quality.',
    icon: '☕'
  },
  {
    id: 'billboard',
    label: 'City Billboard',
    promptTemplate: 'Show this product advertised on a large, high-resolution digital billboard in a busy city center like Times Square. The product should look impressive and large-scale.',
    icon: '🏙️'
  },
  {
    id: 'tshirt',
    label: 'T-Shirt',
    promptTemplate: 'Display this product design printed on a high-quality white t-shirt worn by a casual model in a studio setting. Realistic fabric texture and lighting.',
    icon: '👕'
  },
  {
    id: 'tote',
    label: 'Canvas Tote',
    promptTemplate: 'Show this product design printed on a canvas tote bag hanging on a hook. Natural lighting, eco-friendly vibe.',
    icon: '👜'
  }
];
