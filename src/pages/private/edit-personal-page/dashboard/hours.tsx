import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

export const description = "A radial chart with a custom shape"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Minutos",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Hours({ data }: { data: { elapsed_time: number } }) {
  const elapsedMinutes = (data.elapsed_time / 60).toFixed(0)
  const angle = (data.elapsed_time / 60) * 360 / (60 * 8)
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardDescription>Horas treinadas</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={[{ elapsed_time: elapsedMinutes }]}
            endAngle={angle}
            innerRadius={80}
            outerRadius={140}
            className="first:fill-background last:fill-primary"
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="elapsed_time" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {elapsedMinutes}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          minutos
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          De uma média de 8 horas
        </div>
        <div className="leading-none text-muted-foreground">
          Você deu treino por {elapsedMinutes} minutos de aula, vamos lá!
        </div>
      </CardFooter>
    </Card>
  )
}

