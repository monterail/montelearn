import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  required,
  SelectInput,
  NullableBooleanInput,
} from "react-admin";

import { parse } from "query-string";

import { questionTypeChoices } from "@/data/testChoices";

// https://marmelab.com/blog/2018/07/09/react-admin-tutorials-form-for-related-records.html
export default function CreateTest(props) {
  const { lesson_uuid } = parse(props.location.search);
  const redirect = `/lesson/${lesson_uuid}/show/test`;

  return (
    <Create {...props}>
      <SimpleForm initialValues={{ lesson_uuid }} redirect={redirect}>
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
    </Create>
  );
}
