import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  FileField,
  FileInput,
  required,
  SelectInput,
} from "react-admin";

import { subjectChoices, gradeChoices } from "@/data/lessonChoices";

export default function CreateLesson(props) {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} />
        <TextInput source="description" validate={[required()]} />
        <FileInput
          multiple={false}
          source="pdf_file"
          accept="application/pdf"
          validate={[required()]}
        >
          <FileField source="src" title="title" />
        </FileInput>
        <TextInput source="url" />
        <SelectInput source="subject" choices={subjectChoices} />
        <SelectInput source="grade" choices={gradeChoices} />
      </SimpleForm>
    </Create>
  );
}
