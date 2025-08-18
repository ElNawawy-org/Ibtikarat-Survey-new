import { FC } from 'react';
import { TProps } from './type';
import { ArrowLeftIcon } from './arrow-left-icon';
import { ArrowRightIcon } from './arrow-right-icon';

/**
 * A reusable pagination component that manages navigation between pages and allows rows per page selection.
 *
 * @example
 * const [CurrentPage, setCurrentPage] = useState(1);
 *
 * <Pagination
 *   CurrentPage={CurrentPage}
 *   setCurrentPage={setCurrentPage}
 *   numberOfPages={5}
 * />
 */

export const Pagination: FC<TProps> = ({
  CurrentPage = 1,
  setCurrentPage,
  numberOfPages = 1,
}) => {
  const handlePrev = () => {
    setCurrentPage(CurrentPage - 1);
  };

  const handleGoToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    setCurrentPage(CurrentPage + 1);
  };

  // if there are more than 7 pages, show only the nearest 7 pages
  let startPage = 1;
  let endPage = numberOfPages;
  if (numberOfPages > 6) {
    startPage = CurrentPage - 3;
    endPage = CurrentPage + 3;
    if (startPage < 1) {
      startPage = 1;
      endPage = 7;
    }
    if (endPage > numberOfPages) {
      startPage = numberOfPages - 6;
      endPage = numberOfPages;
    }
  }

  const paginationButtons = [];
  for (let i = startPage; i <= endPage; i++) {
    paginationButtons.push(
      <button
        key={i}
        className='px-3 py-2 border border-grey-400 text-dark-200 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
        onClick={() => handleGoToPage(i)}
        disabled={CurrentPage === i}
      >
        {i}
      </button>
    );
  }

  return (
    <div className='flex justify-between gap-3 items-center'>
      <div className='flex justify-end gap-2 items-stretch'>
        <button
          className='px-3 py-2 border border-grey-400 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={handlePrev}
          disabled={CurrentPage === 1}
        >
          <ArrowRightIcon />
        </button>

        {paginationButtons}

        <button
          className='px-3 py-2 border border-grey-400 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={handleNext}
          disabled={CurrentPage === numberOfPages}
        >
          <ArrowLeftIcon />
        </button>
      </div>
    </div>
  );
};
