import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { useTranslation } from "react-i18next";
function DashboardCategories() {
  const { t } = useTranslation();

  return (
    <Card className="flex flex-col mx-3 lg:mx-10 my-10 shadow-lg hover:shadow-xl transition-shadow duration-300 lg:w-fit">
      <CardHeader className="flex justify-between items-center pb-0">
        <div className="flex flex-col">
          <CardTitle>{t("totalCategories")}</CardTitle>
          <CardDescription className="text-4xl font-bold">2</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-black shadow-md p-3 rounded-full cursor-pointer hover:shadow-lg hover:scale-102 transition-all ease duration-200">
            {t("addCategory")}
          </button>
        </div>
      </CardHeader>
      <CardContent className="flex items-center flex-1 pb-0 ">
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto text-sm lg:text-base">
            <thead className="shadow-md rounded-xl">
              <tr>
                <th className="text-start p-2">{t("categoryId")}</th>
                <th className="text-start p-2">{t("categoryName")}</th>
                <th className="text-start p-2">{t("categoryPhoto")}</th>
                <th className="text-start p-2">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-start p-2">1</td>
                <td className="text-start p-2">Category 1</td>
                <td className="text-start p-2">Photo for Category 1</td>
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
                <td className="text-start p-2">Category 2</td>
                <td className="text-start p-2">Photo for Category 2</td>
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
          Showing total Categories
        </div>
      </CardFooter>
    </Card>
  );
}

export default DashboardCategories;
