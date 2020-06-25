export interface SidebarLink {
    label: string;
    path: string;
    icon: React.ReactNode;
    exact?: boolean;
  }
  
  export interface SidebarProps {
    basePath: string;
  }