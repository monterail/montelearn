import React from 'react';
import {
  List,
  Datagrid,
  TextField,
} from 'react-admin';

export const LessonList = props => (
  <List {...props} >
    <Datagrid>
      <TextField source="name" />
      <TextField source="description" />
    </Datagrid>
  </List>
);
