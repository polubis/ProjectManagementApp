import React, { createContext, useContext, ReactNode } from 'react';

import { Template } from 'shared/models';

namespace TemplatesHistoryProvider {
  export interface State {
    templates: Template[];
    addToHistory(template: Template): void;
  }

  export interface Props {
    children: ReactNode;
  }
}

const STATE: TemplatesHistoryProvider.State = {
  templates: [],
  addToHistory: () => {},
};

const Context = createContext(STATE);

class Provider extends React.Component<TemplatesHistoryProvider.Props, typeof STATE> {
  private _mergeTemplates = (templates: Template[], template: Template): Template[] => {
    const exist = templates.find(({ id }) => id === template.id);

    return exist
      ? templates.map((currTemplate) => (currTemplate.id === template.id ? template : currTemplate))
      : [...templates, template];
  };

  addToHistory = (template: Template): void => {
    this.setState(({ templates }) => ({
      templates: this._mergeTemplates(templates, template),
    }));
  };

  readonly state: typeof STATE = {
    ...STATE,
    addToHistory: this.addToHistory,
  };

  render = (): JSX.Element => (
    <Context.Provider value={this.state}>{this.props.children}</Context.Provider>
  );
}

const TemplatesHistoryProvider = Provider;

export const useTemplatesHistoryProvider = (): TemplatesHistoryProvider.State => {
  const context = useContext(Context);

  return context;
};

export default TemplatesHistoryProvider;
