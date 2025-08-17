import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, Filter } from "lucide-react";
import { JobStatus } from "@/types/quantum";

interface DashboardHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: JobStatus | 'all';
  onStatusChange: (status: JobStatus | 'all') => void;
  onRefresh: () => void;
  totalJobs: number;
  lastUpdated: Date;
}

const statusFilters: { value: JobStatus | 'all'; label: string; count?: number }[] = [
  { value: 'all', label: 'All Jobs' },
  { value: 'running', label: 'Running' },
  { value: 'queued', label: 'Queued' },
  { value: 'completed', label: 'Completed' },
  { value: 'failed', label: 'Failed' }
];

export function DashboardHeader({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  onRefresh,
  totalJobs,
  lastUpdated
}: DashboardHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-quantum bg-clip-text text-transparent">
            Quantum Jobs Tracker
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor live quantum computing jobs on IBM Quantum Network
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <div className="font-mono">{totalJobs} active jobs</div>
            <div className="text-xs">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
            className="animate-glow-pulse border-primary/50"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs, users, or devices..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-muted/50 border-border/50 focus:border-primary"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((filter) => (
              <Badge
                key={filter.value}
                variant={selectedStatus === filter.value ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  selectedStatus === filter.value 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "hover:bg-muted"
                }`}
                onClick={() => onStatusChange(filter.value)}
              >
                {filter.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}