import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi';

import { MyPaginate } from './index.styled';

type PaginationProps = {
	pageCount: number;
	handlePageClick: (e: { selected: number }) => void;
};

export const Pagination = (props: PaginationProps) => {
	const { pageCount, handlePageClick } = props;

	return (
		<MyPaginate
			breakLabel="..."
			nextLabel={<HiArrowCircleRight />}
			onPageChange={handlePageClick}
			pageRangeDisplayed={undefined}
			pageCount={pageCount}
			previousLabel={<HiArrowCircleLeft />}
		/>
	);
};
