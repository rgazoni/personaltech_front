import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Visualizações mensais"

const chartConfig = {
  desktop: {
    label: "Visualizações",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function Component({ data }: {
  data: { month: string; abrv: string; visitors: number }[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Visualizações mensais</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              label={`Visualizações`}
              content={<ChartTooltipContent hideLabel nameKey="Visualizações" />}
            />
            <Bar dataKey="visitors" fill="hsl(var(--primary))" radius={8} name="Visualizações ">
              <LabelList
                dataKey="visitors"
                position="insideBottom"
                offset={10}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

