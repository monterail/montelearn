import React from "react";
import { Button } from "react-admin";
import { Link } from "react-router-dom";

export default function AddNewTestButton({ record }) {
  return (
    <Button
      component={Link}
      to={{
        pathname: "/tests/create",
        search: `?lesson_uuid=${record.id}`,
      }}
      label="Add a test"
    />
  );
}
