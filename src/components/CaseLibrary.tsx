import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Plus, 
  Eye,
  Edit,
  Clock,
  User,
  MapPin,
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";

interface Case {
  id: string;
  title: string;
  status: 'Open' | 'In Progress' | 'Under Review' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  type: 'confidential' | 'non-confidential';
  category: 'UPI Fraud' | 'Social Media' | 'Cryptocurrency' | 'Identity Theft' | 'Online Banking';
  investigator: string;
  dateCreated: string;
  lastUpdated: string;
  amount?: string;
  location: string;
  progress: number;
  description: string;
}

interface CaseLibraryProps {
  userRole: 'admin' | 'investigator';
}

const CaseLibrary = ({ userRole }: CaseLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const mockCases: Case[] = [
    {
      id: 'CYB-2024-001',
      title: 'UPI Fraud Ring Investigation',
      status: 'In Progress',
      priority: 'High',
      type: 'confidential',
      category: 'UPI Fraud',
      investigator: 'Priya Sharma',
      dateCreated: '2024-01-15',
      lastUpdated: '2024-01-28',
      amount: '₹2,45,000',
      location: 'Mumbai, Maharashtra',
      progress: 65,
      description: 'Large-scale UPI fraud operation targeting elderly citizens with fake merchant QR codes'
    },
    {
      id: 'CYB-2024-002',
      title: 'Social Media Impersonation Case',
      status: 'Under Review',
      priority: 'Medium',
      type: 'non-confidential',
      category: 'Social Media',
      investigator: 'Rahul Singh',
      dateCreated: '2024-01-20',
      lastUpdated: '2024-01-27',
      amount: '₹15,000',
      location: 'Delhi',
      progress: 80,
      description: 'Celebrity impersonation on Instagram leading to financial fraud'
    },
    {
      id: 'CYB-2024-003',
      title: 'Cryptocurrency Investment Scam',
      status: 'Open',
      priority: 'Critical',
      type: 'confidential',
      category: 'Cryptocurrency',
      investigator: 'Amit Kumar',
      dateCreated: '2024-01-25',
      lastUpdated: '2024-01-28',
      amount: '₹8,50,000',
      location: 'Bangalore, Karnataka',
      progress: 25,
      description: 'Ponzi scheme involving fake cryptocurrency exchange platform'
    },
    {
      id: 'CYB-2024-004',
      title: 'Online Banking Credential Theft',
      status: 'Closed',
      priority: 'High',
      type: 'non-confidential',
      category: 'Online Banking',
      investigator: 'Sneha Patel',
      dateCreated: '2024-01-10',
      lastUpdated: '2024-01-26',
      amount: '₹75,000',
      location: 'Pune, Maharashtra',
      progress: 100,
      description: 'Phishing attack targeting bank customers through fake SMS'
    }
  ];

  // Filter cases based on user role and filters
  const filteredCases = mockCases.filter(case_ => {
    // Role-based filtering
    if (userRole === 'investigator' && case_.type === 'confidential') {
      return false;
    }

    // Search filter
    if (searchTerm && !case_.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !case_.id.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Status filter
    if (statusFilter !== 'all' && case_.status !== statusFilter) {
      return false;
    }

    // Type filter
    if (typeFilter !== 'all' && case_.type !== typeFilter) {
      return false;
    }

    // Priority filter
    if (priorityFilter !== 'all' && case_.priority !== priorityFilter) {
      return false;
    }

    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'In Progress': return <Clock className="h-4 w-4 text-cyber-cyan" />;
      case 'Under Review': return <Eye className="h-4 w-4 text-primary" />;
      case 'Closed': return <CheckCircle className="h-4 w-4 text-success" />;
      default: return <XCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'destructive';
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-card-foreground">Case Library</h1>
          <p className="text-muted-foreground">
            Manage and track all cybercrime investigation cases
          </p>
        </div>
        {userRole === 'admin' && (
          <Button variant="cta">
            <Plus className="h-4 w-4 mr-2" />
            New Case
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            {userRole === 'admin' && (
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="confidential">Confidential</SelectItem>
                  <SelectItem value="non-confidential">Non-Confidential</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Cases Tabs */}
      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((case_) => (
              <Card key={case_.id} className="hover:shadow-elevated transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{case_.id}</Badge>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(case_.status)}
                      <Badge variant={getPriorityVariant(case_.priority)} className="ml-2">
                        {case_.priority}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{case_.title}</CardTitle>
                  <CardDescription>{case_.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span>{case_.investigator}</span>
                    </div>
                    <Badge variant={case_.type === 'confidential' ? 'destructive' : 'secondary'}>
                      {case_.type}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-3 w-3" />
                      <span>{case_.amount}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3 w-3" />
                      <span>{case_.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>Updated {case_.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{case_.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-cyber-cyan h-2 rounded-full transition-all duration-300"
                        style={{ width: `${case_.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="cyber-outline" size="sm" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    {(userRole === 'admin' || case_.type === 'non-confidential') && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {filteredCases.map((case_) => (
                  <div key={case_.id} className="p-6 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <Badge variant="outline">{case_.id}</Badge>
                          <h3 className="font-semibold text-card-foreground">{case_.title}</h3>
                          <Badge variant={case_.type === 'confidential' ? 'destructive' : 'secondary'}>
                            {case_.type}
                          </Badge>
                          <Badge variant={getPriorityVariant(case_.priority)}>
                            {case_.priority}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{case_.description}</p>
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>{case_.investigator}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3" />
                            <span>{case_.amount}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{case_.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>Updated {case_.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="flex items-center space-x-1 mb-1">
                            {getStatusIcon(case_.status)}
                            <span className="text-sm font-medium">{case_.status}</span>
                          </div>
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div 
                              className="bg-cyber-cyan h-2 rounded-full"
                              style={{ width: `${case_.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{case_.progress}%</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="cyber-outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          {(userRole === 'admin' || case_.type === 'non-confidential') && (
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CaseLibrary;