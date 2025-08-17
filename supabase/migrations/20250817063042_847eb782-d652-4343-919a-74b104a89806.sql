-- Create quantum jobs table
CREATE TABLE public.quantum_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('running', 'queued', 'completed', 'failed', 'cancelled')),
  device TEXT NOT NULL,
  shots INTEGER NOT NULL,
  qubits INTEGER NOT NULL,
  depth INTEGER NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  duration INTEGER,
  user_name TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('high', 'normal', 'low')),
  estimated_time INTEGER,
  circuit_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quantum devices table
CREATE TABLE public.quantum_devices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('online', 'offline', 'maintenance')),
  qubits INTEGER NOT NULL,
  usage INTEGER NOT NULL DEFAULT 0 CHECK (usage >= 0 AND usage <= 100),
  queue INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quantum_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quantum_devices ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is a monitoring dashboard)
CREATE POLICY "Anyone can view quantum jobs" 
ON public.quantum_jobs 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view quantum devices" 
ON public.quantum_devices 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_quantum_jobs_updated_at
  BEFORE UPDATE ON public.quantum_jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quantum_devices_updated_at
  BEFORE UPDATE ON public.quantum_devices
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some initial device data
INSERT INTO public.quantum_devices (name, status, qubits, usage, queue) VALUES
('ibm_kyoto', 'online', 127, 45, 12),
('ibm_osaka', 'online', 127, 78, 8),
('ibm_torino', 'maintenance', 133, 0, 0),
('ibm_brisbane', 'online', 127, 23, 15),
('ibm_sherbrooke', 'online', 127, 89, 3);