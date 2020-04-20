import React from 'react';
import { ListGuesser } from 'react-admin';
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';

const App = () => (
  <Admin dataProvider={dataProvider} >
    <Resource name="lesson" list={ListGuesser} />
  </Admin>
)

export default App;
