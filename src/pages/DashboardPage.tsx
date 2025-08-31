import Dashboard from "@/components/Dashboard";

const DashboardPage = () => {
  // In a real app, this would come from authentication context
  const userRole = 'investigator' as 'admin' | 'investigator';
  
  return <Dashboard userRole={userRole} />;
};

export default DashboardPage;