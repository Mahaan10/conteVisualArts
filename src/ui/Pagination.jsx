import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages === 0) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 text-center font-hoda text-base cursor-pointer border border-gray-500
          ${i !== totalPages ? "border-r-0" : ""}
          ${
            i === currentPage
              ? "bg-gray-300 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700"
              : "hover:bg-gray-400 dark:hover:bg-gray-800"
          }`}
          aria-current={i === currentPage ? "page" : undefined}
          aria-label={`صفحه ${i}`}
          type="button"
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <nav
      aria-label="صفحات"
      className="flex items-center justify-center rtl:flex-row-reverse"
    >
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-l-md border border-gray-500 border-r-0 cursor-pointer ${
          currentPage === 1
            ? "!cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700"
            : "hover:bg-gray-400 dark:hover:bg-gray-800"
        }`}
        aria-label="صفحه قبلی"
        type="button"
      >
        قبلی
        <HiChevronLeft className="w-5 h-5" />
      </button>

      {renderPageNumbers()}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-r-md border border-gray-500 border-l-0 cursor-pointer ${
          currentPage === totalPages
            ? "!cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700"
            : "hover:bg-gray-400 dark:hover:bg-gray-800"
        }`}
        aria-label="صفحه بعدی"
        type="button"
      >
        <HiChevronRight className="w-5 h-5" />
        بعدی
      </button>
    </nav>
  );
}

export default Pagination;
