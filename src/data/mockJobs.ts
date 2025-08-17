import { QuantumJob, DeviceInfo } from "@/types/quantum";

export const mockJobs: QuantumJob[] = [
  {
    id: "qjob_001",
    name: "VQE Ground State Optimization",
    status: "running",
    device: "ibm_brisbane",
    shots: 8192,
    qubits: 12,
    depth: 45,
    submittedAt: new Date(Date.now() - 1000 * 60 * 15),
    user: "alice.quantum@ibm.com",
    priority: "high",
    estimatedTime: 25,
    circuitType: "Variational Quantum Eigensolver"
  },
  {
    id: "qjob_002", 
    name: "Quantum Fourier Transform Demo",
    status: "queued",
    device: "ibm_kyoto",
    shots: 4096,
    qubits: 8,
    depth: 32,
    submittedAt: new Date(Date.now() - 1000 * 60 * 45),
    user: "bob.researcher@university.edu",
    priority: "normal",
    estimatedTime: 12,
    circuitType: "Quantum Fourier Transform"
  },
  {
    id: "qjob_003",
    name: "QAOA Max-Cut Problem",
    status: "completed",
    device: "ibm_brisbane", 
    shots: 16384,
    qubits: 16,
    depth: 28,
    submittedAt: new Date(Date.now() - 1000 * 60 * 120),
    completedAt: new Date(Date.now() - 1000 * 60 * 85),
    duration: 42,
    user: "charlie.optimizer@tech.com",
    priority: "high",
    circuitType: "Quantum Approximate Optimization"
  },
  {
    id: "qjob_004",
    name: "Bell State Preparation",
    status: "failed",
    device: "ibm_osaka",
    shots: 1024,
    qubits: 2,
    depth: 3,
    submittedAt: new Date(Date.now() - 1000 * 60 * 200),
    user: "diana.student@quantum.edu",
    priority: "low",
    circuitType: "Entanglement Circuit"
  },
  {
    id: "qjob_005",
    name: "Grover's Algorithm Search",
    status: "queued",
    device: "ibm_kyoto",
    shots: 2048,
    qubits: 6,
    depth: 18,
    submittedAt: new Date(Date.now() - 1000 * 60 * 30),
    user: "eve.quantum@research.org",
    priority: "normal",
    estimatedTime: 8,
    circuitType: "Grover's Search Algorithm"
  },
  {
    id: "qjob_006",
    name: "Quantum Machine Learning Model",
    status: "running",
    device: "ibm_brisbane",
    shots: 32768,
    qubits: 20,
    depth: 67,
    submittedAt: new Date(Date.now() - 1000 * 60 * 5),
    user: "frank.ml@quantum.ai",
    priority: "high",
    estimatedTime: 45,
    circuitType: "Quantum Neural Network"
  },
  {
    id: "qjob_007",
    name: "Shor's Algorithm Factorization",
    status: "completed",
    device: "ibm_kyoto",
    shots: 8192,
    qubits: 10,
    depth: 55,
    submittedAt: new Date(Date.now() - 1000 * 60 * 180),
    completedAt: new Date(Date.now() - 1000 * 60 * 140),
    duration: 38,
    user: "grace.crypto@security.com",
    priority: "normal",
    circuitType: "Shor's Factoring Algorithm"
  },
  {
    id: "qjob_008",
    name: "Quantum Chemistry Simulation",
    status: "cancelled",
    device: "ibm_osaka",
    shots: 16384,
    qubits: 14,
    depth: 89,
    submittedAt: new Date(Date.now() - 1000 * 60 * 90),
    user: "henry.chem@pharma.com",
    priority: "normal",
    circuitType: "Molecular Simulation"
  }
];

export const mockDevices: DeviceInfo[] = [
  {
    name: "ibm_brisbane",
    status: "online",
    qubits: 127,
    usage: 85,
    queue: 12
  },
  {
    name: "ibm_kyoto", 
    status: "online",
    qubits: 127,
    usage: 62,
    queue: 8
  },
  {
    name: "ibm_osaka",
    status: "maintenance",
    qubits: 127,
    usage: 0,
    queue: 0
  },
  {
    name: "ibm_sherbrooke",
    status: "online",
    qubits: 127,
    usage: 43,
    queue: 5
  }
];