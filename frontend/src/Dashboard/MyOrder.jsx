import React from 'react';

const MyOrder = () => {
  return (
    <div className="  bg-white text-black   items-center pt-28 min-h-screen lg:ml-64 flex flex-col gap-4 justify-between p-8 -mt-14" style={{ height: '500px', width: "83%" }} >
      <div className="bg-gradient-to-r from-textmain to-yellow-300 text-white font-bold text-3xl w-full rounded-md bg-teal-600 h-36 flex justify-left p-8 items-center flex-col gap-3 ">
        <h1>Hello ,  👋</h1>
        <p className=" text-base font-royal4">
          Welcome to your Dashboard!
          Check your latest progress and insights on your career journey today.</p>
      </div>

    </div>
  );
}

export default MyOrder;
