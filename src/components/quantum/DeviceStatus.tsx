import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { DeviceInfo } from "@/types/quantum";
import { Cpu, Activity, Clock } from "lucide-react";

interface DeviceStatusProps {
  devices: DeviceInfo[];
}

export function DeviceStatus({ devices }: DeviceStatusProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'status-completed';
      case 'offline':
        return 'status-failed';
      case 'maintenance':
        return 'status-queued';
      default:
        return 'status-cancelled';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return '●';
      case 'offline':
        return '○';
      case 'maintenance':
        return '⚠';
      default:
        return '?';
    }
  };

  return (
    <Card className="quantum-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-accent" />
          Quantum Devices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {devices.map((device) => (
            <div key={device.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={getStatusColor(device.status)}>
                    <span className="mr-1">{getStatusIcon(device.status)}</span>
                    {device.status}
                  </Badge>
                  <div>
                    <div className="font-mono font-semibold">{device.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {device.qubits} qubits
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    <span>{device.usage}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{device.queue} queued</span>
                  </div>
                </div>
              </div>
              
              {device.status === 'online' && (
                <Progress 
                  value={device.usage} 
                  className="h-2"
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}