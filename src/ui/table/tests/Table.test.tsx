import React from 'react';
import { render, screen } from '@testing-library/react';

import { Table } from '..';

describe('<Table>', () => {
  interface User {
    id: number;
    firstName: string;
    lastName: string;
  }

  it('adds className', () => {
    const { container } = render(
      <Table className="class" config={{}} data={[]} />
    );

    expect(container.querySelector('.class')).toBeInTheDocument();
  });

  it('diplays column', () => {
    render(
      <Table
        config={{
          id: {
            label: 'Id',
          },
          firstName: {
            col: () => <span title="First name">First name</span>,
          },
          lastName: {},
        }}
        data={[]}
      />
    );

    expect(screen.getByTitle('First name')).toBeInTheDocument();
    expect(screen.getByText('Id')).toBeInTheDocument();
    expect(screen.getByText('First name')).toBeInTheDocument();
    expect(screen.getByText('lastName')).toBeInTheDocument();
  });

  it('renders data', () => {
    render(
      <Table
        config={{
          id: {},
          firstName: {},
          lastName: {},
        }}
        data={[
          { id: 0, firstName: 'Piotr', lastName: 'Piotrowicz' },
          { id: 1, firstName: 'Tomek', lastName: 'Tomaszewski' },
          { id: 2, firstName: 'Arek', lastName: 'Milik' },
        ]}
      />
    );

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Piotr')).toBeInTheDocument();
    expect(screen.getByText('Tomek')).toBeInTheDocument();
    expect(screen.getByText('Arek')).toBeInTheDocument();
    expect(screen.getByText('Piotrowicz')).toBeInTheDocument();
    expect(screen.getByText('Tomaszewski')).toBeInTheDocument();
    expect(screen.getByText('Milik')).toBeInTheDocument();
  });

  it('renders data row component', () => {
    render(
      <Table
        config={{
          id: {},
          firstName: {
            row: (key, data) => (
              <span title={`First name ${data.firstName}`}>
                {data.firstName}
              </span>
            ),
          },
          lastName: {},
        }}
        data={[
          { id: 0, firstName: 'Piotr', lastName: 'Piotrowicz' },
          { id: 1, firstName: 'Tomek', lastName: 'Tomaszewski' },
          { id: 2, firstName: 'Arek', lastName: 'Milik' },
        ]}
      />
    );

    expect(screen.getByTitle('First name Piotr')).toBeInTheDocument();
    expect(screen.getByTitle('First name Tomek')).toBeInTheDocument();
    expect(screen.getByTitle('First name Arek')).toBeInTheDocument();
    expect(screen.getByText('Piotr')).toBeInTheDocument();
    expect(screen.getByText('Tomek')).toBeInTheDocument();
    expect(screen.getByText('Arek')).toBeInTheDocument();
  });

  describe('getConfigItems()', () => {
    it('gets config items', () => {
      expect(
        Table.getConfigItems({
          id: {
            label: 'Id',
          },
          firstName: {
            row: (label, value) => (
              <span title={`First name ${value}`}>{value}</span>
            ),
          },
          lastName: {
            size: {
              min: '300px',
              max: '2fr',
            },
          },
        })
      ).toEqual([
        { key: 'id', label: 'Id', size: { min: '150px', max: '1fr' } },
        {
          key: 'firstName',
          label: 'firstName',
          size: { min: '150px', max: '1fr' },
        },
        {
          key: 'lastName',
          label: 'lastName',
          size: { min: '300px', max: '2fr' },
        },
      ]);
    });
  });

  describe('getGridTemplateColumns()', () => {
    it('gets grid template columns', () => {
      const configItems = Table.getConfigItems({
        id: {
          label: 'Id',
        },
        firstName: {
          row: (label, value) => (
            <span title={`First name ${value}`}>{value}</span>
          ),
        },
        lastName: {
          size: {
            min: '300px',
            max: '2fr',
          },
        },
      });

      expect(Table.getGridTemplateColumns(configItems)).toEqual(
        'minmax(150px, 1fr) minmax(150px, 1fr) minmax(300px, 2fr)'
      );
    });
  });
});
