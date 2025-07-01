import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
function DashboardUsers() {
  const { t } = useTranslation();
  return (
    <Card className="flex flex-col mx-3 lg:mx-10 my-10 shadow-lg hover:shadow-xl transition-shadow duration-300 lg:w-fit">
      <CardHeader className="flex justify-between items-center pb-0">
        <div className="flex flex-col">
          <CardTitle>{t("totalUsers")}</CardTitle>
          <CardDescription className="text-4xl font-bold">2</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex items-center flex-1 pb-0 ">
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto text-sm lg:text-base">
            <thead className="shadow-md rounded-xl">
              <tr>
                <th className="text-start p-2">{t("userId")}</th>
                <th className="text-start p-2">{t("username")}</th>
                <th className="text-start p-2">{t("email")}</th>
                <th className="text-start p-2">{t("number")}</th>
                <th className="text-start p-2">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-start p-2">1</td>
                <td className="text-start p-2">User 1</td>
                <td className="text-start p-2">user1@example.com</td>
                <td className="text-start p-2">123-456-7890</td>
                <td className="text-start flex gap-2 p-2">
                  <button className="text-blue-500 cursor-pointer">
                    {t("edit")}
                  </button>
                  <button className="text-red-500 cursor-pointer">
                    {t("delete")}
                  </button>
                </td>
              </tr>
              <tr>
                <td className="text-start p-2">2</td>
                <td className="text-start p-2">User 2</td>
                <td className="text-start p-2">user2@example.com</td>
                <td className="text-start p-2">123-456-7890</td>
                <td className="text-start flex gap-2 p-2">
                  <button className="text-blue-500 cursor-pointer">
                    {t("edit")}
                  </button>
                  <button className="text-red-500 cursor-pointer">
                    {t("delete")}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-xs lg:text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total Users updated for the last 24 hours
        </div>
      </CardFooter>
    </Card>
  );
}

export default DashboardUsers;
