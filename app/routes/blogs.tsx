import { Link, Outlet } from "@remix-run/react";
import { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import Avatar from "~/src/components/avatar";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiFillRead, AiOutlinePlus } from "react-icons/ai";
import { useUser } from "~/src/hooks/user";

const Blogs = () => {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav className="relative top-0 left-0 flex h-16 w-full flex-row items-center justify-between px-4 font-mono">
        {!menuOpen ? (
          <button
            onClick={() => setMenuOpen(true)}
            className="rounded-full p-1"
          >
            <MdMenu className="text-4xl text-zinc-700" />
          </button>
        ) : (
          <button
            onClick={() => setMenuOpen(false)}
            className="rounded-full p-1"
          >
            <MdClose className="text-4xl text-zinc-700" />
          </button>
        )}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full rounded-lg bg-white p-2 shadow-md will-change-[opacity,transform] data-[side=top]:animate-slide-down-and-fade data-[side=right]:animate-slide-left-and-fade data-[side=bottom]:animate-slide-up-and-fade data-[side=left]:animate-slide-right-and-fade">
            <Link
              to="/map"
              className="flex flex-1 flex-row justify-between rounded-lg py-3 px-4 hover:bg-zinc-200"
            >
              Înapoi la mapă
              <FaMapMarkerAlt className="h-6 w-6 text-blue-600" />
            </Link>

            <Link
              to="/blogs/create"
              className="flex flex-1 flex-row justify-between rounded-lg py-3 px-4 hover:bg-zinc-200"
            >
              Scrieți o postare
              <AiOutlinePlus className="h-6 w-6 text-blue-600" />
            </Link>

            <Link
              to="/blogs"
              className="flex flex-1 flex-row justify-between rounded-lg py-3 px-4 hover:bg-zinc-200"
            >
              Vedeți toate postările
              <AiFillRead className="h-6 w-6 text-blue-600" />
            </Link>
          </div>
        )}

        {user ? (
          <Avatar
            profilePictureKey={user.picture?.imageKey}
            username={user.name}
          />
        ) : (
          <Avatar profilePictureKey={undefined} username={"??"} />
        )}
      </nav>
      <Outlet></Outlet>
    </>
  );
};

export default Blogs;
