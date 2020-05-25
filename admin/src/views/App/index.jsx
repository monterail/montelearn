import React from "react";
import { Admin, Resource } from "react-admin";

import authProvider from "@/services/auth-provider";
import dataProvider from "@/services/data-provider";

import LessonsList from "./components/LessonsList";
import ShowLesson from "./components/ShowLesson";
import CreateLesson from "./components/CreateLesson";
import CreateTest from "./components/CreateTest";
import EditLesson from "./components/EditLesson";

export default function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource
        name="lesson"
        list={LessonsList}
        show={ShowLesson}
        create={CreateLesson}
        edit={EditLesson}
      />
      <Resource name="tests" create={CreateTest} />
      <Resource name="subject" />
      <Resource name="grade" />
    </Admin>
  );
}
