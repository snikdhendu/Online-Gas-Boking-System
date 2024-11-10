// import React from 'react';
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
const MainDashBoard = () => {
  const { user } = useUser();
  if (!user) {
    return null; // Or handle the case when user is null
  }

  return (
    <div className="  bg-white text-black   items-center pt-28 min-h-screen lg:ml-64 flex flex-col gap-4 justify-between p-8 -mt-14" style={{ height: '500px', width: "83%" }} >
      <div className="bg-gradient-to-r from-textmain to-yellow-300 text-white font-bold text-3xl w-full rounded-md bg-teal-600 h-36 flex justify-left p-8 items-center flex-col gap-3 ">
        <h1>Hello , <span className=" text-white text-4xl font-extrabold">{user.fullName}</span>. 👋</h1>
        <p className=" text-base font-royal4">
          Welcome to your Dashboard!
          Check your latest progress and insights on your career journey today.</p>
      </div>
      <div className=" h-96 w-full  flex gap-3">
        <div className="w-1/2 h-full justify-center  items-center flex p-10 flex-col gap-6 ">
          <div className="h-8 w-full text-left p-8 ">
            <h1 className=" font-bold text-2xl text-textmain "> Our profile:</h1>
          </div>
          <div className="w-4/5 h-80 rounded-md bg-white dark:border-b-slate-700 dark:bg-background shadow-2xl border border-zinc-300 flex flex-col gap-3 p-4">
            {/* Avatar and User Info */}
            <div className="w-full h-fit p-5 flex flex-col gap-2">
              {/* Avatar */}
              <div className="w-full h-1/2 flex justify-center items-center mb-3">
                <Avatar
                  src={user.imageUrl || ''}
                  sx={{ width: 96, height: 96 }}
                  className="border-4 border-textmain shadow-lg  shadow-current"
                />
              </div>

              {/* User Name */}
              <div className="w-full  flex justify-center items-center">
                <span className="flex gap-2 w-full justify-center items-center ">
                  <h1 className="lg:text-2xl text-lg font-extrabold font-royal4 text-textmain">{user.fullName}</h1>
                </span>
              </div>

              <div className="w-full  flex justify-center items-center">
                <span className="flex gap-2 w-full justify-center items-center text-textsecond text-sm font-bold ">
                  {user.primaryEmailAddress?.emailAddress || 'No email address found'}
                </span>
              </div>


              {/* User Role */}



              {/* Social Media Links */}
              {/* Social Media Links */}

            </div>

            {/* Divider */}
            {/* <hr className="w-full border-t border-gray-300 dark:border-gray-800" /> */}

            {/* Additional User Info */}


            {/* <hr className="w-full border-t border-gray-300 dark:border-gray-800" /> */}
            {/* Edit Profile Button */}
            <div className="w-full flex justify-center ">
              <Link
                to="./profile"
                className="w-1/2 rounded-md bg-blue-100 hover:bg-blue-300 text-textsecond flex justify-center items-center p-2 font-royal4"
              >
                Edit profile
              </Link>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col justify-center  gap-3">
          <div className="h-8 ">
            <h1 className=" font-bold text-2xl text-textmain "> Check out our products:</h1>
          </div>
          <div className=" grid grid-cols-2 h-4/5  p-4">

            <Link to='/mentors'
              className="w-64 h-32 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] flex justify-left items-center space-y-3 relative overflow-hidden p-4"
            >
              <div className="w-24 h-24 bg-textmain rounded-full absolute -right-5 -top-7">
                <p className="absolute bottom-6 left-7 text-white text-2xl">01</p>
              </div>
              <h1 className="font-bold text-xl">Mentors</h1>
            </Link>

            <Link to='./aichatbot'
              className="w-64 h-32 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] flex justify-left items-center space-y-3 relative overflow-hidden p-4"
            >
              <div className="w-24 h-24 bg-textmain rounded-full absolute -right-5 -top-7">
                <p className="absolute bottom-6 left-7 text-white text-2xl">02</p>
              </div>
              <h1 className="font-bold text-xl">AI Mentor</h1>
            </Link>


            <Link to='./library'
              className="w-64 h-32 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] flex justify-left items-center space-y-3 relative overflow-hidden p-4"
            >
              <div className="w-24 h-24 bg-textmain rounded-full absolute -right-5 -top-7">
                <p className="absolute bottom-6 left-7 text-white text-2xl">03</p>
              </div>
              <h1 className="font-bold text-xl">Career Library</h1>
            </Link>


            <Link to='/workshops'
              className="w-64 h-32 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] flex justify-left items-center space-y-3 relative overflow-hidden p-4"
            >
              <div className="w-24 h-24 bg-textmain rounded-full absolute -right-5 -top-7">
                <p className="absolute bottom-6 left-7 text-white text-2xl">04</p>
              </div>
              <h1 className="font-bold text-xl">Workshops</h1>
            </Link>







          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashBoard;
