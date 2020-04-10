import React, { ComponentType } from 'react';
import { AxiosInstance } from 'axios';

import { Alert, AlertCloseEvent } from '.';

import { AlertsManagerState } from '.';

export const withAlertsManagement = (Component: ComponentType) => (instance: AxiosInstance) => {
  class AlertsManager extends React.Component<any, AlertsManagerState> {
    state: AlertsManagerState = {
      alerts: []
    };

    responseInterceptor = null;

    componentDidMount() {
      this.responseInterceptor = instance.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          this.setState({
            alerts: [
              ...this.state.alerts,
              {
                status: error.response.status,
                message: error.response.data.errors[0],
                type: 'error'
              }
            ]
          });
          return error;
        }
      );
    }

    componentWillUnmount() {
      instance.interceptors.response.eject(this.responseInterceptor);
    }

    closeAlert = (e: AlertCloseEvent) => {
      const alertIdx = +e.currentTarget.getAttribute('data-idx');

      this.setState({
        alerts: this.state.alerts.filter((_, idx) => idx !== alertIdx)
      });
    };

    render() {
      return (
        <>
          {this.state.alerts.map(({ message, type }, idx) => (
            <Alert key={idx} idx={idx} message={message} type={type} onClose={this.closeAlert} />
          ))}
          <Component {...this.props} />
        </>
      );
    }
  }

  return AlertsManager;
};
