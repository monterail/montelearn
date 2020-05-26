import React from "react";
import { useRouter } from "next/router";
import {
  Button,
  SimpleForm,
  TextInput,
  ArrayInput,
  NullableBooleanInput,
  SelectInput,
  SimpleFormIterator,
  required,
  Toolbar,
  SaveButton,
} from "react-admin";

import { questionTypeChoices } from "@/data/testChoices";

import dataProvider from "@/services/data-provider";

export default function EditTest({ record }) {
  const router = useRouter();

  const handleDelete = () => {
    dataProvider.delete("admin/tests", { id: record.uuid }, router.reload);
  };

  return (
    <SimpleForm
      toolbar={
        <Toolbar>
          <SaveButton label="Save" redirect="show" submitOnEnter />
          <Button onClick={handleDelete} label="Delete" />
        </Toolbar>
      }
      initialValues={record}
      save={(recordData) =>
        dataProvider.updateTest({ id: recordData.uuid, data: recordData }, router.reload)
      }
    >
      <ArrayInput source="questions" validate={[required()]} label="QUESTIONS">
        <SimpleFormIterator>
          <SelectInput
            source="question_type"
            choices={questionTypeChoices}
            validate={[required()]}
            label="Question Type"
          />
          <TextInput source="content" validate={[required()]} label="Content" />
          <ArrayInput source="choices" validate={[required()]} label="CHOICES">
            <SimpleFormIterator>
              <TextInput source="answer" validate={[required()]} label="Answer" />
              <NullableBooleanInput source="correct" validate={[required()]} label="Correct" />
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  );
}
