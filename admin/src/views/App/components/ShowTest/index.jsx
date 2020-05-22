import React from "react";
import { SimpleShowLayout, TextField, ArrayField, Datagrid, BooleanField } from "react-admin";

export default function ShowTest({ record }) {
  return (
    <SimpleShowLayout record={record}>
      <ArrayField source="questions">
        <Datagrid>
          <TextField source="question_type" />
          <TextField source="content" />
          <ArrayField source="choices">
            <Datagrid>
              <TextField source="answer" />
              <BooleanField source="correct" />
            </Datagrid>
          </ArrayField>
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  );
}
