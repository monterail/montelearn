import React from 'react';
import { Admin } from 'react-admin';
import dataProvider from './dataProvider';

const App = () => <Admin dataProvider={dataProvider} />;

export default App;
