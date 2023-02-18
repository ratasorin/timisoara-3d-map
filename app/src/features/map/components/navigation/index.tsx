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
    <div className="absolute top-0 left-0 z-10 p-4 font-mono">
      <div className=" flex justify-center rounded-md bg-white py-2 px-4 shadow-md">
        <button type="submit" className="bg-white px-2">
          {buildingSearchQuery || buildingSearchQuery === "" ? (
            <MdClose
              className="text-3xl"
              onClick={() => navigate("")}
            ></MdClose>
          ) : (
            <MdOutlineMenu
              className="text-3xl"
              onClick={() =>
                navigate(`?building-name=${buildingSearchQuery || ""}`)
              }
            />
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
