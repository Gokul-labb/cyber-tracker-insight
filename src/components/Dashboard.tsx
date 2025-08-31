import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FolderOpen, 
  Search, 
  FileText, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Users,
  Activity
} from "lucide-react";
import cyberHero from "@/assets/cyber-hero.jpg";

interface DashboardProps {
  userRole: 'admin' | 'investigator';
}

const Dashboard = ({ userRole }: DashboardProps) => {
  const stats = [
    {
      title: 'Active Cases',
      value: '247',
      change: '+12%',
      trend: 'up',
      icon: FolderOpen,
      color: 'cyber-cyan'
    },
    {
      title: 'Cases Resolved',
      value: '1,834',
      change: '+8%',
      trend: 'up',
      icon: CheckCircle,
      color: 'success'
    },
    {
      title: 'Response Time',
      value: '18 hrs',
      change: '-15%',
      trend: 'down',
      icon: Clock,
      color: 'warning'
    },
    {
      title: 'Success Rate',
      value: '92%',
      change: '+5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'success'
    }
  ];

  const recentCases = [
    {
      id: 'CYB-2024-001',
      title: 'UPI Fraud Investigation',
      status: 'In Progress',
      priority: 'High',
      investigator: 'Priya Sharma',
      type: 'confidential',
      progress: 65
    },
    {
      id: 'CYB-2024-002',
      title: 'Social Media Impersonation',
      status: 'Analysis',
      priority: 'Medium',
      investigator: 'Rahul Singh',
      type: 'non-confidential',
      progress: 30
    },
    {
      id: 'CYB-2024-003',
      title: 'Cryptocurrency Scam',
      status: 'Review',
      priority: 'High',
      investigator: 'Amit Kumar',
      type: 'confidential',
      progress: 85
    }
  ];

  const quickActions = [
    {
      title: 'New Case',
      description: 'Create and assign a new investigation case',
      icon: FolderOpen,
      action: 'create-case',
      variant: 'cta' as const
    },
    {
      title: 'ML Analysis',
      description: 'Run behavior analysis on transaction data',
      icon: Activity,
      action: 'ml-analysis',
      variant: 'cyber' as const
    },
    {
      title: 'Generate Report',
      description: 'Create comprehensive case reports',
      icon: FileText,
      action: 'generate-report',
      variant: 'cyber-outline' as const
    },
    {
      title: 'Search Cases',
      description: 'Search and filter case library',
      icon: Search,
      action: 'search-cases',
      variant: 'outline' as const
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden">
        <div 
          className="h-48 bg-cover bg-center bg-gradient-primary"
          style={{ backgroundImage: `linear-gradient(rgba(37, 61, 102, 0.8), rgba(37, 61, 102, 0.8)), url(${cyberHero})` }}
        >
          <div className="flex items-center justify-between h-full px-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {userRole === 'admin' ? 'Administrator' : 'Investigator'}
              </h1>
              <p className="text-white/90 text-lg">
                Advanced cybercrime investigation platform with ML-powered analysis
              </p>
            </div>
            <Shield className="h-24 w-24 text-cyan-400 opacity-80" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-elevated transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-card-foreground">
                      {stat.value}
                    </p>
                    <p className={`text-sm flex items-center mt-1 ${
                      stat.trend === 'up' ? 'text-success' : 'text-warning'
                    }`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}/10`}>
                    <Icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Cases */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FolderOpen className="h-5 w-5 mr-2 text-cyber-cyan" />
              Recent Cases
            </CardTitle>
            <CardDescription>
              Latest investigation cases and their progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCases.map((case_) => (
                <div key={case_.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-card-foreground">{case_.title}</h4>
                      <Badge variant={case_.type === 'confidential' ? 'destructive' : 'secondary'}>
                        {case_.type}
                      </Badge>
                      <Badge variant={case_.priority === 'High' ? 'destructive' : 'secondary'}>
                        {case_.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {case_.id} • Assigned to {case_.investigator}
                    </p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{case_.progress}%</span>
                      </div>
                      <Progress value={case_.progress} className="h-2" />
                    </div>
                  </div>
                  <Badge variant="outline" className="ml-4">
                    {case_.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-cyber-orange" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Frequently used investigation tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant={action.variant}
                    className="w-full justify-start h-auto p-4"
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className="h-5 w-5 mt-0.5" />
                      <div className="text-left">
                        <p className="font-medium">{action.title}</p>
                        <p className="text-sm opacity-80">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
            System Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-warning mr-3" />
              <div>
                <p className="font-medium text-warning-foreground">
                  ML Model Update Available
                </p>
                <p className="text-sm text-muted-foreground">
                  New mule account detection model with improved accuracy
                </p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-cyber-cyan/10 border border-cyber-cyan/20 rounded-lg">
              <Users className="h-4 w-4 text-cyber-cyan mr-3" />
              <div>
                <p className="font-medium text-card-foreground">
                  5 new cases assigned
                </p>
                <p className="text-sm text-muted-foreground">
                  Cases require immediate attention
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;