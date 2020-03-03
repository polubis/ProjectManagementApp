import { RegisterStepConfig } from '.';
import { req, min, max } from 'shared/forms';

export const registerStepsConfig: RegisterStepConfig[] = [
  {
    headingText: 'Email & Password',
    subHeadingText: 'Make sure your password is secure',
    iconPath:
      'M24 2L6 10v12c0 11.11 7.67 21.47 18 24 10.33-2.53 18-12.89 18-24V10L24 2zm-4 32l-8-8 2.83-2.83L20 28.34l13.17-13.17L36 18 20 34z',
    formConfig: [
      { label: 'Email', validators: [req] },
      { label: 'Password', validators: [req, min(8), max(20)] },
      { label: 'Repeated pasword', validators: [req, min(8), max(20)] }
    ]
  },
  {
    headingText: 'Personal informations',
    subHeadingText: 'Say something about yourself',
    iconPath:
      'M6 10v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4zm24 8c0 3.32-2.69 6-6 6s-6-2.68-6-6c0-3.31 2.69-6 6-6s6 2.69 6 6zM12 34c0-4 8-6.2 12-6.2S36 30 36 34v2H12v-2z',
    formConfig: null
  },
  {
    headingText: 'Work & Company',
    subHeadingText: 'Will be used for notifications and searching purposes',
    iconPath:
      'M40 12h-8V8c0-2.21-1.79-4-4-4h-8c-2.21 0-4 1.79-4 4v4H8c-2.21 0-3.98 1.79-3.98 4L4 38c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V16c0-2.21-1.79-4-4-4zm-12 0h-8V8h8v4z',
    formConfig: null
  },
  {
    headingText: 'Policy & Confirmations',
    subHeadingText: 'Read our policy and confirm account creation',
    iconPath: 'M28.8 12L28 8H10v34h4V28h11.2l.8 4h14V12z',
    formConfig: null
  }
];
