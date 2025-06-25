import React, { act, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Profile({ selectedLanguage }) {
  const { t } = useTranslation();
  const dir = selectedLanguage === "ar" ? "rtl" : "ltr";
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [orderFilter, setOrderFilter] = useState("all");
  const [expandedOrders, setExpandedOrders] = useState([]);
  const orders = [
    {
      id: 1,
      date: "2023-10-01",
      items: 3,
      total: 150,
      status: "Delivered",
      shippingAddress: "New Cairo, Egypt",
      paymentMethod: "Credit Card",
      trackingId: "TRK123456",
    },
    {
      id: 2,
      date: "2023-10-01",
      items: 3,
      total: 150,
      status: "In Progress",
      shippingAddress: "Zamalek, Egypt",
      paymentMethod: "Cash on Delivery",
      trackingId: "TRK654321",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="top p-5">
        <h2>Alhababi</h2>
      </div>
      <hr className="border border-black/50" />
      <div className="bottom flex flex-col lg:flex-row">
        <div
          className={`menu flex lg:flex-col lg:w-1/5 ${
            dir === "ltr" ? "border-r-2" : "border-l-2"
          } border-black/50`}
        >
          <p
            onClick={() => setActiveTab("personal")}
            className={`rounded-b-md border-b-1 border-black/50 p-5 hover:bg-amber-950/20 transition ease-in-out cursor-pointer ${
              activeTab === "personal" ? "bg-amber-950/90 text-white" : ""
            }`}
          >
            {t("personalinfo")}
          </p>
          <p
            onClick={() => setActiveTab("address")}
            className={`rounded-b-md border-b-1 border-black/50 p-5 hover:bg-amber-950/20 transition ease-in-out cursor-pointer ${
              activeTab === "address" ? "bg-amber-950/90 text-white" : ""
            }`}
          >
            {t("address")}
          </p>
          <p
            onClick={() => setActiveTab("orders")}
            className={`rounded-b-md border-b-1 border-black/50 p-5 hover:bg-amber-950/20 transition ease-in-out cursor-pointer ${
              activeTab === "orders" ? "bg-amber-950/90 text-white" : ""
            }`}
          >
            {t("orders")}
          </p>
        </div>
        {activeTab === "personal" && (
          <div className="personalinfo flex flex-col gap-6 justify-between m-5 py-5 px-10 w-auto bg-amber-950/10 rounded-2xl shadow-md">
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-40 justify-center">
              <div className="flex flex-col gap-1">
                <p className="font-bold">{t("email")}</p>
                <p className="text-center">username@gmail.com</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold">{t("username")}</p>
                <p className="text-center">Alhalabi</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold">{t("password")}</p>
                <p className="text-center"> - </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold">{t("number")}</p>
                <p className="text-center">+012345678</p>
              </div>
            </div>
            <div className="flex justify-end">
              <p
                onClick={() => navigate("/forgot-password")}
                className="bg-white p-4 rounded-2xl shadow cursor-pointer text-xs hover:bg-amber-950 transition ease-in-out hover:text-white hover:shadow-lg"
              >
                {t("chngpass")}
              </p>
            </div>
          </div>
        )}
        {activeTab === "address" && (
          <div className="address flex flex-col gap-6 justify-between m-5 py-5 px-10 w-1/2 bg-amber-950/10 rounded-2xl shadow-md">
            <h2 className="text-2xl text-center font-bold">{t("address")}</h2>

            <div className="flex flex-col gap-6 justify-center">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-amber-950/80">{t("street")}</h3>
                <p className="border-white/10 shadow-sm border p-2 rounded-xl">
                  gjhggihih-jffgy
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-amber-950/80">{t("district")}</h3>
                <p className="border-white/10 shadow-sm border p-2 rounded-xl">
                  New Cairo
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-amber-950/80">{t("city")}</h3>
                <p className="border-white/10 shadow-sm border p-2 rounded-xl">
                  Cairo
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-amber-950/80">{t("country")}</h3>
                <p className="border-white/10 shadow-sm border p-2 rounded-xl">
                  Egypt
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <p
                onClick={() => navigate("/addresses")}
                className="bg-white p-3 rounded-xl shadow cursor-pointer text-xs hover:bg-amber-950 transition ease-in-out hover:text-white hover:shadow-lg"
              >
                {t("chngadd")}
              </p>
            </div>
          </div>
        )}
        {activeTab === "orders" && (
          <div className="address flex flex-col gap-4 justify-between m-5 py-5 px-8 w-auto bg-amber-950/10 rounded-2xl shadow-md">
            <h2 className="text-2xl text-center font-bold">{t("orders")}</h2>
            <div className="flex gap-3">
              <div
                onClick={() => setOrderFilter("all")}
                className={`bg-white p-2 rounded-xl text-xs flex flex-col items-center border-2 shadow-lg cursor-pointer transition ${
                  orderFilter === "all"
                    ? "border-amber-950/50 text-amber-950"
                    : "border-transparent"
                }`}
              >
                <p>{t("allorders")}</p>
                <p className="font-bold">{orders.length}</p>
              </div>
              <div
                onClick={() => setOrderFilter("inprogress")}
                className={`bg-white p-2 rounded-xl text-xs flex flex-col items-center border-2 shadow-lg cursor-pointer transition ${
                  orderFilter === "inprogress"
                    ? "border-amber-950/50 text-amber-950"
                    : "border-transparent"
                }`}
              >
                <p>{t("inprogress")}</p>
                <p className="font-bold">
                  {
                    orders.filter(
                      (order) => order.status.toLowerCase() === "in progress"
                    ).length
                  }
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {orders
                .filter((order) =>
                  orderFilter === "all"
                    ? true
                    : order.status.toLowerCase() === "in progress"
                )
                .map((order) => (
                  <div
                    key={order.id}
                    className="bg-white/50 p-4 rounded-xl hover:bg-amber-950/20 transition cursor-pointer"
                    onClick={() =>
                      setExpandedOrders((prev) =>
                        prev.includes(order.id)
                          ? prev.filter((id) => id !== order.id)
                          : [...prev, order.id]
                      )
                    }
                  >
                    <div className="grid gap-1 lg:grid-cols-5 items-center mb-2">
                      <h3 className="font-bold text-amber-950/80 text-sm col-span-1">
                        {t("order")} #{order.id}
                      </h3>
                      <p className="text-xs font-bold col-span-1">
                        {order.date}
                      </p>
                      <p className="col-span-1">
                        {t("totalitems")}{" "}
                        <span className="text-red-800 font-bold">
                          {order.items}
                        </span>
                      </p>
                      <p className="col-span-1">
                        {t("totalprice")}{" "}
                        <span className="text-red-800 font-bold">
                          {order.total}
                        </span>
                      </p>
                      <p className="col-span-1">
                        {t("orderstat")}{" "}
                        <span className="text-red-800 font-bold">
                          {order.status}
                        </span>
                      </p>
                    </div>
                    {/* Expanded order details */}
                    {expandedOrders.includes(order.id) && (
                      <div className="mt-3 p-3 border-t border-black/20 text-sm">
                        <p>Shipping to: {order.shippingAddress}</p>
                        <p>Payment Method: {order.paymentMethod}</p>
                        <p>Tracking ID: {order.trackingId}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
