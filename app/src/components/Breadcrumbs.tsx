import SvgArrowLeft from "@/components/SvgArrowLeft";

export default function Breadcrumbs() {
  return (
    <div className="p-6 bg-red-100 flex font-roboto-mono">
      <button
        type="button"
        className="flex py-2 px-6 border-2 border-black bg-red-100 rounded-full"
      >
        <SvgArrowLeft />
        <span className="pl-4 font-medium">Back</span>
      </button>
      <ul className="flex items-center px-4 font-medium">
        <li className="px-3">Chemistry basics</li>
        {/* <li className="px-3">Lesson 1</li> */}
      </ul>
    </div>
  );
}
