import React from 'react';
import { ListGuesser, ShowGuesser } from 'react-admin';
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import { LessonList, LessonShow } from './lessons';

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} >
    <Resource name="lesson" list={LessonList} show={LessonShow} />
  </Admin>
)

export default App;
