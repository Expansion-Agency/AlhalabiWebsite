import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TotalUsersCard() {
  return (
    <Card className="flex flex-col w-full max-w-sm">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Users</CardTitle>
        <CardDescription className="text-4xl font-bold">200</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center flex-1 pb-0">
        {/* Optional icon or illustration */}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total users for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
