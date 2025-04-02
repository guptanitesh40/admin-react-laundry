import React from "react";
import { Link } from "react-router-dom";

const data = [
  {
    title: "Add new Booking",
    icon: "ki-filled ki-plus-squared",
    path: "/order/add",
  },
  {
    title: "Pending Orders",
    icon: "ki-filled ki-loading",
    path: "/order/add",
  },
  {
    title: "Confirmed Orders",
    icon: "ki-filled ki-check-circle",
    path: "/order/add",
  },
  {
    title: "Ready To Deliver",
    icon: "ki-filled ki-courier",
    path: "/order/add",
  },
  {
    title: "Delivered Orders",
    icon: "ki-filled ki-delivery",
    path: "/order/add",
  },
];

const ActionButtons: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-7.5 h-full items-stretch">
      {data.map((item, index) => (
        <Link
          to={item.path}
          key={index}
          className="card p-4 sm:p-6 flex flex-col items-center justify-center gap-3 sm:gap-4 h-full bg-cover bg-no-repeat channel-stats-bg transition-all duration-300 ease-in-out"
        >
          <span className="inline-block h-8 sm:h-10 w-8 sm:w-10 text-[#4b5675]">
            <i className={`${item.icon} text-2xl sm:text-3xl`}></i>
          </span>
          <span className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wide text-center">
            {item.title}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default ActionButtons;

// import React from "react";
// import { Link } from "react-router-dom";

// const data = [
//   {
//     title: "Add new Booking",
//     icon: "ki-filled ki-plus-squared",
//     path: "/order/add",
//   },
//   {
//     title: "Pending Orders",
//     icon: "ki-filled ki-loading",
//     path: "/order/add",
//   },
//   {
//     title: "Confirmed Orders",
//     icon: "ki-filled ki-check-circle",
//     path: "/order/add",
//   },
//   {
//     title: "Ready To Deliver",
//     icon: "ki-filled ki-courier",
//     path: "/order/add",
//   },
//   {
//     title: "Delivered Orders",
//     icon: "ki-filled ki-delivery",
//     path: "/order/add",
//   },
// ];

// const ActionButtons: React.FC = () => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-7.5 h-full items-stretch">
//       {data.map((item, index) => (
//         <Link
//           to={item.path}
//           key={index}
//           className="card p-4 sm:p-6 flex flex-col items-center justify-center gap-3 sm:gap-4 h-full bg-cover bg-no-repeat5"
//         >
//           <span className="inline-block h-8 sm:h-10 w-8 sm:w-10 text-[#4b5675]">
//             <i className={`${item.icon} text-2xl sm:text-3xl`}></i>
//           </span>
//           <span className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wide text-center">
//             {item.title}
//           </span>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default ActionButtons;
