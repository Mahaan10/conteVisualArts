import { useGetUser } from "../context/useGetUserContext"

function AppLayout() {
    const {user, isLoading, isError, error, token} = useGetUser()
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] md:grid-cols-[15rem_1fr] grid-cols-[5rem_1fr] bg-blue-600 text-neutral-200">
      {/*  */}
      <div className="bg-slate-900 py-4 px-8 border-b border-red-700">
        <div className="container xl:max-w-screen flex items-center gap-x-8">
          <ul className="flex justify-around w-full items-center gap-x-4 text-[10px]">
            <li className="flex text-lg">
              <Link to="/">صفحه اصلی</Link>
            </li>
            <li className="flex font-winky-rough text-sm">{user?.name}</li>
            <li className="flex text-lg">
              <button
                type="submit"
                className="cursor-pointer"
                //onClick={logoutHandler}
              >
                {/* {isLoggedOut ? <ThreeDotsLoading /> : "خروج"} */}
                خروج
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="row-start-1 row-span-2 border border-putty py-4 text-2xl overflow-y-auto">
        <ul className="flex flex-col gap-y-3">
          <li className="flex items-center w-[95%] mx-auto">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "bg-slate-950 flex items-center gap-x-2 hover:bg-primary-400/50 hover:text-primary-900 px-2 py-1.5 rounded-lg transition-all duration-300 w-full"
                  : "hover:bg-slate-800 flex items-center gap-x-2hover:text-primary-900 px-2 py-1.5 rounded-lg transition-all duration-300 w-full"
              }
            >
              داشبورد
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="bg-berkeley-blue p-8 overflow-y-auto">
        <div className="mx-auto max-w-screen-lg flex flex-col gap-y-12">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AppLayout