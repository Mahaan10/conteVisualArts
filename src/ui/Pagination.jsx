import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

function PersianPagination({ currentPage, totalPages, onPageChange }) {
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
          className={`mx-1 px-3 py-1 rounded ${
            i === currentPage
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-purple-100"
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
      aria-label="ناوبری صفحات"
      className="flex items-center justify-center space-x-2 rtl:flex-row-reverse"
    >
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-3 py-1 rounded ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-purple-600 hover:bg-purple-100"
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
        className={`flex items-center gap-1 px-3 py-1 rounded ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-purple-600 hover:bg-purple-100"
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

export default PersianPagination;
