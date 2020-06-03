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
  FormDataConsumer,
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
          <FormDataConsumer>
            {({ scopedFormData, getSource }) => (
              <ArrayInput source={getSource("choices")} validate={[required()]} label="CHOICES">
                <SimpleFormIterator
                  disableAdd={scopedFormData && scopedFormData.choices.length > 1}
                >
                  <TextInput source="answer" validate={[required()]} label="Answer" />
                  <NullableBooleanInput source="correct" validate={[required()]} label="Correct" />
                </SimpleFormIterator>
              </ArrayInput>
            )}
          </FormDataConsumer>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  );
}
