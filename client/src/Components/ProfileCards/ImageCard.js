import { useState, useRef } from 'react';
import UserAvatar from '../../images/pdp.png';
const ImageCard = ({ user }) => {
	const [ dropped, setDropped ] = useState(false);
	const [ image, setImage ] = useState(undefined);
	const [ hover, setHover ] = useState(false);
	const wrapperRef = useRef(null);
	const onDragEnter = () => {
		wrapperRef.current.classList.add('dragover');
		setDropped(true);
	};
	const onDragLeave = () => {
		wrapperRef.current.classList.remove('dragover');
		setDropped(false);
	};
	const onDrop = () => wrapperRef.current.classList.remove('dragover');
	const onFileDrop = (e) => {
		const newFile = e.target.files[0];
		if (newFile) {
			setImage(newFile);
		}
	};

	const fileRemove = (file) => {
		setDropped(false);
		setImage(undefined);
	};

	return (
		<div
			className={` h-80 w-80 rounded-xl relative  overflow-hidden   shrink-0 cursor-pointer transition-all duration-500 ${dropped ==
				true &&
				image === undefined &&
				'animate-pulse border-4 border-sky-200 '}`}
			ref={wrapperRef}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onDragEnter={onDragEnter}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
		>
			{image != undefined ? (
				<img
					className={`w-full h-full object-scale-down  mx-auto z-0 ${hover == true && 'blur-sm'}`}
					src={URL.createObjectURL(image)}
					alt={URL.createObjectURL(image)}
				/>
			) : user.profilepic == '' ? (
				<img
					className={`w-full h-full   mx-auto z-0 ${(hover == true || dropped == true) && 'blur-sm'} `}
					src={UserAvatar}
					alt="User"
				/>
			) : (
				<img
					className={`w-full h-full object-scale-down  mx-auto z-0 ${(hover == true || dropped == true) &&
						'blur-sm'}`}
					src={`http://localhost:3001${user.profilepic}`}
					width="40"
					height="40"
				/>
			)}

			{hover == true &&
			image != undefined && (
				<p className="absolute top-1/2 left-1/2 mx-auto bg-transparent border-0 cursor-pointer  rounded-md font-bold text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
					X
				</p>
			)}
			<div className="absolute top-1/2  w-full flex text-sm text-gray-600">
				{hover == true &&
				image === undefined && (
					<p className=" mx-auto bg-transparent border-0 cursor-pointer  rounded-md font-bold text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
						Change your photo
					</p>
				)}
			</div>
			{image === undefined ? (
				<input
					type="file"
					id="icon"
					name="icon"
					value=""
					enctype="multipart/form-data"
					onChange={onFileDrop}
					className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0	hover:border-2 hover:border-blue-900"
				/>
			) : (
				<div
					className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0	hover:border-2 hover:border-blue-900"
					onClick={fileRemove}
				>
					{' '}
				</div>
			)}
		</div>
	);
};

export default ImageCard;
