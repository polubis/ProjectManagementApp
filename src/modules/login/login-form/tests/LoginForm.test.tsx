import React from 'react';
import { Router } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { LogInPayload } from 'core/api';

import LoginForm from '..';

describe('<LoginForm>', () => {
  describe('after submission', () => {
    it('disables submit for invalid fields', () => {
      render(
        <Router history={createMemoryHistory()}>
          <LoginForm onSubmit={() => {}} />
        </Router>
      );

      fireEvent.click(screen.getByText(/submit/i).closest('button'));

      expect(screen.getByText(/submit/i).closest('button')).toBeDisabled();
    });

    it('display errors for invalid fields', () => {
      render(
        <Router history={createMemoryHistory()}>
          <LoginForm onSubmit={() => {}} />
        </Router>
      );

      fireEvent.click(screen.getByText(/submit/i).closest('button'));
      fireEvent.change(screen.getByPlaceholderText(/username/i), {
        target: { value: 'a' },
      });
      fireEvent.change(screen.getByPlaceholderText(/password/i), {
        target: { value: 'a' },
      });

      expect(screen.getByText(/invalid username/i)).toBeInTheDocument();
      expect(screen.getByText(/invalid password/i)).toBeInTheDocument();
    });
  });

  describe('before submission', () => {
    it('allows submit', () => {
      render(
        <Router history={createMemoryHistory()}>
          <LoginForm onSubmit={() => {}} />
        </Router>
      );

      expect(screen.getByText(/submit/i).closest('button')).not.toBeDisabled();
    });

    it('hiddes errors', () => {
      render(
        <Router history={createMemoryHistory()}>
          <LoginForm onSubmit={() => {}} />
        </Router>
      );

      fireEvent.change(screen.getByPlaceholderText(/username/i), {
        target: { value: 'a' },
      });
      fireEvent.change(screen.getByPlaceholderText(/password/i), {
        target: { value: 'a' },
      });

      expect(screen.queryByText(/invalid username/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/invalid password/i)).not.toBeInTheDocument();
    });
  });

  it('validates', () => {
    render(
      <Router history={createMemoryHistory()}>
        <LoginForm onSubmit={() => {}} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'aa' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'aaa' },
    });
    fireEvent.click(screen.getByText(/submit/i).closest('button'));

    expect(screen.getByText(/invalid username/i)).toBeInTheDocument();
    expect(screen.queryByText(/invalid password/i)).not.toBeInTheDocument();
    expect(screen.getByText(/submit/i).closest('button')).toBeDisabled();
  });

  it('changes values', () => {
    render(
      <Router history={createMemoryHistory()}>
        <LoginForm onSubmit={() => {}} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'a' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'a' },
    });

    expect(screen.getByPlaceholderText(/username/i)).toHaveValue('a');
    expect(screen.getByPlaceholderText(/password/i)).toHaveValue('a');
  });

  it('submits on correct data', () => {
    const [_USERNAME_, _PASSWORD_] = ['aaa', 'aaa'];
    const spy = jest.fn();
    render(
      <Router history={createMemoryHistory()}>
        <LoginForm onSubmit={spy} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: _USERNAME_ },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: _PASSWORD_ },
    });
    fireEvent.click(screen.getByText(/submit/i).closest('button'));

    expect(spy).toHaveBeenCalledWith({
      password: _PASSWORD_,
      username: _USERNAME_,
    } as LogInPayload);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
