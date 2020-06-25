import { RouteChildrenProps } from 'react-router';
import { History } from 'history';

export interface TemplatesProps {
  activeCategory: string;
  history: History;
}

export interface ConnectedTemplatesProps extends RouteChildrenProps<{ category: string }> {}
