import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  FileField,
  FileInput,
  required,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";

export default function EditLesson(props) {
  const formatFile = (value) =>
    typeof value === "string" ? { src: value, title: "Pdf file" } : value;
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} />
        <TextInput source="description" validate={[required()]} />
        <FileInput format={formatFile} multiple={false} source="pdf_file" accept="application/pdf">
          <FileField source="src" title="title" />
        </FileInput>
        <TextInput source="url" />
        <ReferenceInput label="Subject" source="subject" reference="subject">
          <AutocompleteInput allowEmpty optionValue="name" />
        </ReferenceInput>
        <ReferenceInput label="Grade" source="grade" reference="grade">
          <AutocompleteInput allowEmpty optionValue="name" />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
}
