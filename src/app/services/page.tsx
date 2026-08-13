'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { getServiceJobs, createServiceJob, getCustomers, getProducts } from '@/lib/db/actions'
import { ServiceJob, Customer, Product } from '@/lib/types'
import { format } from 'date-fns'
import { Search, Plus, Wrench, User, Calendar } from 'lucide-react'
import { toast } from 'sonner'
const statusColors: Record<string, string> = { pending: 'bg-amber-100 text-amber-800', in_progress: 'bg-blue-100 text-blue-800', waiting_parts: 'bg-orange-100 text-orange-800', completed: 'bg-green-100 text-green-800',
delivered: 'bg-emerald-100 text-emerald-800', }
export default function ServicesPage() { const [jobs, setJobs] = useState<ServiceJob[]>([]);
const [customers, setCustomers] = useState<Customer[]>([]);
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState('');
const [showAdd, setShowAdd] = useState(false);
const router = useRouter();
useEffect(() => { loadData() }, []);
 async function loadData() { setLoading(true);
try { const [j, c, p] = await Promise.all([ getServiceJobs(), getCustomers(), getProducts() ]) setJobs(j as ServiceJob[]) setCustomers(c as Customer[]) setProducts(p as Product[]) } finally { setLoading(false) } }
 async function handleAdd(e: React.FormEvent<HTMLFormElement>) { e.preventDefault();
const form = e.currentTarget const data = new FormData(form);
try { await createServiceJob({ job_number: `SRV-${Date.now().toString(36).toUpperCase()}`, customer_id: data.get('customer_id') as string, product_id: (data.get('product_id') as string) || null, serial_number: data.get('serial_number') as string || null, problem: data.get('problem') as string, accessories: data.get('accessories') as string || null, engineer: data.get('engineer') as string || null, expected_date: (data.get('expected_date') as string) || null, status: 'pending',
remarks: data.get('remarks') as string || null, }) setShowAdd(false) loadData() toast.success('Service job created') }
catch { toast.error('Failed to create service job') } }
const filteredJobs = jobs.filter(j => { if (!search);
return true const term = search.toLowerCase();
return j.job_number?.toLowerCase().includes(term) || j.customer?.name?.toLowerCase().includes(term) || j.problem?.toLowerCase().includes(term) })
return ( <div className='space-y-4'> <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'> <h2 className='text-xl font-bold'>Service Jobs</h2> <Dialog open={showAdd} onOpenChange={setShowAdd}> <DialogTrigger asChild> <Button> <Plus className='w-4 h-4 mr-2' /> New Service </Button> </DialogTrigger> <DialogContent className='sm:max-w-md max-h-[90vh] overflow-y-auto'> <DialogHeader> <DialogTitle>New Service Job</DialogTitle> </DialogHeader> <form onSubmit={handleAdd} className='space-y-4'> <div className='space-y-2'> <Label htmlFor='customer_id'>Customer *</Label> <Select name='customer_id' required> <SelectTrigger> <SelectValue placeholder='Select customer' /> </SelectTrigger> <SelectContent> {customers.map(c => ( <SelectItem key={c.id} value={c.id}>{c.name} · {c.phone}</SelectItem> ))} </SelectContent> </Select> </div> <div className='space-y-2'> <Label htmlFor='product_id'>Product</Label> <Select name='product_id'> <SelectTrigger> <SelectValue placeholder='Select product' /> </SelectTrigger> <SelectContent> <SelectItem value=''>None</SelectItem> {products.map(p => ( <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem> ))} </SelectContent> </Select> </div> <div className='space-y-2'> <Label htmlFor='serial_number'>Serial Number</Label> <Input id='serial_number' name='serial_number' /> </div> <div className='space-y-2'> <Label htmlFor='problem'>Problem *</Label> <Textarea id='problem' name='problem' required rows={2} /> </div> <div className='space-y-2'> <Label htmlFor='accessories'>Accessories</Label> <Input id='accessories' name='accessories' placeholder='Charger, cable, etc.' /> </div> <div className='space-y-2'> <Label htmlFor='engineer'>Engineer</Label> <Input id='engineer' name='engineer' /> </div> <div className='space-y-2'> <Label htmlFor='expected_date'>Expected Date</Label> <Input id='expected_date' name='expected_date' type='date' /> </div> <div className='space-y-2'> <Label htmlFor='remarks'>Remarks</Label> <Textarea id='remarks' name='remarks' rows={2} /> </div> <DialogFooter> <Button type='submit'>Create Job</Button> </DialogFooter> </form> </DialogContent> </Dialog> </div> <div className='relative'> <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' /> <Input placeholder='Search service jobs...' className='pl-9' value={search} onChange={e => setSearch(e.target.value)} /> </div> {loading ? ( <div className='space-y-3'> {Array.from({ length: 5 }).map((_, i) => ( <Skeleton key={i} className='h-24 w-full' /> ))} </div> ) : filteredJobs.length === 0 ? ( <Card className='border-0 shadow-sm'> <CardContent className='p-8 text-center text-muted-foreground'>No service jobs found</CardContent> </Card> ) : ( <div className='space-y-3'> {filteredJobs.map(job => ( <Card key={job.id} className='border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer' onClick={() => router.push(`/services/${job.id}`)}> <CardContent className='p-4'> <div className='flex items-start justify-between gap-3'> <div className='flex-1 min-w-0 space-y-1'> <div className='flex items-center gap-2 flex-wrap'> <span className='font-semibold text-sm'>{job.job_number}</span> <Badge variant='outline' className={statusColors[job.status] || ''}> {job.status.replace('_', ' ')} </Badge> </div> <div className='flex items-center gap-1 text-sm text-muted-foreground'> <User className='w-3 h-3' /> {job.customer?.name} </div> <p className='text-sm truncate'>{job.problem}</p> {job.expected_date && ( <div className='flex items-center gap-1 text-xs text-muted-foreground'> <Calendar className='w-3 h-3' /> Expected: {format(new Date(job.expected_date), 'MMM d, yyyy')} </div> )} </div> <div className='text-right shrink-0'> <p className='text-xs text-muted-foreground'>{format(new Date(job.created_at), 'MMM d')}</p> </div> </div> </CardContent> </Card> ))} </div> )} </div> ) }