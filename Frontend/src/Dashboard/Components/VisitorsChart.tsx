"use client";

import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../Components/ui/chart";
import React, { Suspense } from "react";
import type { LineChart } from "recharts";

type LineChartProps = React.ComponentProps<typeof LineChart>;

const LazyLineChart = React.lazy(() =>
  import("recharts").then((mod) => ({
    default: (props: LineChartProps) => <mod.LineChart {...props} />,
  }))
);

const LazyLine = React.lazy(() =>
  import("recharts").then((mod) => ({ default: mod.Line }))
);

const LazyCartesianGrid = React.lazy(() =>
  import("recharts").then((mod) => ({ default: mod.CartesianGrid }))
);

const LazyDot = React.lazy(() =>
  import("recharts").then((mod) => ({ default: mod.Dot }))
);

export const description = "A line chart with dots and colors";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--chart-2)",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function ChartLineDotsColors() {
  return (
    <Card className="w-full max-w-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Visitors - Dots Colors</CardTitle>
        {/*         <CardDescription>January - June 2024</CardDescription>
         */}{" "}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <Suspense
            fallback={
              <div className="p-4 text-muted-foreground">Loading chart...</div>
            }
          >
            <LazyLineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 10,
                left: 14,
                right: 14,
              }}
            >
              <LazyCartesianGrid vertical={false} />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    nameKey="visitors"
                    hideLabel
                  />
                }
              />
              <LazyLine
                dataKey="visitors"
                type="natural"
                stroke="var(--color-visitors)"
                strokeWidth={2}
                dot={({ payload, ...props }) => {
                  return (
                    <LazyDot
                      key={payload.browser}
                      r={5}
                      cx={props.cx}
                      cy={props.cy}
                      fill={payload.fill}
                      stroke={payload.fill}
                    />
                  );
                }}
              />
            </LazyLineChart>
          </Suspense>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors updated for the last 24 hours
        </div>
      </CardFooter>
    </Card>
  );
}
