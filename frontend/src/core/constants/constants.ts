export const AppConfig = {
  appName: 'Legacy Ties',
  SITE_NAME: 'legacy-ties',
  appContactEmail: 'contact@legacy-ties.com',
};

export const envVariables = {
  localEnv: {
    apiURL: 'REACT_APP_API_URL',
  },
  firebaseEnv: {
    apiKey: 'REACT_APP_FIREBASE_API_KEY',
    authDomain: 'REACT_APP_FIREBASE_AUTH_DOMAIN',
    projectId: 'REACT_APP_FIREBASE_PROJECT_ID',
    storageBucket: 'REACT_APP_FIREBASE_STORAGE_BUCKET',
    messagingSenderId: 'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
    appId: 'REACT_APP_FIREBASE_APP_ID',
  },
};

export const MaxFamilyTrees = 2 as const;
export const MaxFamilyMembers = 20 as const;
export const MaxMigrationRecords = 2 as const;
export const MaxCulturalContexts = 5 as const;
export const MaxFamilyStories = 5 as const;
