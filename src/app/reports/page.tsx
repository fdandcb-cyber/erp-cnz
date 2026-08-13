'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getExpenses, getOrders, getPayments, getServiceJobs } from '@/lib/db/actions'
import { format, startOfWeek, startOfMonth, startOfYear, endOfWeek, endOfMonth, endOfYear } from 'date-fns'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'] export default function ReportsPage() { const [period, setPeriod] = useState('monthly');
const [loading, setLoading] = useState(true);
const [salesData, setSalesData] = useState<any[]>([]);
const [expenseData, setExpenseData] = useState<any[]>([]);
const [paymentData, setPaymentData] = useState<any[]>([]);
 useEffect(() => { loadData() }, [period]);
 async function loadData() { setLoading(true);
try { const now = new Date();
let start: Date,
end: Date if (period === 'daily') { start = new Date(now.getFullYear(), now.getMonth(), now.getDate()) end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59) }
else if (period === 'weekly') { start = startOfWeek(now) end = endOfWeek(now) }
else if (period === 'monthly') { start = startOfMonth(now) end = endOfMonth(now) }
else { start = startOfYear(now) end = endOfYear(now) }
const startStr = start.toISOString().split('T')[0];
const endStr = end.toISOString().split('T')[0] const [orders, expenses, payments, services] = await Promise.all([ getOrders(), getExpenses(undefined, startStr, endStr), getPayments(), getServiceJobs() ]);
const filteredOrders = (orders as any[]).filter(o => o.created_at >= start.toISOString() && o.created_at <= end.toISOString())
const filteredPayments = (payments as any[]).filter(p => p.created_at >= start.toISOString() && p.created_at <= end.toISOString())
const totalSales = filteredOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
const totalExpenses = (expenses as any[]).reduce((sum, e) => sum + (e.amount || 0), 0);
const totalPayments = filteredPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
const profit = totalSales - totalExpenses setSalesData([ { name: 'Sales',
value: totalSales }, { name: 'Payments',
value: totalPayments }, { name: 'Profit',
value: profit }, ])
const expenseByCategory: Record<string, number> = {} ;(expenses as any[]).forEach(e => { expenseByCategory[e.category] = (expenseByCategory[e.category] || 0) + (e.amount || 0) }) setExpenseData(Object.entries(expenseByCategory).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value })))
const paymentByMethod: Record<string, number> = {} filteredPayments.forEach(p => { paymentByMethod[p.method || 'cash'] = (paymentByMethod[p.method || 'cash'] || 0) + (p.amount || 0) }) setPaymentData(Object.entries(paymentByMethod).map(([name, value]) => ({ name: name.toUpperCase(), value }))) } finally { setLoading(false) } }
return ( <div className='space-y-6'> <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'> <h2 className='text-xl font-bold'>Reports</h2> <Select value={period} onValueChange={setPeriod}> <SelectTrigger className='w-[160px]'> <SelectValue /> </SelectTrigger> <SelectContent> <SelectItem value='daily'>Daily</SelectItem> <SelectItem value='weekly'>Weekly</SelectItem> <SelectItem value='monthly'>Monthly</SelectItem> <SelectItem value='yearly'>Yearly</SelectItem> </SelectContent> </Select> </div> {loading ? ( <div className='space-y-4'> {Array.from({ length: 3 }).map((_, i) => ( <Skeleton key={i} className='h-64 w-full' /> ))} </div> ) : ( <> <div className='grid md:grid-cols-3 gap-4'> <Card className='border-0 shadow-sm'> <CardContent className='p-4 text-center'> <p className='text-sm text-muted-foreground'>Total Sales</p> <p className='text-2xl font-bold'>₹{salesData[0]?.value?.toLocaleString() || 0}</p> </CardContent> </Card> <Card className='border-0 shadow-sm'> <CardContent className='p-4 text-center'> <p className='text-sm text-muted-foreground'>Total Expenses</p> <p className='text-2xl font-bold'>₹{expenseData.reduce((s, e) => s + e.value, 0)?.toLocaleString() || 0}</p> </CardContent> </Card> <Card className='border-0 shadow-sm'> <CardContent className='p-4 text-center'> <p className='text-sm text-muted-foreground'>Net Profit</p> <p className={`text-2xl font-bold ${(salesData[2]?.value || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}> ₹{salesData[2]?.value?.toLocaleString() || 0} </p> </CardContent> </Card> </div> <Card className='border-0 shadow-sm'> <CardHeader> <CardTitle className='text-sm'>Sales Overview</CardTitle> </CardHeader> <CardContent> <ResponsiveContainer width='100%' height={250}> <BarChart data={salesData}> <CartesianGrid strokeDasharray='3 3' /> <XAxis dataKey='name' /> <YAxis /> <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} /> <Bar dataKey='value' fill='#3b82f6' /> </BarChart> </ResponsiveContainer> </CardContent> </Card> <div className='grid md:grid-cols-2 gap-4'> <Card className='border-0 shadow-sm'> <CardHeader> <CardTitle className='text-sm'>Expenses by Category</CardTitle> </CardHeader> <CardContent> <ResponsiveContainer width='100%' height={250}> <PieChart> <Pie data={expenseData} cx='50%' cy='50%' outerRadius={80} dataKey='value' label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} > {expenseData.map((_, index) => ( <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> ))} </Pie> <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} /> </PieChart> </ResponsiveContainer> </CardContent> </Card> <Card className='border-0 shadow-sm'> <CardHeader> <CardTitle className='text-sm'>Payments by Method</CardTitle> </CardHeader> <CardContent> <ResponsiveContainer width='100%' height={250}> <PieChart> <Pie data={paymentData} cx='50%' cy='50%' outerRadius={80} dataKey='value' label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} > {paymentData.map((_, index) => ( <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> ))} </Pie> <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} /> </PieChart> </ResponsiveContainer> </CardContent> </Card> </div> </> )} </div> ) }