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
  FormDataConsumer,
} from "react-admin";

import { parse } from "query-string";

import { questionTypeChoices } from "@/data/testChoices";

// https://marmelab.com/blog/2018/07/09/react-admin-tutorials-form-for-related-records.html
export default function CreateTest(props) {
  const { location } = props;
  const lessonUuid = parse(location.search).lesson_uuid;
  const redirect = `/lesson/${lessonUuid}/show/test`;

  return (
    <Create {...props}>
      <SimpleForm initialValues={{ lesson_uuid: lessonUuid }} redirect={redirect}>
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
                    disableAdd={
                      scopedFormData && scopedFormData.choices && scopedFormData.choices.length > 1
                    }
                  >
                    <TextInput source="answer" validate={[required()]} label="Answer" />
                    <NullableBooleanInput
                      source="correct"
                      validate={[required()]}
                      label="Correct"
                    />
                  </SimpleFormIterator>
                </ArrayInput>
              )}
            </FormDataConsumer>
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
}
