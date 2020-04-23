import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  Show,
  SimpleShowLayout,
  UrlField,
  TopToolbar,
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

const ShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
  </TopToolbar>
);

export const LessonShow = props => (
  <Show actions={<ShowActions />} {...props}>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="description" />
      <UrlField source="pdf_file" />
      <UrlField source="url" />
    </SimpleShowLayout>
  </Show>
);
