import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Search, 
  Brain,
  Network,
  FileSearch,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Activity,
  Zap,
  Database,
  Eye,
  Target,
  ArrowRight,
  TrendingUp,
  Clock
} from "lucide-react";

interface InvestigationToolsProps {
  caseId?: string;
}

const InvestigationTools = ({ caseId = 'CYB-2024-001' }: InvestigationToolsProps) => {
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [transactionData, setTransactionData] = useState('');
  const [bankRequest, setBankRequest] = useState('');

  const mockAnalysisResults = {
    behaviorScore: 87,
    riskLevel: 'High',
    muleAccounts: [
      {
        account: '****2847',
        bank: 'SBI',
        confidence: 94,
        transactions: 23,
        amount: '₹1,45,000',
        pattern: 'Rapid in-out transactions'
      },
      {
        account: '****6139',
        bank: 'HDFC',
        confidence: 78,
        transactions: 15,
        amount: '₹89,000',
        pattern: 'Multiple small deposits'
      }
    ],
    timeline: [
      { time: '10:15 AM', event: 'Initial fraud transaction', amount: '₹25,000' },
      { time: '10:18 AM', event: 'Transfer to mule account ****2847', amount: '₹25,000' },
      { time: '10:22 AM', event: 'Cash withdrawal from ****2847', amount: '₹20,000' },
      { time: '10:45 AM', event: 'Transfer to second mule ****6139', amount: '₹5,000' }
    ]
  };

  const handleBehaviorAnalysis = () => {
    setAnalysisRunning(true);
    // Simulate ML analysis
    setTimeout(() => {
      setAnalysisRunning(false);
    }, 3000);
  };

  const handleBankRequest = (accountNumber: string, bankName: string) => {
    setBankRequest(`Requesting transaction data for account ${accountNumber} from ${bankName}`);
    // In real implementation, this would trigger an API call to bank's system
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-card-foreground">Investigation Tools</h1>
          <p className="text-muted-foreground">
            AI-powered analysis and transaction tracing for case {caseId}
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1 border-cyber-cyan text-cyber-cyan">
          Active Case: {caseId}
        </Badge>
      </div>

      <Tabs defaultValue="analysis" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analysis">ML Analysis</TabsTrigger>
          <TabsTrigger value="tracing">Transaction Tracing</TabsTrigger>
          <TabsTrigger value="requests">Bank Requests</TabsTrigger>
          <TabsTrigger value="timeline">Investigation Log</TabsTrigger>
        </TabsList>

        {/* ML Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Behavior Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-cyber-cyan" />
                  Behavior Analysis Model
                </CardTitle>
                <CardDescription>
                  AI-powered scammer behavior pattern analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste transaction data or account details for analysis..."
                  value={transactionData}
                  onChange={(e) => setTransactionData(e.target.value)}
                  rows={4}
                />
                <div className="flex space-x-2">
                  <Button 
                    variant="cyber" 
                    onClick={handleBehaviorAnalysis}
                    disabled={analysisRunning}
                    className="flex-1"
                  >
                    {analysisRunning ? (
                      <>
                        <Activity className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        Run Analysis
                      </>
                    )}
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Data
                  </Button>
                </div>

                {/* Analysis Progress */}
                {analysisRunning && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processing transaction patterns...</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                )}

                {/* Results */}
                {!analysisRunning && transactionData && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Analysis Complete</AlertTitle>
                    <AlertDescription>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span>Behavior Score:</span>
                          <Badge variant="destructive">{mockAnalysisResults.behaviorScore}/100</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Risk Level:</span>
                          <Badge variant="destructive">{mockAnalysisResults.riskLevel}</Badge>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Mule Account Detection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Network className="h-5 w-5 mr-2 text-cyber-orange" />
                  Mule Account Detection
                </CardTitle>
                <CardDescription>
                  Identify probable mule accounts in transaction chain
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {mockAnalysisResults.muleAccounts.map((account, index) => (
                    <div key={index} className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Target className="h-4 w-4 text-warning" />
                          <span className="font-medium">{account.account}</span>
                          <Badge variant="outline">{account.bank}</Badge>
                        </div>
                        <Badge variant={account.confidence > 90 ? 'destructive' : 'secondary'}>
                          {account.confidence}% confidence
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>Transactions: {account.transactions}</div>
                        <div>Amount: {account.amount}</div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Pattern: {account.pattern}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-3 w-full border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-cyan-foreground"
                        onClick={() => handleBankRequest(account.account, account.bank)}
                      >
                        <Database className="h-3 w-3 mr-1" />
                        Request Bank Data
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Transaction Tracing Tab */}
        <TabsContent value="tracing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ArrowRight className="h-5 w-5 mr-2 text-cyber-cyan" />
                Transaction Flow Analysis
              </CardTitle>
              <CardDescription>
                Trace fund flow from source to final beneficiary
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalysisResults.timeline.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-cyber-cyan rounded-full flex items-center justify-center text-cyber-cyan-foreground text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-card-foreground">{step.event}</p>
                        <div className="text-right">
                          <p className="font-bold text-destructive">{step.amount}</p>
                          <p className="text-sm text-muted-foreground">{step.time}</p>
                        </div>
                      </div>
                    </div>
                    {index < mockAnalysisResults.timeline.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-success" />
                  <span className="font-medium text-success">Final Beneficiary Identified</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Account ****6139 appears to be the end point with funds remaining
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bank Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-cyber-orange" />
                Bank Data Requests
              </CardTitle>
              <CardDescription>
                Manage and track bank transaction data requests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-medium mb-2">New Request</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Account Number" />
                  <Input placeholder="Bank Name" />
                </div>
                <Textarea 
                  placeholder="Request details and investigation context..." 
                  className="mt-3"
                  rows={3}
                />
                <Button variant="cta" className="mt-3">
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Request
                </Button>
              </div>

              {bankRequest && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Request Submitted</AlertTitle>
                  <AlertDescription>{bankRequest}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <h4 className="font-medium">Pending Requests</h4>
                <div className="space-y-2">
                  {['SBI - Account ****2847', 'HDFC - Account ****6139'].map((request, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <span className="text-sm">{request}</span>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Investigation Log Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileSearch className="h-5 w-5 mr-2 text-cyber-cyan" />
                Investigation Timeline
              </CardTitle>
              <CardDescription>
                Chronological log of all investigative actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: '2024-01-28 14:30', action: 'Behavior analysis completed', user: 'System', status: 'completed' },
                  { time: '2024-01-28 14:15', action: 'Transaction data uploaded', user: 'Priya Sharma', status: 'completed' },
                  { time: '2024-01-28 13:45', action: 'Bank request submitted to SBI', user: 'Priya Sharma', status: 'pending' },
                  { time: '2024-01-28 10:20', action: 'Case assigned to investigator', user: 'Admin', status: 'completed' },
                  { time: '2024-01-28 09:15', action: 'Case created and logged', user: 'System', status: 'completed' }
                ].map((log, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border border-border rounded-lg">
                    <div className="flex-shrink-0">
                      {log.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <Clock className="h-4 w-4 text-warning" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-card-foreground">{log.action}</p>
                      <p className="text-sm text-muted-foreground">
                        by {log.user} • {log.time}
                      </p>
                    </div>
                    <Badge variant={log.status === 'completed' ? 'default' : 'secondary'}>
                      {log.status}
                    </Badge>
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

export default InvestigationTools;