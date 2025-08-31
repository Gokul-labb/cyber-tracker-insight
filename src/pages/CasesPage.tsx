import CaseLibrary from "@/components/CaseLibrary";

const CasesPage = () => {
  // In a real app, this would come from authentication context
  const userRole = 'investigator' as 'admin' | 'investigator';
  
  return <CaseLibrary userRole={userRole} />;
};

export default CasesPage;