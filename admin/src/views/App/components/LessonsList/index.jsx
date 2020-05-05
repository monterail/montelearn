import React from "react";
import { Datagrid, List, ShowButton, TextField } from "react-admin";

export default function LessonList(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="name" />
        <TextField source="description" />
        <ShowButton />
      </Datagrid>
    </List>
  );
}
