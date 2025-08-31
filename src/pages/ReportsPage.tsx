import ReportsPageComponent from "@/components/ReportsPage";

const ReportsPage = () => {
  // In a real app, this would come from authentication context
  const userRole = 'investigator' as 'admin' | 'investigator';
  
  return <ReportsPageComponent userRole={userRole} />;
};

export default ReportsPage;