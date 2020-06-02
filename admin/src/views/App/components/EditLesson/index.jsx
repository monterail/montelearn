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
  const formatFile = (value) => {
    if (typeof value === "string") {
      const pdfName = value.substring(value.indexOf("/lesson/") + 8);
      // value is a url, after /lesson/ + 8 characters there will be a file name
      return { src: value, title: pdfName };
    }
    return value;
  };

  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} />
        <TextInput source="description" validate={[required()]} />
        <FileInput format={formatFile} multiple={false} source="pdf_file" accept="application/pdf">
          <FileField source="src" title="title" target="_blank" />
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
