import React from 'react';
import { ListGuesser } from 'react-admin';
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import authProvider from './authProvider';

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} >
    <Resource name="lesson" list={ListGuesser} />
  </Admin>
)

export default App;
