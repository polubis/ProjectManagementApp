### Technologies
`Typescript`, 
`React`, 
`Webpack`, 
`Jest`, 
`React testing library`, 
`RxJs`,
`scss`

### Folders structure
- **styles**
  Includes global styles setup, mixins, theme palette, reset styles and palette definition for ts files usage
- **ui**
    Includes plain ui components like `datepicker` or `form fields`, `buttons`. In this folder we should create only dumb components which takes configuration and displaying interface. 
- **shared** 
Includes elements which are connected to business logic. For example - component which allows to render button only for *template author* should be placed here.
Also components which are reused between modules content. 
- **core**
Contains things that are critical to the application. Such as authorization module, api connection layer, models and interceptors.
- **utils** 
Contains helper functions, hooks, scroll interaction handlers and etc...
- **modules**
Contains completely independent folders. Each of them is a separate module and should be topped up with lazy loading.
This folders basicaly contain app pages.

> Every folder use different conventions inside becuase they are different and independent modules.

### Naming conventions

- **Files**
All files should have short names that suggest their role at the same time
    - for `components` file should have same name as folder - for folder home we file `Home.tsx` and `Home.scss
    - business logic based provider component should have postfix `Provider` - `NameOfComponentProvider`,
    - guards should have postfix `Guard` - `NameOfComponentGuard`
    - `component` which contains route definition should have postfix `Router` - `ModulesRouter`
- **Variables**
    - `constant` variables should have big letter conventions `NAME_OF_VARIABLE`. If we have object which allows to set initial state in component/class we using also `STATE` convention
    - `mock variables` in unit tests should have big letter conventions and pre/post fix `_NAME_OF_MOCK_VARIABLE_`
    - `functions` - keep function names simple and small f.e function which creates new user inside of class `User` should be named `create` not `createUser` same for functional programming. 
    - `type definitions` - if we have response from backend which returns list of users then we should create type `User`. For components we using same convention - `namespaces` with short type names
    - `scss` variables using `camel case`


### Patterns

- **Imports order and spacing**
All independent sections in imports should be separated with `enter`.
    ```ts
    import React, { useMemo } from 'react';
    import { useHistory } from 'react-router'; // 1 section
    
    import { Button } from 'ui'; // 2 section
    
    import { TemplatesGrid, TemplatesSearch } from 'shared/components'; // 3 section
    
    import TemplatesProvider, { useTemplatesProvider } from './TemplatesProvider'; // 4 section
    import { TemplatesCategories } from './components';
    import { useSearch, useRouteValidation } from './hooks';
    
    import { LIMIT } from '.'; // 5 section
    
    import csx from './Templates.scss'; // 6 section
    
    ```
- **Connection to business logic**
Business logic is managed by `Providers`. Using provider creates new component instance - and allows to create mutliple instances for multiple independent modules. 

    ```ts
    // Connection to component
    export default () => {
      return (
        <TemplatesProvider> // Provider
          <Templates /> // Enhanced component
        </TemplatesProvider>
      );
    };
    ```

- **Exporting related module files in index.ts**
Keeps imports statements small. Remember about enters and try sort from `a-z` based on `location`.
    ```ts
    import Templates from './Templates';

    export * from './models';
    export * from './utils';
    
    export default Templates;
    ```
- **Group related logic in facades**
Makes code less prone to errors.
    ```ts
    import { useEffect } from 'react';
    import { useRouteMatch, useHistory } from 'react-router';
    
    import { TemplateCategory } from 'api';
    
    import { Url } from 'utils';
    
    import { isValidCategory, TemplatesRouteProps } from '..';
    
    export const useRouteValidation = () => {
      const { location, replace } = useHistory();
    
      const {
        params: { category }
      } = useRouteMatch<TemplatesRouteProps>();
    
      useEffect(() => {
        if (!isValidCategory(category)) {
          const url = Url(location).replace(category, TemplateCategory.ALL).value();
    
          replace(url);
        }
      }, [category]);
    };
    ```
- **Create separate directory for tests**  
- **Root class in scss should be component name with camel case**
    ```scss
    @import 'styles/mixins';

    .templatesSearch { // tsx file is named TemplatesSearch
      @include col;
      padding: 60px;
    
      & > form {
        margin: 62px auto 82px auto;
      }
    }
    ```
- **Include statements always at top**
    ```scss
    @import 'styles/mixins';

    .templatesSearch { 
      @include col;
      padding: 60px;
      @include col; // invalid
    }
    ```
    
### Things to improve
- create better file / folders conventions. For example we should use in every big module conventions with additional `components`, `hooks`, `utils`, `models`, etc... directories.
- add test run before commit - and code formatter,
- prepare tslint for imports order and code quality
- move to monorepo
- stop exporting everything inside module to keep imports small fe. utils/models and etc
    
