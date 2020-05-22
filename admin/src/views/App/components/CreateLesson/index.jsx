import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  FileField,
  FileInput,
  required,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";

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
        <ReferenceInput label="Subject" source="subject" reference="subject">
          <AutocompleteInput allowEmpty optionValue="name" />
        </ReferenceInput>
        <ReferenceInput label="Grade" source="grade" reference="grade">
          <AutocompleteInput allowEmpty optionValue="name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
}
