import React from "react";
import { Show, SimpleShowLayout, TextField, TopToolbar, UrlField } from "react-admin";

export default function ShowLesson(props) {
  return (
    <Show actions={<TopToolbar />} {...props}>
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source="description" />
        <UrlField source="pdf_file" />
        <UrlField source="url" />
      </SimpleShowLayout>
    </Show>
  );
}
