import React, { createContext, ReactNode, useContext } from 'react';
import { Subscription, from } from 'rxjs';

import { FavouriteTemplate, Template } from 'shared/models';
import {
  getFavouriteTemplates,
  addTemplateToFavourites,
  removeTemplateFromFavourites,
} from 'shared/services';
import AlertsProvider, { AlertsContext } from 'shared/providers/alerts';

namespace FavouriteTemplatesProvider {
  export interface State {
    error: string;
    loading: boolean;
    templates: FavouriteTemplate[];
    pendingTemplates: Record<string, boolean>;
    getFavouriteTemplates(): void;
    addTemplateToFavourites(template: Template): void;
    removeTemplateFromFavourites(templateId: string): void;
    isFavouriteTemplate(templateId: string): boolean;
  }

  export interface Props {
    children: ReactNode;
  }
}

const STATE: FavouriteTemplatesProvider.State = {
  error: '',
  loading: true,
  templates: [],
  pendingTemplates: {},
  getFavouriteTemplates: () => {},
  addTemplateToFavourites: () => {},
  removeTemplateFromFavourites: () => {},
  isFavouriteTemplate: () => false,
};

const Context = createContext(STATE);

class Provider extends React.Component<FavouriteTemplatesProvider.Props, typeof STATE> {
  static contextType = AlertsContext;

  context: React.ContextType<React.Context<AlertsProvider.State>>;

  private _subs = new Subscription();

  private _setPendingTemplates = (templateId: string, value: boolean): void => {
    this.setState(({ pendingTemplates }) => ({
      pendingTemplates: {
        ...pendingTemplates,
        [templateId]: value,
      },
    }));
  };

  isFavouriteTemplate = (templateId: string): boolean =>
    this.state.templates.some((template) => template.id === templateId);

  componentDidMount(): void {
    this.getFavouriteTemplates();
  }

  componentWillUnmount(): void {
    this._subs.unsubscribe();
  }

  addTemplateToFavourites = (template: Template): void => {
    this._setPendingTemplates(template.id, true);

    const add$ = from(addTemplateToFavourites(template.id));

    this._subs.add(
      add$.subscribe(
        () => {
          this._setPendingTemplates(template.id, false);
          this.setState((prevState) => ({
            templates: [...prevState.templates, { ...template, isFavourite: true }],
          }));
          this.context.showAlert({ message: 'Template saved', type: 'success' });
        },
        (message) => {
          this._setPendingTemplates(template.id, false);
          this.context.showAlert(message);
        }
      )
    );
  };

  removeTemplateFromFavourites = (templateId: string): void => {
    this._setPendingTemplates(templateId, true);

    const remove$ = from(removeTemplateFromFavourites(templateId));

    this._subs.add(
      remove$.subscribe(
        () => {
          this._setPendingTemplates(templateId, false);
          this.setState((prevState) => ({
            templates: prevState.templates.filter(({ id }) => id !== templateId),
          }));
          this.context.showAlert({ message: 'Template removed from saved', type: 'success' });
        },
        (message) => {
          this._setPendingTemplates(templateId, false);
          this.context.showAlert(message);
        }
      )
    );
  };

  getFavouriteTemplates = (): void => {
    this.setState({ loading: true, error: '', templates: [] });

    const load$ = from(getFavouriteTemplates('', 1000, 1));

    this._subs.add(
      load$.subscribe(
        (templates) => {
          this.setState({
            loading: false,
            error: '',
            templates: templates.map(
              (template): FavouriteTemplate => ({
                ...template,
                isFavourite: true,
              })
            ),
          });
        },
        (message) => {
          this.setState({ loading: false, error: message, templates: [] });
        }
      )
    );
  };

  readonly state: typeof STATE = {
    ...STATE,
    getFavouriteTemplates: this.getFavouriteTemplates,
    addTemplateToFavourites: this.addTemplateToFavourites,
    removeTemplateFromFavourites: this.removeTemplateFromFavourites,
    isFavouriteTemplate: this.isFavouriteTemplate,
  };

  render = () => <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
}

const FavouriteTemplatesProvider = Provider;

export const useFavouriteTemplatesProvider = (): FavouriteTemplatesProvider.State => {
  const context = useContext(Context);

  return context;
};

export default FavouriteTemplatesProvider;
