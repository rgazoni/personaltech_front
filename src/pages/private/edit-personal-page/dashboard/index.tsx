import { useQuery } from "@tanstack/react-query"
import { AgeChart } from "./age-chart"
import { TableRegions } from "./table-regions"
import { ViewsType } from "./views-type"
import { WeeklyReport } from "./weekly-report"
import { getAge, getRegions, getWeekly } from "@/api/visitors"
import useAppStore from "@/store"
import { useEffect, useState } from "react"

export type Age = {
  "0-18": number;
  "19-30": number;
  "31-45": number;
  "46-60": number;
  "61+": number;
}

export const Dashboard = () => {
  const page = useAppStore((state) => state.page)
  const [weeklyData, setWeeklyData] = useState<{ date: string; views: number }[]
    | null>(null)

  const { data: weekly, error: weeklyError, isPending: weeklyPending } = useQuery({
    queryKey: ["weekly", page.id],
    queryFn: () => getWeekly(page.id),
  })

  const { data: age, error: ageError, isPending: agePending } = useQuery({
    queryKey: ["age", page.id],
    queryFn: () => getAge(page.id),
  })

  const { data: regions, error: regionsError, isPending: regionsPending } = useQuery({
    queryKey: ["regions", page.id],
    queryFn: () => getRegions(page.id),
  })

  useEffect(() => {
    if (weekly) {
      setWeeklyData(weekly.map((item: any) => ({
        date: item.date.split('T')[0].replace(/-/g, '/'),
        views: item.views,
      })))
    }
  }, [weekly])

  return (
    weeklyPending || agePending || regionsPending ? <div>Loading...</div> : weeklyError || ageError || regionsError ? <div>Error</div> :
      <div className="flex flex-col w-full gap-10">
        <h1 className="text-3xl font-bold text-secondary">Relatório Semanal</h1>
        <WeeklyReport data={weeklyData!} />
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-xl font-bold text-secondary">Análise de usuários</h1>
            <span className="text-sm text-muted-foreground">Análise dos usuários que entraram no seu perfil e possuem uma conta na plataforma</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ViewsType />
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
