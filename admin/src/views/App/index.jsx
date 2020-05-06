import React from "react";
import { Admin, Resource } from "react-admin";

import authProvider from "@/services/auth-provider";
import dataProvider from "@/services/data-provider";

import LessonsList from "./components/LessonsList";
import ShowLesson from "./components/ShowLesson";
import CreateLesson from "./components/CreateLesson";

export default function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="lesson" list={LessonsList} show={ShowLesson} create={CreateLesson} />
    </Admin>
  );
}
