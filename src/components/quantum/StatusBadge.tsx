import { Badge } from "@/components/ui/badge";
import { JobStatus } from "@/types/quantum";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: JobStatus;
  className?: string;
}

const statusConfig = {
  running: {
    label: "Running",
    className: "status-running animate-pulse-quantum",
    icon: "●"
  },
  queued: {
    label: "Queued",
    className: "status-queued",
    icon: "⏳"
  },
  completed: {
    label: "Completed",
    className: "status-completed",
    icon: "✓"
  },
  failed: {
    label: "Failed",
    className: "status-failed",
    icon: "✗"
  },
  cancelled: {
    label: "Cancelled",
    className: "status-cancelled",
    icon: "⊘"
  }
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "border font-mono text-xs px-2 py-1",
        config.className,
        className
      )}
    >
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  );
}