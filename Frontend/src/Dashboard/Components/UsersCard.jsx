import { TrendingUp } from "lucide-react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";
import { useTranslation } from "react-i18next";

export default function TotalUsersCard() {
  const { t } = useTranslation();
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, 200, { duration: 5 });
    return () => controls.stop();
  }, []);
  return (
    <Card className="flex flex-col w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center pb-0">
        <CardTitle>{t("totalUsers")}</CardTitle>
        <CardDescription className="text-4xl font-bold">
          <motion.span>{rounded}</motion.span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center flex-1 pb-0">
        {/* Optional icon or illustration */}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          {t("showTotalUsers")}
        </div>
      </CardFooter>
    </Card>
  );
}
