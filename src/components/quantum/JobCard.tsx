import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuantumJob } from "@/types/quantum";
import { StatusBadge } from "./StatusBadge";
import { formatDistanceToNow } from "date-fns";
import { Clock, Cpu, Layers, User, Zap } from "lucide-react";

interface JobCardProps {
  job: QuantumJob;
  onClick?: () => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
  const priorityColors = {
    high: "bg-red-500/20 text-red-400 border-red-500/30",
    normal: "bg-blue-500/20 text-blue-400 border-blue-500/30", 
    low: "bg-gray-500/20 text-gray-400 border-gray-500/30"
  };

  return (
    <Card 
      className="quantum-card hover:quantum-glow transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-mono font-semibold text-lg group-hover:text-primary transition-colors">
              {job.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-3 w-3" />
              <span>{job.user}</span>
              <span>•</span>
              <span>{formatDistanceToNow(job.submittedAt, { addSuffix: true })}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={priorityColors[job.priority]}>
              {job.priority}
            </Badge>
            <StatusBadge status={job.status} />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-accent" />
            <div>
              <div className="text-muted-foreground">Device</div>
              <div className="font-mono font-medium">{job.device}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-accent" />
            <div>
              <div className="text-muted-foreground">Qubits</div>
              <div className="font-mono font-medium">{job.qubits}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-accent" />
            <div>
              <div className="text-muted-foreground">Depth</div>
              <div className="font-mono font-medium">{job.depth}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" />
            <div>
              <div className="text-muted-foreground">Shots</div>
              <div className="font-mono font-medium">{job.shots.toLocaleString()}</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono">{job.circuitType}</span>
          {job.estimatedTime && job.status === 'queued' && (
            <span>Est. {job.estimatedTime}min</span>
          )}
          {job.duration && job.status === 'completed' && (
            <span>Completed in {job.duration}s</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}