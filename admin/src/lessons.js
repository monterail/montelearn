import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
} from 'react-admin';

const ListActions = ({ record, basePath, resource }) => (
  <ShowButton basePath={basePath} record={{ id: record["id"] }} />
);

export const LessonList = props => (
  <List {...props} >
    <Datagrid>
      <TextField source="name" />
      <TextField source="description" />
      <ListActions />
    </Datagrid>
  </List>
);
