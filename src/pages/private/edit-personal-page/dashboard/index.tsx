import { useQuery } from "@tanstack/react-query"
import { AgeChart } from "./age-chart"
import { TableRegions } from "./table-regions"
import { ViewsType } from "./views-type"
import { WeeklyReport } from "./weekly-report"
import { getAge, getElapsedTime, getGender, getRegions, getWeekly } from "@/api/visitors"
import useAppStore from "@/store"
import { useEffect, useState } from "react"
import { Component } from "./monthly-views"
import { Hours } from "./hours"

export type Age = {
  "0-18": number;
  "19-30": number;
  "31-45": number;
  "46-60": number;
  "61+": number;
}

export const Dashboard = () => {
  const page = useAppStore((state) => state.page)
  const user = useAppStore((state) => state.user)
  const [weeklyData, setWeeklyData] = useState<{ date: string; views: number }[]
    | null>(null)
  const [monthlyData, setMonthlyData] = useState<{ month: string; abrv: string; visitors: number }[]
    | null>([
      {
        month: "Jan",
        abrv: "01",
        visitors: 0,
      },
      {
        month: "Feb",
        abrv: "02",
        visitors: 0,
      },
      {
        month: "Mar",
        abrv: "03",
        visitors: 0,
      },
      {
        month: "Apr",
        abrv: "04",
        visitors: 0,
      },
      {
        month: "May",
        abrv: "05",
        visitors: 0,
      },
      {
        month: "Jun",
        abrv: "06",
        visitors: 0,
      },
      {
        month: "Jul",
        abrv: "07",
        visitors: 0,
      },
      {
        month: "Aug",
        abrv: "08",
        visitors: 0,
      },
      {
        month: "Sep",
        abrv: "09",
        visitors: 0,
      },
      {
        month: "Oct",
        abrv: "10",
        visitors: 0,
      },
      {
        month: "Nov",
        abrv: "11",
        visitors: 0,
      },
      {
        month: "Dec",
        abrv: "12",
        visitors: 0,
      },
    ])

  const { data: weekly, error: weeklyError, isPending: weeklyPending } = useQuery({
    queryKey: ["weekly", page.id],
    queryFn: () => getWeekly(page.id),
  })

  const { data: age, error: ageError, isPending: agePending } = useQuery({
    queryKey: ["age", page.id],
    queryFn: () => getAge(page.id),
  })

  const { data: gender, error: genderError, isPending: genderPending } = useQuery({
    queryKey: ["gender", page.id],
    queryFn: () => getGender(page.id),
  })

  const { data: regions, error: regionsError, isPending: regionsPending } = useQuery({
    queryKey: ["regions", page.id],
    queryFn: () => getRegions(page.id),
  })

  const { data: elapsed, error: elapsedError, isPending: elapsedPending } = useQuery({
    queryKey: ["elapsed", page.id],
    queryFn: () => getElapsedTime(user.id),
  })

  useEffect(() => {
    if (weekly) {
      setWeeklyData(weekly.map((item: any) => ({
        date: item.date.split('T')[0].replace(/-/g, '/'),
        views: item.views,
      })))
      setMonthlyData((prev) => {
        return prev!.map((item) => {
          const month = weekly.find((w: any) => w.date.split('-')[1] === item.abrv)
          return {
            ...item,
            visitors: month ? month.views : 0,
          }
        })
      })
    }
  }, [weekly])

  return (
    weeklyPending || agePending || regionsPending || genderPending || elapsedPending ? <div>Loading...</div> : weeklyError || ageError || regionsError || genderError || elapsedError ? <div>Error</div> :
      <div className="flex flex-col w-full gap-10">
        <h1 className="text-3xl font-bold text-secondary">Relatório Semanal</h1>
        <WeeklyReport data={weeklyData!} />
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <Component data={monthlyData!} />
            <Hours data={elapsed!} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-secondary">Análise de usuários</h1>
            <span className="text-sm text-muted-foreground">Análise dos usuários que entraram no seu perfil e possuem uma conta na plataforma</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ViewsType data={gender!} />
            <AgeChart data={age!} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-xl font-bold text-secondary">Disposição geográfica</h1>
          <TableRegions data={regions!} />
        </div>
      </div>
  )
}
