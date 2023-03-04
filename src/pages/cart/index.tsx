import Card from "@/component/Card/accessories";
import { NextPage } from "next";
import Head from "next/head";


const Cart: NextPage = () => {
	return <div className="pt-32 w-screen">
		<Head> 
			<title>Cart</title>
		</Head>
		<div className="container mx-auto">
			<div className="flex justify-between items-center pb-2">
				<span>Cart</span>
				
			</div>
		
			<Card/>
		</div>

	</div>;
};
export default Cart;