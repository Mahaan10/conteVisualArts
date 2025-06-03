import {
  Button,
  Card,
  createTheme,
  Modal,
  ModalBody,
  ModalHeader,
  ThemeProvider,
} from "flowbite-react";
import { useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

const customTheme = createTheme({
  card: {
    root: {
      base: "border-gray-300 bg-gray-100 shadow-xl dark:bg-slate-900 dark:shadow-black transition-colors duration-300",
    },
  },
  button: {
    base: "gap-x-3",
    outlineColor: {
      dark: "dark:hover:text-whitesmoke cursor-pointer transition-colors duration-300 text-xs",
    },
  },
  modal: {
    content: {
      inner: "bg-gray-200 dark:bg-slate-950",
    },
    header: {
      base: "border-gray-400/80",
      title:
        "dark:text-whitesmoke text-black font-bold font-iranian-sans text-xs/6 line-clamp-2 sm:text-lg",
      close: {
        base: "ml-0 cursor-pointer text-gray-600 hover:bg-gray-400 dark:text-gray-300 transition-colors duration-300",
      },
    },
  },
});

function StudentWorksCards({ array }) {
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedStudentWork, setSelectedStudentWork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useOutsideClick(() => {
    if (isModalOpen) setIsModalOpen(false);
  });

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const visibleStudentWorks = array.slice(0, visibleCount);

  const handleCardClick = (studentWork) => {
    setSelectedStudentWork(studentWork);
    setIsModalOpen(true);
  };

  return (
    <ThemeProvider theme={customTheme}>
      {visibleStudentWorks.map((arr) => (
        <Card
          key={arr._id}
          className="max-w-sm text-xs relative cursor-pointer"
          imgAlt={arr.title}
          imgSrc={arr.image}
          onClick={() => handleCardClick(arr)}
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h5 className="text-xl font-semibold tracking-tight line-clamp-2">
            {arr.title}
          </h5>
          <h1 className="line-clamp-2">{arr?.description}</h1>

          <div className="flex items-center justify-between">
            <p>{arr?.student?.name}</p>
          </div>
          <div className="flex items-center justify-center">
            <Button
              color="dark"
              outline
              className="transition-all duration-300"
            >
              پیش نمایش
            </Button>
          </div>
        </Card>
      ))}
      {/* Preview Image */}
      <Modal
        size="6xl"
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalHeader>
          {selectedStudentWork && (
            <>
              پیش نمایش اثر {selectedStudentWork?.title} از{" "}
              {selectedStudentWork?.student?.name}
            </>
          )}
        </ModalHeader>
        <ModalBody ref={modalRef}>
          {selectedStudentWork && (
            <img
              src={selectedStudentWork?.image}
              alt={selectedStudentWork?.title}
              className="w-full sm:h-auto h-96 object-cover  rounded-lg"
            />
          )}
        </ModalBody>
      </Modal>

      {/* Load More Content Button */}
      {visibleCount < array.length && (
        <div className="col-span-full flex justify-center mt-6">
          <Button
            onClick={handleLoadMore}
            color="dark"
            outline
            className="text-sm"
          >
            مشاهده آثار بیشتر
          </Button>
        </div>
      )}
    </ThemeProvider>
  );
}

export default StudentWorksCards;

/* function formattedDate(isoString) {
  return new Date(isoString).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
} */
