import React from "react";
import {
  createTheme,
  Drawer,
  DrawerHeader,
  DrawerItems,
  Sidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  ThemeProvider,
} from "flowbite-react";

const customTheme = createTheme({
  drawer: {
    root: {
      base: "fixed z-40 overflow-y-auto p-4 transition-transform duration-500 dark:bg-dark-purple bg-mindaro",
      position: {
        right: {
          on: "right-0 top-0 h-screen min-[200px]:max-[315px]:w-full w-80 transform-none",
          off: "right-0 top-0 h-screen min-[200px]:max-[315px]:w-full w-80 translate-x-full",
        },
      },
    },
    header: {
      inner: {
        titleText:
          "mb-4 inline-flex items-center font-semibold text-black/80 dark:text-neutral-200/80 min-[200px]:max-[315px]:text-sm",
        closeButton:
          "absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-black dark:text-neutral-200 hover:bg-soft-yellow hover:text-gray-900 dark:hover:bg-muted-purple dark:hover:text-white cursor-pointer",
      },
    },
  },
  sidebar: {
    collapse: {
      button:
        "group flex w-full items-center cursor-pointer rounded-none p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-sand dark:hover:bg-dark-violet",
      label: {
        base: "mx-3 flex-1 whitespace-nowrap text-right text-lg",
      },
    },
    item: {
      base: "flex items-center justify-center w-full rounded-none p-2 text-base font-normal text-gray-900 hover:bg-sand dark:hover:bg-dark-violet dark:hover:text-black",
    },
  },
});

function HeaderMenu({ open, onClose, setIsOpen, isOpen }) {
  return (
    <>
      <div className="md:hidden">
        <ThemeProvider theme={customTheme}>
          <Drawer open={open} onClose={onClose} position="right" className="">
            <DrawerHeader title="آموزشکاه هنر های تجسمی کٌنته" />
            <button
              className="w-full cursor-pointer btn text-lg text-black dark:text-neutral-200 dark:hover:text-black"
              onClick={() => setIsOpen(!isOpen)}
            >
              ورود یا ثبت نام
            </button>
            <DrawerItems>
              <Sidebar
                aria-label="Sidebar with multi-level dropdown example"
                className="[&>div]:p-0 mx-auto mt-5 w-full"
              >
                <SidebarItems className="dark:bg-muted-purple bg-soft-yellow">
                  <SidebarItemGroup>
                    <SidebarCollapse label="نقاشی">
                      <SidebarItem href="">رئالیسم</SidebarItem>
                      <SidebarItem href="">سورئالیسم</SidebarItem>
                    </SidebarCollapse>
                  </SidebarItemGroup>
                </SidebarItems>
              </Sidebar>
            </DrawerItems>
          </Drawer>
        </ThemeProvider>
      </div>
    </>
  );
}

export default HeaderMenu;
