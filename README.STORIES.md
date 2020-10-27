# Legend

- **NLU** - not logged user,
- **LU** - logged user,
- **AU** - admin user

# 0: As a **NLU**, I want to log in

- **NLU** is navigated to **[LOGIN_SCREEN]**
- **LU** and **AU** are redirected backwards
- **[HEADER]** with "Log In" text id is displayed
- **[EMAIL_FIELD]**  is displayed
   - `Email format validation` added
- **[PASSWORD_FIELD]** is displayed
   - Password format validation `(8, 20)` length added
- **[VALIDATION_MESSAGE]** displayed after form submission for invalid **[EMAIL_FIELD]** **[PASSWORD_FIELD]** fields
- **[FORGOT_PASSWORD_LINK]** redirects to **[FORGOT_PASSWORD_SCREEN]**
- **[SUBMIT_BUTTON]** displayed in form
   - Enabled by default
   - Disabled after submission / if atleast one field is invalid
   - After submission displays loaders
   - For valid credentials redirects to application templates
- **[LOG_IN_GITHUB]** button displayed
   - Redirects to github auth process
   - After success auth redirects to **[TEMPLATES_SCREEN]**


