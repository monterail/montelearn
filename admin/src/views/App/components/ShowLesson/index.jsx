import React from "react";
import {
  Show,
  TextField,
  TopToolbar,
  UrlField,
  SelectField,
  TabbedShowLayout,
  Tab,
  ReferenceField,
  FunctionField,
} from "react-admin";

import { subjectChoices, gradeChoices } from "@/data/lessonChoices";
import ShowTest from "../ShowTest";
import AddNewTestButton from "../AddNewTestButton";

export default function ShowLesson(props) {
  return (
    <Show actions={<TopToolbar />} {...props}>
      <TabbedShowLayout>
        <Tab label="lesson">
          <TextField source="name" />
          <TextField source="description" />
          <UrlField source="pdf_file" />
          <UrlField source="url" />
          <SelectField source="subject" choices={subjectChoices} />
          <SelectField source="grade" choices={gradeChoices} />
        </Tab>
        <Tab label="test" path="test">
          <ReferenceField addLabel={false} source="uuid" reference="tests" link={false} >
            <FunctionField render={(record) => <ShowTest record={record} />} />
          </ReferenceField>
          <AddNewTestButton record={{ id: props.id }} />
        </Tab>
      </TabbedShowLayout>
    </Show >
  );
}
