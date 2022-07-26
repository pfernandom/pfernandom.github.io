import * as React from 'react';
import { makeAutoObservable } from 'mobx';

type CountProviderProps = { children: React.ReactNode };

export class LayoutService {
  selectedRole = '';

  selectedSkill = '';

  constructor() {
    makeAutoObservable(this);
  }

  setRoleAndSkill({ role, skill }) {
    this.selectedRole = role;
    this.selectedSkill = skill;
  }

  getIsSkillSelected() {
    return this.selectedSkill?.length > 0;
  }

  clearFilters() {
    this.selectedRole = '';
    this.selectedSkill = '';
  }
}

const layoutService = new LayoutService();
const LayoutContext = React.createContext(layoutService);

function LayoutProvider({ children }: CountProviderProps) {
  return <LayoutContext.Provider value={layoutService}>{children}</LayoutContext.Provider>;
}

function useLayoutService() {
  const context = React.useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('LayoutService must be used within a LayoutProvider');
  }
  return context;
}

export { LayoutProvider, useLayoutService };
