import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { addWeeks, startOfISOWeek } from "date-fns"

type WeeklyReportProps = {
  data: { week: string; views: number }[]
}

export const WeeklyReport = (
  { data }: WeeklyReportProps
) => {
  if (!data) {
    return null
  }
  const currentWeekViews = data[data.length - 1]?.views || 0
  const lastWeekViews = data[data.length - 2]?.views || 0
  const percentageChange = ((currentWeekViews - lastWeekViews) / lastWeekViews) * 100
  const isIncrease = percentageChange > 0

  const getISOWeekRange = (year: number, weekNumber: number) => {
    const firstDayOfYear = new Date(year, 0, 4); // ISO week 1 contains Jan 4th
    const startOfFirstWeek = startOfISOWeek(firstDayOfYear);
    const desiredWeek = addWeeks(startOfFirstWeek, weekNumber - 1);
    const endOfDesiredWeek = addWeeks(desiredWeek, 1);

    return {
      start: desiredWeek,
      end: endOfDesiredWeek,
    };
  }

  const handleWeek = (week: string) => {
    const weekNumber = parseInt(week);
    const { start, end } = getISOWeekRange(2024, weekNumber);
    return `${start.getDate()}/${start.getMonth() + 1} - ${end.getDate()}/${end.getMonth() + 1}`;
  }

  return (
    <Card className="w-full h-fit">
      <CardHeader className="space-y-0 pb-2">
        <CardDescription>Visualizações dessa semana</CardDescription>
        <CardTitle className="text-2xl font-bold">
          {currentWeekViews.toLocaleString()}
          <span className="ml-1 text-sm font-normal text-muted-foreground">
            visualizações
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" hide />
              <YAxis hide />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Visualizações
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Semana
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {handleWeek(payload[0].payload.week)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#fillViews)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-5 border-t pt-4">
          <div>
            <p className="text-sm font-medium">Semana passada</p>
            <p className="text-2xl font-bold">{lastWeekViews.toLocaleString()}</p>
          </div>
          <div className={`flex items-center ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
            {isIncrease ? (
              <ArrowUpIcon className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDownIcon className="mr-1 h-4 w-4" />
            )}
            <span className="text-sm font-medium">
              {Math.abs(percentageChange).toFixed(1)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
