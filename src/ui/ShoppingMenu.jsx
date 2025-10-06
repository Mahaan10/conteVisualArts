import {
  createTheme,
  Drawer,
  DrawerHeader,
  DrawerItems,
  ThemeProvider,
} from "flowbite-react";
import { useCart } from "../context/useShoppingCardContext";
import useOutsideClick from "../hooks/useOutsideClick";
import { HiShoppingBag, HiOutlineTrash } from "react-icons/hi2";
import { useEffect } from "react";
import useCreatePayment from "../hooks/useCreatePayment";
import { useGetUser } from "../context/useGetUserContext";
import toast from "react-hot-toast";
import { Loader } from "./Loading";

const customTheme = createTheme({
  drawer: {
    root: {
      base: "fixed z-40 overflow-y-auto bg-whitesmoke p-4 dark:bg-gray-950 transition-all duration-600",
      position: {
        left: {
          on: "left-0 top-0 w-full min-[300px]:max-sm:w-72 sm:max-md:w-76 md:w-80",
          off: "left-0 top-0 w-full min-[300px]:max-sm:w-72 sm:max-md:w-76 md:w-80 -translate-x-full",
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
});

function ShoppingMenu({ isOpen, setIsOpen }) {
  const { createPayment, isCreatingPayment } = useCreatePayment();
  const { user, isLoading, isError, error, token } = useGetUser();
  const { cardItems, removeFromCard, totalPrice, clearCard } = useCart();
  const shoppingMenuRef = useOutsideClick(() => setIsOpen(false));

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const createPaymentHandler = async () => {
    if (!token) {
      toast.error("برای پرداخت باید ابتدا وارد اکانت خود شوید");
      setIsOpen(false);
      return;
    }

    if (cardItems?.length === 0) {
      toast.error("سبد خرید شما خالی است.");
      return;
    }

    const enrolledCourseIds =
      user?.enrolledCourses?.map(
        (enrolledCourse) => enrolledCourse?.course?._id
      ) || [];

    if (enrolledCourseIds.includes(cardItems[0]?._id)) {
      toast.error("شما در حال حاضر این دوره را خریداری کرده‌اید.");
      clearCard();
      setIsOpen(false);
      return;
    }

    const newPayment = {
      amount: cardItems[0]?.price, //totalPrice,
      email: user?.email,
      mobile: user?.phone,
      description: "پرداخت",
      courseId: cardItems[0]?._id,
    };

    try {
      const { url } = await createPayment(newPayment);

      if (url) {
        clearCard();
        setIsOpen(false);
        window.location.replace(url);
      } else {
        toast.error("لینک پرداخت در پاسخ API موجود نیست.");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "مشکلی در لینک پرداخت وجود دارد"
      );
    }
  };

  if (isError) {
    toast.error(
      error?.response?.data?.message || "مشکلی در بارگذاری وجود دارد"
    );
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        ref={shoppingMenuRef}
        position="left"
      >
        <DrawerHeader title="سبد خرید شما" titleIcon={HiShoppingBag} />
        <DrawerItems>
          {cardItems.length === 0 ? (
            <p className="text-center text-sm">سبد خرید شما خالیست :(</p>
          ) : (
            <>
              <ul className="space-y-4">
                {cardItems.map((item) => (
                  <li
                    key={item._id}
                    className="border p-3 rounded-md dark:border-gray-700 flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-x-2">
                        <div className="w-10">
                          <img
                            src={item.Image}
                            alt={item.name}
                            loading="lazy"
                            className="rounded-md"
                          />
                        </div>
                        <div className="flex flex-col">
                          <p className="font-bold text-sm">{item.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                            {item.duration} جلسه __{" "}
                            {item.price?.toLocaleString()} تومان
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCard(item._id)}
                      className="text-red-500 rounded-lg text-xs cursor-pointer hover:text-red-600 transition-colors duration-300"
                    >
                      <HiOutlineTrash className="w-6 h-6" />
                    </button>
                  </li>
                ))}
              </ul>

              {/* مجموع و دکمه پرداخت */}
              <div className="mt-6 border-t pt-4 space-y-3">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>مجموع:</span>
                  <span>{totalPrice.toLocaleString()} تومان</span>
                </div>
                <button
                  className="w-full bg-almond-cookie hover:bg-golden-sand text-black font-bold py-2 rounded-lg transition-colors duration-300 dark:bg-dark-cerulean cursor-pointer dark:text-white dark:hover:bg-purple-plumeria"
                  onClick={createPaymentHandler}
                  disabled={isCreatingPayment || isLoading}
                >
                  {isLoading || isCreatingPayment ? <Loader /> : "پرداخت"}
                </button>
              </div>
            </>
          )}
        </DrawerItems>
      </Drawer>
    </ThemeProvider>
  );
}

export default ShoppingMenu;
