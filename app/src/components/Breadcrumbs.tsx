import { ButtonWithArrow } from "@/components/ButtonWithArrow";

export default function Breadcrumbs() {
  return (
    <div className="p-6 bg-red-100 flex font-roboto-mono">
      <ButtonWithArrow direction="left">Back</ButtonWithArrow>
      <ul className="flex items-center px-4 font-medium">
        <li className="px-3">Chemistry basics</li>
        {/* <li className="px-3">Lesson 1</li> */}
      </ul>
    </div>
  );
}
