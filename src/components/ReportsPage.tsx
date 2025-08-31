import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Download,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Search,
  Filter,
  Eye,
  Share,
  Printer
} from "lucide-react";

interface CaseReport {
  id: string;
  caseId: string;
  title: string;
  investigator: string;
  dateGenerated: string;
  status: 'Draft' | 'Final' | 'Reviewed';
  type: 'Summary' | 'Detailed' | 'Timeline' | 'Financial';
  pages: number;
  confidential: boolean;
  summary: {
    totalAmount: string;
    muleAccounts: number;
    finalBeneficiary: string;
    resolutionStatus: string;
  };
  timeline: Array<{
    date: string;
    action: string;
    investigator: string;
    details: string;
  }>;
}

interface ReportsPageProps {
  userRole: 'admin' | 'investigator';
}

const ReportsPage = ({ userRole }: ReportsPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const mockReports: CaseReport[] = [
    {
      id: 'RPT-2024-001',
      caseId: 'CYB-2024-001',
      title: 'UPI Fraud Ring Investigation - Final Report',
      investigator: 'Priya Sharma',
      dateGenerated: '2024-01-28',
      status: 'Final',
      type: 'Detailed',
      pages: 12,
      confidential: true,
      summary: {
        totalAmount: '₹2,45,000',
        muleAccounts: 3,
        finalBeneficiary: 'Account ****6139',
        resolutionStatus: 'Funds Frozen'
      },
      timeline: [
        {
          date: '2024-01-15 09:15',
          action: 'Case Initiated',
          investigator: 'System',
          details: 'Complaint received and case created automatically'
        },
        {
          date: '2024-01-15 10:30',
          action: 'Initial Investigation',
          investigator: 'Priya Sharma',
          details: 'Analyzed transaction patterns and identified suspicious accounts'
        },
        {
          date: '2024-01-20 14:15',
          action: 'ML Analysis Completed',
          investigator: 'System',
          details: 'Behavior analysis score: 87/100, High risk classification'
        },
        {
          date: '2024-01-25 11:45',
          action: 'Mule Accounts Identified',
          investigator: 'Priya Sharma',
          details: 'Detected 3 probable mule accounts with 94% confidence'
        },
        {
          date: '2024-01-28 16:20',
          action: 'Final Report Generated',
          investigator: 'Priya Sharma',
          details: 'Comprehensive report with timeline and financial analysis'
        }
      ]
    },
    {
      id: 'RPT-2024-002',
      caseId: 'CYB-2024-002',
      title: 'Social Media Impersonation Analysis',
      investigator: 'Rahul Singh',
      dateGenerated: '2024-01-27',
      status: 'Reviewed',
      type: 'Summary',
      pages: 5,
      confidential: false,
      summary: {
        totalAmount: '₹15,000',
        muleAccounts: 1,
        finalBeneficiary: 'Account ****3421',
        resolutionStatus: 'Under Investigation'
      },
      timeline: [
        {
          date: '2024-01-20 11:20',
          action: 'Case Assigned',
          investigator: 'Admin',
          details: 'Case assigned to investigator for detailed analysis'
        },
        {
          date: '2024-01-22 15:30',
          action: 'Evidence Collection',
          investigator: 'Rahul Singh',
          details: 'Collected social media posts and transaction screenshots'
        },
        {
          date: '2024-01-27 09:45',
          action: 'Summary Report Prepared',
          investigator: 'Rahul Singh',
          details: 'Prepared preliminary findings and recommendations'
        }
      ]
    }
  ];

  const filteredReports = mockReports.filter(report => {
    // Role-based filtering
    if (userRole === 'investigator' && report.confidential) {
      return false;
    }

    // Search filter
    if (searchTerm && !report.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !report.caseId.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Status filter
    if (statusFilter !== 'all' && report.status !== statusFilter) {
      return false;
    }

    // Type filter
    if (typeFilter !== 'all' && report.type !== typeFilter) {
      return false;
    }

    return true;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Final': return 'default';
      case 'Reviewed': return 'secondary';
      case 'Draft': return 'outline';
      default: return 'outline';
    }
  };

  const generateReport = (caseId: string, type: string) => {
    console.log(`Generating ${type} report for case ${caseId}`);
    // In real implementation, this would trigger report generation
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-card-foreground">Case Reports</h1>
          <p className="text-muted-foreground">
            Comprehensive investigation reports with chronological logs and analysis
          </p>
        </div>
        <Button variant="cta">
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">All Reports</TabsTrigger>
          <TabsTrigger value="generate">Generate New</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        {/* All Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports..."
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
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Reviewed">Reviewed</SelectItem>
                    <SelectItem value="Final">Final</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Summary">Summary</SelectItem>
                    <SelectItem value="Detailed">Detailed</SelectItem>
                    <SelectItem value="Timeline">Timeline</SelectItem>
                    <SelectItem value="Financial">Financial</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reports List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-elevated transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{report.id}</Badge>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusVariant(report.status)}>
                        {report.status}
                      </Badge>
                      {report.confidential && (
                        <Badge variant="destructive">Confidential</Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <CardDescription>Case ID: {report.caseId}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span>{report.investigator}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span>{report.dateGenerated}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-3 w-3 text-muted-foreground" />
                      <span>{report.pages} pages</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{report.type}</Badge>
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="border border-border rounded-lg p-3 bg-muted/30">
                    <h4 className="font-medium text-sm mb-2">Investigation Summary</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Amount: <span className="font-medium text-destructive">{report.summary.totalAmount}</span></div>
                      <div>Mule Accounts: <span className="font-medium">{report.summary.muleAccounts}</span></div>
                      <div className="col-span-2">
                        Final Beneficiary: <span className="font-medium">{report.summary.finalBeneficiary}</span>
                      </div>
                      <div className="col-span-2">
                        Status: <Badge variant="secondary" className="text-xs">{report.summary.resolutionStatus}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Generate New Report Tab */}
        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate New Report</CardTitle>
              <CardDescription>
                Create comprehensive investigation reports with automated analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Case ID</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select case" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CYB-2024-001">CYB-2024-001 - UPI Fraud Ring</SelectItem>
                      <SelectItem value="CYB-2024-002">CYB-2024-002 - Social Media Scam</SelectItem>
                      <SelectItem value="CYB-2024-003">CYB-2024-003 - Crypto Investment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summary">Summary Report</SelectItem>
                      <SelectItem value="detailed">Detailed Analysis</SelectItem>
                      <SelectItem value="timeline">Timeline Report</SelectItem>
                      <SelectItem value="financial">Financial Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Report Sections</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Executive Summary',
                    'Investigation Timeline',
                    'Transaction Analysis',
                    'ML Analysis Results',
                    'Mule Account Detection',
                    'Financial Flow Diagram',
                    'Evidence Collection',
                    'Recommendations'
                  ].map((section) => (
                    <label key={section} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">{section}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="cta" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: 'Standard Investigation Report',
                description: 'Comprehensive report template with all sections',
                sections: 8,
                usage: 'Most Common'
              },
              {
                name: 'Quick Summary Report',
                description: 'Condensed report for preliminary findings',
                sections: 4,
                usage: 'Fast Turnaround'
              },
              {
                name: 'Financial Analysis Report',
                description: 'Focused on transaction patterns and flows',
                sections: 6,
                usage: 'Complex Cases'
              }
            ].map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Sections: {template.sections}</span>
                    <Badge variant="outline">{template.usage}</Badge>
                  </div>
                  <Button variant="outline" className="w-full border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-cyan-foreground">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;