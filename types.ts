export interface GeneratedImage {
  id: string;
  dataUrl: string;
  prompt: string;
  timestamp: number;
}

export interface MarketingScenario {
  id: string;
  label: string;
  promptTemplate: string;
  icon: string;
}

export type LoadingState = 'idle' | 'uploading' | 'generating' | 'error';
