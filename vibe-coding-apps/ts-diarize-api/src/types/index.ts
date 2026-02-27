export interface Diarization {
  id: string;
  userId: string;
  filename: string;
  status: 'processing' | 'completed' | 'error';
  result?: {
    created?: number;
    diarization?: Array<{
      speaker: string | number;
      text?: string;
      start: number;
      end: number;
    }>;
  };
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
  audioUrl?: string;
}

export interface User {
  id: string;
  email: string;
  createdAt: Date;
}