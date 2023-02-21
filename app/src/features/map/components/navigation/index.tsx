import { Form, useLocation, useNavigate } from "@remix-run/react";
import { useMemo } from "react";
import { MdOutlineMenu, MdOutlineSearch, MdClose } from "react-icons/md";

const Navigation = () => {
  const location = useLocation();
  const buildingSearchQuery = useMemo(
    () => new URLSearchParams(location.search).get("building-name"),
    [location]
  );
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 z-20 max-h-max max-w-sm p-4 font-mono">
      <div className="mx-auto flex justify-center rounded-md bg-white py-2 px-4 shadow-md">
        <button
          type="submit"
          onClick={() => {
            if (buildingSearchQuery || buildingSearchQuery === "") navigate("");
            else navigate(`?building-name=${buildingSearchQuery || ""}`);
          }}
          className="mr-1 rounded-full bg-white p-1"
        >
          {buildingSearchQuery || buildingSearchQuery === "" ? (
            <MdClose className="h-7 w-7"></MdClose>
          ) : (
            <MdOutlineMenu className="h-7 w-7" />
          )}
        </button>
        <Form className="flex flex-1 items-center">
          <input className="flex-1 p-1" name="building-name" />
          <button type="submit" className="ml-1 rounded-full bg-white p-1">
            <MdOutlineSearch className="h-7 w-7" />
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Navigation;
