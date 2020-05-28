import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  SimpleShowLayout,
  Button,
  TextField,
  ArrayField,
  Datagrid,
  BooleanField,
  Toolbar,
} from "react-admin";

import dataProvider from "@/services/data-provider";

import EditTest from "../EditTest";

export default function ShowTest({ record, handleShowAddButton }) {
  const [edit, setEdit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    handleShowAddButton(false);
  }, []);

  const toggleEdit = () => setEdit(!edit);
  const handleDelete = () => dataProvider.delete("admin/tests", { id: record.uuid }, router.reload);

  return !edit ? (
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
      <Toolbar>
        <Button onClick={toggleEdit} label="Edit" />
        <Button onClick={handleDelete} label="Delete" />
      </Toolbar>
    </SimpleShowLayout>
  ) : (
    <EditTest record={record} />
  );
}
