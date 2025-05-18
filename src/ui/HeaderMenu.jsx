import {
  createTheme,
  Drawer,
  DrawerHeader,
  DrawerItems,
  Sidebar,
  SidebarItemGroup,
  SidebarItems,
  ThemeProvider,
} from "flowbite-react";
import { PiGraduationCapLight, PiInfo } from "react-icons/pi";
import { GiAbstract024 } from "react-icons/gi";
import { BsPen } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import CustomNavlink from "./CustomNavlink";
import { IoHomeOutline } from "react-icons/io5";

const customTheme = createTheme({
  drawer: {
    root: {
      base: "fixed z-40 overflow-y-auto bg-whitesmoke p-4 transition-transform dark:bg-gray-950",
      position: {
        right: {
          on: "left-0 right-0 top-0 w-full min-[300px]:max-sm:w-72 sm:max-md:w-76 md:w-80 transform-none",
          off: "left-0 right-0 top-0 w-full min-[300px]:max-sm:w-72 sm:max-md:w-76 md:w-80 -translate-y-full",
        },
      },
    },
    header: {
      inner: {
        closeButton:
          "absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-whitesmoke cursor-pointer",
        titleText:
          "mb-4 inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400",
      },
    },
  },
  sidebar: {
    root: {
      collapsed: {
        off: "w-full",
      },
      inner:
        "h-full overflow-y-auto overflow-x-hidden rounded-lg bg-gray-100 dark:bg-gray-900 px-3 py-4 mt-6 w-full",
    },
  },
});

function HeaderMenu({ isOpen, setIsOpen, setIsModalOpen }) {
  return (
    <>
      {isOpen && (
        <ThemeProvider theme={customTheme}>
          <Drawer
            open={isOpen}
            onClose={() => setIsOpen(false)}
            position="right"
          >
            <DrawerHeader title="آموزشگاه هنرهای تجسمی کٌنته" />
            <button
              className="w-full cursor-pointer text-xs py-4 rounded-lg bg-almond-cookie dark:bg-dark-cerulean mt-2 hover:bg-golden-sand dark:hover:bg-purple-plumeria transition-colors duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              ورود یا ثبت نام
            </button>
            <DrawerItems>
              <Sidebar>
                <SidebarItems>
                  <SidebarItemGroup>
                    <li className="text-sm rounded-lg transition-colors duration-300 py-1">
                      <CustomNavlink to="/home">
                        <IoHomeOutline className="w-5 h-5 dark:text-gray-400 text-gray-700" />
                        <span>صفحه اصلی</span>
                      </CustomNavlink>
                    </li>
                    <li className="text-sm rounded-lg transition-colors duration-300 py-1">
                      <CustomNavlink to="/courses">
                        <PiGraduationCapLight className="w-5 h-5 dark:text-gray-400 text-gray-700" />
                        <span>همه دوره ها</span>
                      </CustomNavlink>
                    </li>
                    <li className="text-sm rounded-lg transition-colors duration-300 py-1">
                      <CustomNavlink to="/artists-work">
                        <GiAbstract024 className="w-5 h-5 dark:text-gray-400 text-gray-700" />
                        <span>آثار هنرجویان</span>
                      </CustomNavlink>
                    </li>
                    <li className="text-sm rounded-lg transition-colors duration-300 py-1">
                      <CustomNavlink to="/news">
                        <BsPen className="w-5 h-5 dark:text-gray-400 text-gray-700" />
                        <span>اخبار و رویدادها</span>
                      </CustomNavlink>
                    </li>
                    <li className="text-sm rounded-lg transition-colors duration-300 py-1">
                      <CustomNavlink to="/about">
                        <FaUsers className="w-5 h-5 dark:text-gray-400 text-gray-700" />
                        <span>درباره ما</span>
                      </CustomNavlink>
                    </li>
                    <li className="text-sm rounded-lg transition-colors duration-300 py-1">
                      <CustomNavlink to="/contact">
                        <PiInfo className="w-5 h-5 dark:text-gray-400 text-gray-700" />
                        <span>ارتباط با ما</span>
                      </CustomNavlink>
                    </li>
                  </SidebarItemGroup>
                </SidebarItems>
              </Sidebar>
            </DrawerItems>
          </Drawer>
        </ThemeProvider>
      )}
    </>
  );
}

export default HeaderMenu;
