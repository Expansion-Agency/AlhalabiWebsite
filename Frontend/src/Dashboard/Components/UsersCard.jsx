import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function TotalUsersCard() {
  const { t } = useTranslation();
  return (
    <Card className="flex flex-col w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center pb-0">
        <CardTitle>{t("totalUsers")}</CardTitle>
        <CardDescription className="text-4xl font-bold">200</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center flex-1 pb-0">
        {/* Optional icon or illustration */}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total users for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
