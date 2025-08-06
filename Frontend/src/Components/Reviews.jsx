// import React from "react";
// import { useTranslation } from "react-i18next";
// import ReactStars from "react-stars";

// function Reviews() {
//   const { t } = useTranslation();
//   const reviews = [
//     {
//       id: 1,
//       user: "John Doe",
//       comment: "Great product, very useful!",
//       rating: 5,
//     },
//     {
//       id: 2,
//       user: "Jane Smith",
//       comment: "Good value for the price.",
//       rating: 4,
//     },
//     {
//       id: 3,
//       user: "Alice Johnson",
//       comment: "Could be better, but decent overall.",
//       rating: 3,
//     },
//     {
//       id: 4,
//       user: "Bob Brown",
//       comment: "Not satisfied with the quality.",
//       rating: 2,
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6 p-6 lg:mx-20">
//       <h2 className="text-3xl tracking-wide text-amber-950 text-center font-bold mb-2 col-span-full">
//         {t("reviews")}
//       </h2>
//       {reviews.map((review) => (
//         <div
//           key={review.id}
//           className="shadow-lg p-2 lg:p-4 rounded-lg bg-white flex flex-col gap-1 hover:shadow-xl transition"
//         >
//           <h3 className="font-semibold lg:text-lg">{review.user}</h3>
//           <p className="text-gray-700 text-sm lg:text-base">{review.comment}</p>
//           <ReactStars
//             count={5}
//             value={review.rating}
//             edit={false}
//             size={24}
//             color2={"#ffd700"}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Reviews;
