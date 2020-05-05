import React from "react";
import { Admin, Resource } from "react-admin";

import LessonsList from "./components/LessonsList";
import ShowLesson from "./components/ShowLesson";
import authProvider from "./services/auth-provider";
import dataProvider from "./services/data-provider";

export default function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="lesson" list={LessonsList} show={ShowLesson} />
    </Admin>
  );
}
