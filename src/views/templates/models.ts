import { RouteChildrenProps } from 'react-router';
import { History } from 'history';

export interface TemplatesViewProps {
  activeCategory: string;
  history: History;
}

export interface ConnectedTemplatesViewProps extends RouteChildrenProps<{ category: string }> {}
