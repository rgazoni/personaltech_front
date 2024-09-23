import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Gender } from "@/api/visitors"

export const description = "A pie chart with a legend"


const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  Masculino: {
    label: "Masculino",
    color: "hsl(var(--chart-1))",
  },
  Feminino: {
    label: "Feminino",
    color: "hsl(var(--chart-2))",
  },
  'Não binário': {
    label: "Não binário",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig



export const ViewsType = ({ data }: { data: Gender[] }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0 justify-start flex w-full items-start">
        <CardDescription className="w-ful text-start">Gênero</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="Usuários" hideLabel />}
            />
            <Pie
              data={data}
              dataKey="visitors"
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="hsla(var(--foreground))"
                  >
                    {`${payload.visitors}`}
                  </text>
                )
              }}
              nameKey="gender"
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="gender" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


