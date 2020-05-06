import SvgArrowLeft from "@/components/SvgArrowLeft";

export default function Breadcrumbs() {
  return (
    <div>
      <button type="button" className="flex py-2 px-6 border-2 border-black bg-white rounded-full">
        <SvgArrowLeft />
        <span className="pl-4">Back</span>
      </button>
      <ul>
        <li>Chemistry basics</li>
        <li>Lesson 1</li>
      </ul>
    </div>
  );
}
