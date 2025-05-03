import React from "react";
import {
  Drawer,
  DrawerHeader,
  DrawerItems,
  Sidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";

function HeaderMenu({ open, onClose, setIsOpen, isOpen }) {
  return (
    <>
      <div className="md:hidden">
        <Drawer
          open={open}
          onClose={onClose}
          position="right"
          className="dark:bg-dark-purple bg-sand transition-all duration-300"
        >
          <DrawerHeader title="آموزشکاه هنر های تجسمی کٌنته" />
          <button
            className="w-full cursor-pointer btn text-lg !text-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            ورود یا ثبت نام
          </button>
          <DrawerItems>
            <Sidebar
              aria-label="Sidebar with multi-level dropdown example"
              className="[&>div]:p-0 mx-auto mt-5 w-full"
            >
              <SidebarItems className="dark:bg-dark-violet bg-mindaro">
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
      </div>
    </>
  );
}

export default HeaderMenu;
