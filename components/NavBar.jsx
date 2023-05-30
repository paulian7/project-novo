import { React } from "react";
import Image from "next/image";
import NOVO from "../public/NOVO.png";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { FiMessageSquare } from "react-icons/fi";
import { MdPersonOutline } from "react-icons/md";
import { TbCircles } from "react-icons/tb";
import { RxExit } from "react-icons/rx";
import Link from "next/link";
import { getSession, signOut, useSession } from "next-auth/react";

function NavBar() {
	const { data: session, status } = useSession();

	console.log(session, status);

	return (
		<>
			<div className='flex flex-col justify-between w-full bg-novo-purple h-screen rounded-r-xl'>
				<div className='flex flex-col items-center justify-start'>
					<div className='w-5/12 m-[20%]'>
						<Image
							src={NOVO}
							alt='Landing'
							layout='responsive'
							className=''
						/>
					</div>
					<div className='flex flex-col justify-start w-full space-y-2 '>
						<Link
							href='/feed'
							className='text-white flex w-full no-underline items-center py-2 px-4   space-x-2 font-light'
						>
							<RiCompassDiscoverLine />
							<div>Feed</div>
						</Link>
						<button className='text-white flex w-full items-center no-underline py-2 px-4    space-x-2 font-light'>
							<FiMessageSquare />
							<div>Messages</div>
						</button>
						<Link
							href='/activityFeed'
							className='text-white flex w-full items-center  no-underline py-2 px-4    space-x-2 font-light'
						>
							<TbCircles />
							<div>Activities</div>
						</Link>
					</div>
				</div>
				<div className='flex justify-between m-4'>
					<button className='text-white text-2xl'>
						<MdPersonOutline />
					</button>
					<button
						className='text-white text-2xl'
						onClick={() =>
							signOut({
								callbackUrl: "/",
							})
						}
					>
						<RxExit />
					</button>
				</div>
			</div>
		</>
	);
}

export const getServerSideProps = async context => {
	const session = await getSession({ req: context.req });

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
};

export default NavBar;
