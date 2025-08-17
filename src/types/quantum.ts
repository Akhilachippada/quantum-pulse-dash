export type JobStatus = 'running' | 'queued' | 'completed' | 'failed' | 'cancelled';

export interface QuantumJob {
  id: string;
  name: string;
  status: JobStatus;
  device: string;
  shots: number;
  qubits: number;
  depth: number;
  submittedAt: Date;
  completedAt?: Date;
  duration?: number;
  user: string;
  priority: 'high' | 'normal' | 'low';
  estimatedTime?: number;
  circuitType: string;
}

export interface DeviceInfo {
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  qubits: number;
  usage: number;
  queue: number;
}