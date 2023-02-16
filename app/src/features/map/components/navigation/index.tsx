import { Form } from "@remix-run/react";
import { useAtom } from "jotai";
import { MdOutlineMenu, MdOutlineSearch, MdClose } from "react-icons/md";
import { sidebarOpenAtom } from "../sidebar/context/sidebar-open";

const Navigation = () => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);

  return (
    <div className="absolute top-0 left-0 z-10 flex w-full justify-end p-4">
      <div className=" flex justify-center rounded-md bg-white py-2 px-4 shadow-md">
        <button
          type="submit"
          className="bg-white px-2"
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
        >
          {sidebarOpen ? (
            <MdClose className="text-3xl"></MdClose>
          ) : (
            <MdOutlineMenu className="text-3xl" />
          )}
        </button>
        <Form className="flex items-center">
          <input className="py-2 px-4" name="building-name" />
          <button type="submit" className="bg-white px-2">
            <MdOutlineSearch className="text-3xl" />
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Navigation;
