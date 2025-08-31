import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Shield, 
  FolderOpen, 
  Search, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  Home,
  Users,
  BarChart3,
  Bell
} from "lucide-react";

interface LayoutProps {
  userRole: 'admin' | 'investigator' | 'public';
  userName?: string;
}

const Layout = ({ userRole = 'investigator', userName = 'Officer Kumar' }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      icon: Home,
      path: '/',
      roles: ['admin', 'investigator']
    },
    {
      label: 'Case Library',
      icon: FolderOpen,
      path: '/cases',
      roles: ['admin', 'investigator']
    },
    {
      label: 'Investigation Tools',
      icon: Search,
      path: '/investigate',
      roles: ['admin', 'investigator']
    },
    {
      label: 'Reports',
      icon: FileText,
      path: '/reports',
      roles: ['admin', 'investigator']
    },
    {
      label: 'User Management',
      icon: Users,
      path: '/users',
      roles: ['admin']
    },
    {
      label: 'Analytics',
      icon: BarChart3,
      path: '/analytics',
      roles: ['admin']
    }
  ];

  const filteredNav = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-surface flex">
      {/* Sidebar */}
      <div className={`bg-card border-r border-border transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-16'
      } flex flex-col shadow-elevated`}>
        
        {/* Header */}
        <div className="p-4 border-b border-border bg-gradient-primary">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 ${!sidebarOpen && 'justify-center'}`}>
              <Shield className="h-8 w-8 text-cyber-cyan" />
              {sidebarOpen && (
                <div>
                  <h1 className="text-lg font-bold text-primary-foreground">
                    Cyber Shikayat
                  </h1>
                  <p className="text-sm text-primary-foreground/80">
                    Investigation Portal
                  </p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-border">
          <div className={`flex items-center space-x-3 ${!sidebarOpen && 'justify-center'}`}>
            <Avatar>
              <AvatarFallback className="bg-cyber-cyan text-cyber-cyan-foreground">
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div>
                <p className="font-medium text-card-foreground">{userName}</p>
                <Badge variant="secondary" className="text-xs">
                  {userRole === 'admin' ? 'Administrator' : 'Investigator'}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            {filteredNav.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Button
                    variant={isActive(item.path) ? "cyber" : "ghost"}
                    className={`w-full justify-start ${!sidebarOpen && 'justify-center px-2'}`}
                    onClick={() => navigate(item.path)}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {sidebarOpen && item.label}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-border">
          <Button
            variant="ghost"
            className={`w-full justify-start text-muted-foreground hover:text-destructive ${!sidebarOpen && 'justify-center px-2'}`}
          >
            <LogOut className="h-4 w-4 mr-3" />
            {sidebarOpen && 'Logout'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-card border-b border-border px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">
                {filteredNav.find(item => isActive(item.path))?.label || 'Dashboard'}
              </h2>
              <p className="text-sm text-muted-foreground">
                Cybercrime Investigation & Analysis Platform
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;