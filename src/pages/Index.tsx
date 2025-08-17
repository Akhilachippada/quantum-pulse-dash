import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardHeader } from "@/components/quantum/DashboardHeader";
import { JobCard } from "@/components/quantum/JobCard";
import { DeviceStatus } from "@/components/quantum/DeviceStatus";
import { mockJobs, mockDevices } from "@/data/mockJobs";
import { QuantumJob, JobStatus } from "@/types/quantum";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [jobs, setJobs] = useState<QuantumJob[]>(mockJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<JobStatus | 'all'>('all');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setJobs(currentJobs => {
        const updatedJobs = [...currentJobs];
        
        // Randomly update job statuses
        const randomIndex = Math.floor(Math.random() * updatedJobs.length);
        const job = updatedJobs[randomIndex];
        
        if (job.status === 'queued' && Math.random() > 0.7) {
          updatedJobs[randomIndex] = { ...job, status: 'running' };
          toast({
            title: "Job Started",
            description: `${job.name} is now running on ${job.device}`
          });
        } else if (job.status === 'running' && Math.random() > 0.8) {
          updatedJobs[randomIndex] = { 
            ...job, 
            status: 'completed',
            completedAt: new Date(),
            duration: Math.floor(Math.random() * 120) + 30
          };
          toast({
            title: "Job Completed",
            description: `${job.name} has finished successfully`
          });
        }
        
        return updatedJobs;
      });
      
      setLastUpdated(new Date());
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.device.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleRefresh = () => {
    setLastUpdated(new Date());
    toast({
      title: "Dashboard Refreshed",
      description: "Latest job data has been loaded"
    });
  };

  const handleJobClick = (job: QuantumJob) => {
    toast({
      title: "Job Details",
      description: `Viewing details for ${job.name}`,
    });
  };

  const statusCounts = {
    all: jobs.length,
    running: jobs.filter(j => j.status === 'running').length,
    queued: jobs.filter(j => j.status === 'queued').length,
    completed: jobs.filter(j => j.status === 'completed').length,
    failed: jobs.filter(j => j.status === 'failed').length,
    cancelled: jobs.filter(j => j.status === 'cancelled').length
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <DashboardHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          onRefresh={handleRefresh}
          totalJobs={jobs.length}
          lastUpdated={lastUpdated}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                Active Jobs 
                <span className="text-muted-foreground ml-2 text-lg">
                  ({filteredJobs.length})
                </span>
              </h2>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-quantum-running rounded-full animate-pulse-quantum"></div>
                  <span>{statusCounts.running} running</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-quantum-queued rounded-full"></div>
                  <span>{statusCounts.queued} queued</span>
                </div>
              </div>
            </div>

            {filteredJobs.length === 0 ? (
              <Card className="quantum-card">
                <CardContent className="flex items-center justify-center h-32">
                  <p className="text-muted-foreground">No jobs match your current filters</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onClick={() => handleJobClick(job)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <DeviceStatus devices={mockDevices} />
            
            <Card className="quantum-card">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Jobs Today</span>
                      <span className="font-mono font-semibold">{jobs.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Success Rate</span>
                      <span className="font-mono font-semibold text-quantum-completed">
                        {Math.round((statusCounts.completed / jobs.length) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg. Queue Time</span>
                      <span className="font-mono font-semibold">12.5min</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;