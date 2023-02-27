import React from "react";
function pets() {
    return (
        <><><div className="w-[20rem] h-[20rem] flex flex-row justify-left items-left">
            <img src="/Images/dog.jpg " />
            <button className="bg-black-500 text-4xl ">
                Dog
            </button>
        </div><div className="w-[40rem] h-[20rem] flex display-flex-row justify-content-left ">
                <img src="/Images/cat.jpg style-float-left margin-right" />
                <button className="bg-black-500 text-4xl ">
                    Cat
                </button>
            </div></><div className="w-[40rem] h-[20rem] flex flex-row justify-right items-right ">
                <img src="/Images/fish.jpg" />
                <button className="bg-black-500 text-4xl ">
                    fish
                </button>
            </div></>
        
        





    );


 }
export default pets;