import React from 'react';

import { Pagination } from './index.styled';

type PaginationButtonProps = {
	isPreviousData: boolean;
	hasMore: boolean;
	page: number;
	pager: {
		startIndex: number | undefined;
		endIndex: number | undefined;
		total: number | undefined;
	};
	setPage: React.Dispatch<React.SetStateAction<number>>;
};
export const PaginationButton = (props: PaginationButtonProps) => {
	const { pager, hasMore, isPreviousData, setPage, page } = props;
	return (
		<Pagination className="flex flex-col items-center">
			<span className="text-sm text-gray-700 dark:text-gray-400">
				Showing{' '}
				<span className="font-semibold text-gray-900 dark:text-white">
					{pager?.startIndex ? pager.startIndex + 1 : 0}
				</span>{' '}
				to{' '}
				<span className="font-semibold text-gray-900 dark:text-white">
					{pager?.endIndex ? pager.endIndex + 1 : 0}
				</span>{' '}
				of <span className="font-semibold text-gray-900 dark:text-white">{pager.total}</span> Entries
			</span>
			<div className="inline-flex mt-2 xs:mt-0">
				<button
					onClick={() => setPage((old) => Math.max(old - 1, 0))}
					disabled={page === 0}
					className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black rounded-l hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-[#b5b5b5]"
				>
					<svg
						aria-hidden="true"
						className="w-5 h-5 mr-2"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
							clip-rule="evenodd"
						></path>
					</svg>
					Prev
				</button>
				<button
					onClick={() => {
						if (!isPreviousData && hasMore) {
							setPage((old) => old + 1);
						}
					}}
					disabled={!hasMore}
					className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-[#b5b5b5]"
				>
					Next
					<svg
						aria-hidden="true"
						className="w-5 h-5 ml-2"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
							clip-rule="evenodd"
						></path>
					</svg>
				</button>
			</div>
		</Pagination>
	);
};
