import React from 'react';
import csx from './SidebarTrigger.scss';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const burgerClass = sidebarOpen ? csx.burgerActive : csx.burgerInactive;
  return (
    <button className={`${csx.burger} ${burgerClass}`} onClick={() => setSidebarOpen()}>
      <div />
      <div />
      <div />
    </button>
  );
};

export default Sidebar;
