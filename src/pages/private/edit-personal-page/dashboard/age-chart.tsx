import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Age } from "."
import { useEffect, useState } from "react"

const chartConfig = {
  desktop: {
    label: "Idade",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export const AgeChart = ({ data }: { data: Age }) => {
  const [ageData, setAgeData] = useState<any>(null);
  const [mostFrequentAgeRange, setMostFrequentAgeRange] = useState<string | null>(null);


  if (!data) {
    return null
  }

  useEffect(() => {
    if (!data) return;

    // Format the data for the chart
    const formattedData = Object.entries(data).map(([key, value]) => ({
      age: key,
      Usuários: value,
    }));
    setAgeData(formattedData);

    // Compute the most frequent age range
    const maxEntry = Object.entries(data).reduce(
      (max, entry) => (entry[1] > max[1] ? entry : max),
      ["", -Infinity]
    );
    setMostFrequentAgeRange(maxEntry[0]);
  }, [data]);

  useEffect(() => {
    if (!data) return;
    setAgeData(
      Object.entries(data).map(([key, value]) => ({
        age: key,
        Usuários: value,
      })))
  }, [data])


  return (
    <Card>
      <CardHeader>
        <CardDescription>Idade</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={ageData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="age"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="Usuários" fill="hsl(var(--primary))" radius={8} label={{ position: "insideBottom" }} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Faixa de idade mais frequente no seu perfil: {mostFrequentAgeRange}
        </div>
        <div className="leading-none text-muted-foreground">
          Dados coletados de usuários logados que visitaram seu perfil
        </div>
      </CardFooter>
    </Card>
  )
}

