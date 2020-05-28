import React, { useState } from "react";
import {
  Show,
  TextField,
  TopToolbar,
  UrlField,
  TabbedShowLayout,
  Tab,
  ReferenceField,
  FunctionField,
} from "react-admin";

import ShowTest from "../ShowTest";
import AddNewTestButton from "../AddNewTestButton";

export default function ShowLesson(props) {
  const { id } = props;
  const [showAddButton, setShowAddButton] = useState(true);

  return (
    <Show actions={<TopToolbar />} {...props}>
      <TabbedShowLayout>
        <Tab label="lesson">
          <TextField source="name" />
          <TextField source="description" />
          <UrlField source="pdf_file" />
          <UrlField source="url" />
          <TextField source="subject" />
          <TextField source="grade" />
        </Tab>
        <Tab label="test" path="test">
          <ReferenceField addLabel={false} source="uuid" reference="tests" link={false}>
            <FunctionField
              render={(record) => (
                <ShowTest handleShowAddButton={setShowAddButton} record={record} />
              )}
            />
          </ReferenceField>
          {showAddButton && <AddNewTestButton record={{ id }} />}
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
