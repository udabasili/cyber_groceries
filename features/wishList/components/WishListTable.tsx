import { nanoid } from 'nanoid';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import { BsCart } from 'react-icons/bs';
import { HiOutlineExclamationCircle, HiStar } from 'react-icons/hi';
import { toast } from 'react-toastify';

import { Button } from '@/components/Elements/Button';
import { CustomModal } from '@/components/Elements/Modal';
import { Spinner } from '@/components/Elements/Spinner';
import { Table } from '@/components/Table/Table';
import colors from '@/constant/colors';
import { Context } from '@/store/appContext';
import { CartItem } from '@/types/cart';

import { useGetWishListItems } from '../api/getWishListItems';
import { useRemoveFromWisList } from '../api/removeFromWishList';
import { IWishList } from '../types';

export const WishlistTable = () => {
	const { currentUser } = useContext(Context);
	const { isLoading, wishList } = useGetWishListItems(currentUser._id);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [selectedWishlist, setSelectedWishlist] = useState('');
	const { addItemToCart } = useContext(Context);
	const { removeFromWishList } = useRemoveFromWisList(() => setShowDeleteDialog(false));

	function onDeleteHandler() {
		removeFromWishList(selectedWishlist);
	}

	function addToCart(item: CartItem) {
		addItemToCart(item);
		toast.success('Item Added to cart');
	}

	if (isLoading) {
		return (
			<div className="flex loader items-center justify-center text-gray-500 tabPort:col-span-full col-[full-start/full-end] self-start">
				<Spinner size="lg" containerClassName="self-center justify-self-center my-10" />;
			</div>
		);
	}

	if (!wishList?.length) {
		return (
			<div className=" text-gray-500 tabPort:col-span-full col-[full-start/full-end] self-start flex flex-col items-center justify-center text-gray-500 bg-white h-80">
				<HiStar className="w-16 h-16" />
				<h4>No Wishlists Found</h4>
			</div>
		);
	}

	return (
		<div className="col-span-full overflow-x-auto mt-7">
			<Table<IWishList>
				data={wishList || []}
				columns={[
					{
						title: '',
						field: 'productImage',
						Cell({ entry }: { entry: IWishList }) {
							console.log(entry);
							return <Image alt="productImage" width={50} height={50} src={entry.productImage} />;
						},
					},
					{
						title: 'Product Name',
						field: 'productName',
					},
					{
						title: 'Price',
						field: 'productPrice',
					},
					{
						title: 'Buttons',
						field: 'user',
						Cell({ entry }: { entry: IWishList }) {
							return (
								<span className="flex">
									<BsCart
										type="button"
										color="var(--primary)"
										size="1.2rem"
										className="cursor-pointer hover:opacity-60"
										onClick={() =>
											addToCart({
												id: nanoid(),
												imageUrl: entry.productImage,
												name: entry.productName,
												quantity: 1,
												category: entry.productCategory,
												price: entry.productPrice,
											})
										}
									>
										Add
									</BsCart>
									<AiFillDelete
										color="red"
										size="1.2rem"
										className="ml-5 cursor-pointer hover:opacity-60"
										onClick={() => {
											setSelectedWishlist(entry._id);
											setShowDeleteDialog(true);
										}}
									/>
								</span>
							);
						},
					},
				]}
			/>
			<CustomModal
				onClose={() => setShowDeleteDialog(false)}
				isOpen={showDeleteDialog}
				bodyClassName="text-center"
			>
				<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
				<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
					Are you sure you want to delete this Ticket?
				</h3>
				<div className="flex justify-center gap-4">
					<Button size="md" variant="danger" onClick={onDeleteHandler} type="button">
						Yes, I&apos;m sure
					</Button>
					<Button size="md" variant="inverse" onClick={() => setShowDeleteDialog(false)} type="button">
						No, cancel
					</Button>
				</div>
			</CustomModal>
		</div>
	);
};
