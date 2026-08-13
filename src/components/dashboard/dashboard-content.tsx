'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { getDashboardStats, getRecentActivities } from '@/lib/db/actions'
import { formatDistanceToNow } from 'date-fns'
import { ShoppingCart, Clock, CheckCircle, AlertCircle, TrendingDown, Package, Wrench, Plus, Banknote, Truck, Receipt, Store, PackageOpen } from 'lucide-react'
import Link from 'next/link'
export default function DashboardContent() { const [stats, setStats] = useState<any>(null)
const [activities, setActivities] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
useEffect(() => { async function load() { try { const [s, a] = await Promise.all([ getDashboardStats(), getRecentActivities(10) ]) setStats(s) setActivities(a) } finally { setLoading(false) } } load() }, []);
const statCards = [ { label: 'Today Orders', value: stats?.today_orders ?? 0, icon: ShoppingCart, color: 'text-blue-600',
bg: 'bg-blue-50' }, { label: 'Pending', value: stats?.pending_orders ?? 0, icon: Clock, color: 'text-amber-600',
bg: 'bg-amber-50' }, { label: 'Completed', value: stats?.completed_orders ?? 0, icon: CheckCircle, color: 'text-green-600',
bg: 'bg-green-50' }, { label: 'Pending Pay',
value: `₹${(stats?.pending_payments ?? 0).toLocaleString()}`, icon: AlertCircle, color: 'text-red-600',
bg: 'bg-red-50' }, { label: 'Expenses',
value: `₹${(stats?.today_expenses ?? 0).toLocaleString()}`, icon: TrendingDown, color: 'text-orange-600',
bg: 'bg-orange-50' }, { label: 'Low Stock', value: stats?.low_stock ?? 0, icon: Package, color: 'text-purple-600',
bg: 'bg-purple-50' }, { label: 'Out Stock', value: stats?.out_of_stock ?? 0, icon: Package, color: 'text-rose-600',
bg: 'bg-rose-50' }, { label: 'Services', value: stats?.today_services ?? 0, icon: Wrench, color: 'text-cyan-600',
bg: 'bg-cyan-50' }, ] const quickActions = [ { label: 'Open Store', href: '/store', icon: Store, color: 'bg-indigo-600
hover:bg-indigo-700' }, { label: 'Inventory', href: '/inventory', icon: PackageOpen, color: 'bg-slate-600
hover:bg-slate-700' }, { label: 'Create Order', href: '/orders/new', icon: Plus, color: 'bg-blue-600
hover:bg-blue-700' }, { label: 'Receive Payment', href: '/payments', icon: Banknote, color: 'bg-green-600
hover:bg-green-700' }, { label: 'Purchase', href: '/purchase', icon: Truck, color: 'bg-purple-600
hover:bg-purple-700' }, { label: 'Service Job', href: '/services', icon: Wrench, color: 'bg-amber-600
hover:bg-amber-700' }, { label: 'Add Expense', href: '/expenses', icon: Receipt, color: 'bg-red-600
hover:bg-red-700' }, ] return ( <div className='space-y-6'> <div className='grid grid-cols-2 md:grid-cols-4 gap-3'> {statCards.map((stat) => { const Icon = stat.icon return ( <Card key={stat.label} className='border-0 shadow-sm'> <CardContent className='p-4'> <div className='flex items-start justify-between'> <div className='space-y-1'> <p className='text-xs text-muted-foreground'>{stat.label}</p> {loading ? <Skeleton className='h-7 w-16' /> : <p className='text-xl font-bold'>{stat.value}</p>} </div> <div className={`p-2 rounded-lg ${stat.bg}`}> <Icon className={`w-4 h-4 ${stat.color}`} /> </div> </div> </CardContent> </Card> )
})} </div> <div className='grid lg:grid-cols-3 gap-6'> <Card className='lg:col-span-2 border-0 shadow-sm'> <CardHeader className='pb-3'> <CardTitle className='text-sm font-medium'>Recent Activities</CardTitle> </CardHeader> <CardContent className='p-0'> {loading ? ( <div className='space-y-3 p-4'> {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className='h-12 w-full' />)} </div> ) : activities.length === 0 ? ( <div className='p-8 text-center text-muted-foreground text-sm'>No recent activities</div> ) : ( <div className='divide-y'> {activities.map((activity) => ( <div key={activity.id} className='flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors'> <div className='w-2 h-2 rounded-full bg-primary shrink-0' /> <div className='flex-1 min-w-0'> <p className='text-sm truncate'>{activity.description}</p> <p className='text-xs text-muted-foreground'> {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })} </p> </div> </div> ))} </div> )} </CardContent> </Card> <Card className='border-0 shadow-sm'> <CardHeader className='pb-3'> <CardTitle className='text-sm font-medium'>Quick Actions</CardTitle> </CardHeader> <CardContent className='p-4 pt-0'> <div className='grid grid-cols-1 gap-2'> {quickActions.map((action) => { const Icon = action.icon
return ( <Link key={action.label} href={action.href}> <Button className={`w-full justify-start gap-2 text-white ${action.color}`}> <Icon className='w-4 h-4' /> {action.label} </Button> </Link> )
})} </div> </CardContent> </Card> </div> </div> ) }