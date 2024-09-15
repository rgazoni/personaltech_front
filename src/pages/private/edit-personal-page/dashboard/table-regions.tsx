import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export function TableRegions({ data }: { data: { city: string, state: string, count: number }[] }) {
  return (
    <div className="rounded-lg border">
      <Table >
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Estado</TableHead>
            <TableHead className="text-nowrap">Cidade</TableHead>
            <TableHead className="text-right text-nowrap">Número usuários</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          {data.map((invoice) => (
            <TableRow key={invoice.city}>
              <TableCell className="font-medium text-nowrap">{invoice.state}</TableCell>
              <TableCell className="w-full">{invoice.city}</TableCell>
              <TableCell className="text-right w-full">{invoice.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">{data.reduce((accumulator, current) => accumulator + current.count, 0)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

