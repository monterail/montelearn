import React from "react";
import { Show, SimpleShowLayout, TextField, TopToolbar, UrlField, SelectField } from "react-admin";
import { subjectChoices, gradeChoices } from "@/data/lessonChoices";

export default function ShowLesson(props) {
  return (
    <Show actions={<TopToolbar />} {...props}>
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source="description" />
        <UrlField source="pdf_file" />
        <UrlField source="url" />
        <SelectField source="subject" choices={subjectChoices} />
        <SelectField source="grade" choices={gradeChoices} />
      </SimpleShowLayout>
    </Show>
  );
}
