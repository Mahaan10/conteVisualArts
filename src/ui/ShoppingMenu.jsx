import {
  Button,
  Checkbox,
  createTheme,
  Drawer,
  DrawerHeader,
  DrawerItems,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ThemeProvider,
} from "flowbite-react";
import { useCart } from "../context/useShoppingCardContext";
import useOutsideClick from "../hooks/useOutsideClick";
import { HiShoppingBag, HiOutlineTrash } from "react-icons/hi2";
import { useEffect, useState } from "react";
import useCreatePayment from "../hooks/useCreatePayment";
import { useGetUser } from "../context/useGetUserContext";
import toast from "react-hot-toast";
import { Loader } from "./Loading";
import { Accordion } from "../pages/Regulations";
import { GoLaw } from "react-icons/go";

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
  modal: {
    header: {
      base: "items-center",
      close: {
        base: "ml-0",
      },
    },
    body: {
      base: "p-0 pb-6",
    },
  },
  checkbox: {
    base: "focus:ring-0 focus:ring-offset-0 border-gray-400 dark:border-gray-400 mr-4 h-4.5 w-4.5",
  },
  button: {
    color: {
      blue: " text-whitesmoke focus:ring-0 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-0 cursor-pointer",
      red: "text-whitesmoke focus:ring-0 dark:focus:ring-0 cursor-pointer",
    },
  },
});

function ShoppingMenu({ isOpen, setIsOpen }) {
  const { createPayment, isCreatingPayment } = useCreatePayment();
  const { user, isLoading, isError, error, token } = useGetUser();
  const { cardItems, removeFromCard, totalPrice, clearCard } = useCart();

  const shoppingMenuRef = useOutsideClick(() => {
    if (isOpen) setIsOpen(false);
  });

  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const modalRef = useOutsideClick(() => {
    if (isTermsModalOpen) setIsTermsModalOpen(false);
  });

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isError) {
      toast.error(
        error?.response?.data?.message || "مشکلی در بارگذاری وجود دارد"
      );
    }
  }, [isError, error]);

  const handlePayClick = () => {
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
      user?.enrolledCourses
        ?.filter((course) => course?.paymentStatus === "paid")
        .map((enrolledCourse) => enrolledCourse?.course?._id) || [];

    if (enrolledCourseIds.includes(cardItems[0]?._id)) {
      toast.error("شما در حال حاضر این دوره را خریداری کرده‌اید.");
      clearCard();
      setIsOpen(false);
      return;
    }

    setIsTermsModalOpen(true);
    setIsOpen(false);
  };

  const handleConfirmPayment = async () => {
    if (!isChecked) {
      toast.error("لطفاً شرایط و قوانین را مطالعه و تایید کنید.");
      return;
    }

    const newPayment = {
      amount: cardItems[0]?.price, // total
      email: user?.email,
      mobile: user?.phone,
      description: `پرداخت ${cardItems[0]?.name}`,
      courseId: cardItems[0]?._id,
      acceptTnc: isChecked,
      acceptTncAt: isChecked ? new Date().toISOString() : null,
    };

    try {
      const { url } = await createPayment(newPayment);

      if (url) {
        clearCard();
        setIsOpen(false);
        setIsTermsModalOpen(false);
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

  return (
    <ThemeProvider theme={customTheme}>
      {/* Drawer */}
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
                  onClick={handlePayClick}
                  disabled={isCreatingPayment || isLoading}
                >
                  {isLoading || isCreatingPayment ? <Loader /> : "پرداخت"}
                </button>
              </div>
            </>
          )}
        </DrawerItems>
      </Drawer>

      {/* Terms of Service Modal */}
      <Modal
        show={isTermsModalOpen}
        size="3xl"
        popup
        className="font-iran-marker dark:text-whitesmoke"
        position="center"
        onClose={() => setIsTermsModalOpen(false)}
      >
        <ModalHeader>
          <p className="flex items-center gap-x-1.5">
            <GoLaw className="w-7 h-7" />
            <span>قوانین و مقررات</span>
          </p>
        </ModalHeader>
        <ModalBody>
          {/* 🔹 Attach outside click ref */}
          <div ref={modalRef}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 sm:gap-x-8 bg-gray-100 dark:bg-gray-950 rounded-lg p-4 m-4">
              <Accordion />
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Checkbox
                id="terms"
                color="gray"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <Label htmlFor="terms">
                شرایط و قوانین را خوانده‌ام و قبول دارم
              </Label>
            </div>

            <div className="mt-6 flex justify-end gap-2 ml-4">
              <Button color="red" onClick={() => setIsTermsModalOpen(false)}>
                انصراف
              </Button>
              <Button
                color="blue"
                onClick={handleConfirmPayment}
                disabled={!isChecked || isCreatingPayment || isLoading}
              >
                {isCreatingPayment || isLoading ? <Loader /> : "تایید و پرداخت"}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </ThemeProvider>
  );
}

export default ShoppingMenu;
