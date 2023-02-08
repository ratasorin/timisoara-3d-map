// import { useState } from "react";
import { MdOutlineMenu, MdOutlineSearch } from "react-icons/md";
import { Form } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const buildingName = String(url.searchParams.get("building-name")) || "";
  console.log(buildingName);

  return null;
};

const MapWidgets = () => {
  return (
    <>
      <div className="absolute top-0 left-0 z-10 flex w-full justify-center p-4">
        <div className=" flex justify-center rounded-md bg-white py-2 px-4 shadow-md">
          <button className="bg-white px-2">
            <MdOutlineMenu className="text-3xl" />
          </button>
          <Form>
            <input className="py-2 px-4" name="building-name" />
            <button type="submit" className="bg-white px-2" onClick={() => {}}>
              <MdOutlineSearch className="text-3xl" />
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default MapWidgets;
