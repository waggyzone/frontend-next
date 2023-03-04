import React from "react";

const Card: React.FC<{}> = ({}) =>{
	return (
		<div className="rounded-md overflow-hidden shadow-lg bg-white">
			<div className="px-6 py-4 flex flex-2">
				<div className="flex-[0.9]"></div>
				<div>
					<button bg-gray-400 text-gray-800 font-bold py-2 px-4 active:outline-none hover:bg-gray-500 transition-bg transition-500 transition-linear></button>
				</div>
				
			</div>
			
		</div>
	);
}
export default Card;