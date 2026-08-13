'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getPayments, createPayment, getCustomers, getOrders } from '@/lib/db/actions'
import { Payment, Customer, Order } from '@/lib/types'
import { format } from 'date-fns'
import { Search, Plus, Banknote, User } from 'lucide-react'
import { toast } from 'sonner'
export default function PaymentsPage() { const [payments, setPayments] = useState<Payment[]>([]);
const [customers, setCustomers] = useState<Customer[]>([]);
const [orders, setOrders] = useState<Order[]>([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState('');
const [showAdd, setShowAdd] = useState(false);
useEffect(() => { loadData() }, []);
 async function loadData() { setLoading(true);
try { const [p, c, o] = await Promise.all([ getPayments(), getCustomers(), getOrders() ]) setPayments(p as Payment[]) setCustomers(c as Customer[]) setOrders(o as Order[]) } finally { setLoading(false) } }
 async function handleAdd(e: React.FormEvent<HTMLFormElement>) { e.preventDefault();
const form = e.currentTarget const data = new FormData(form);
try { await createPayment({ customer_id: data.get('customer_id') as string, order_id: (data.get('order_id') as string) || null, amount: Number(data.get('amount')), method: (data.get('method') as string) || 'cash', reference: data.get('reference') as string || null,
notes: data.get('notes') as string || null, }) setShowAdd(false) loadData() toast.success('Payment recorded') }
catch { toast.error('Failed to record payment') } }
const filteredPayments = payments.filter(p => { if (!search);
return true const term = search.toLowerCase();
return p.customer?.name?.toLowerCase().includes(term) || p.method?.toLowerCase().includes(term) })
return ( <div className='space-y-4'> <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'> <h2 className='text-xl font-bold'>Payments</h2> <Dialog open={showAdd} onOpenChange={setShowAdd}> <DialogTrigger asChild> <Button> <Plus className='w-4 h-4 mr-2' /> Record Payment </Button> </DialogTrigger> <DialogContent className='sm:max-w-md'> <DialogHeader> <DialogTitle>Record Payment</DialogTitle> </DialogHeader> <form onSubmit={handleAdd} className='space-y-4'> <div className='space-y-2'> <Label htmlFor='customer_id'>Customer *</Label> <Select name='customer_id' required> <SelectTrigger> <SelectValue placeholder='Select customer' /> </SelectTrigger> <SelectContent> {customers.map(c => ( <SelectItem key={c.id} value={c.id}>{c.name} · {c.phone}</SelectItem> ))} </SelectContent> </Select> </div> <div className='space-y-2'> <Label htmlFor='order_id'>Order (optional)</Label> <Select name='order_id'> <SelectTrigger> <SelectValue placeholder='Select order' /> </SelectTrigger> <SelectContent> <SelectItem value=''>None</SelectItem> {orders.map(o => ( <SelectItem key={o.id} value={o.id}>{o.order_number} · {o.customer?.name}</SelectItem> ))} </SelectContent> </Select> </div> <div className='grid grid-cols-2 gap-3'> <div className='space-y-2'> <Label htmlFor='amount'>Amount *</Label> <Input id='amount' name='amount' type='number' min='0.01' step='0.01' required /> </div> <div className='space-y-2'> <Label htmlFor='method'>Method</Label> <Select name='method' defaultValue='cash'> <SelectTrigger> <SelectValue /> </SelectTrigger> <SelectContent> <SelectItem value='cash'>Cash</SelectItem> <SelectItem value='upi'>UPI</SelectItem> <SelectItem value='bank'>Bank</SelectItem> </SelectContent> </Select> </div> </div> <div className='space-y-2'> <Label htmlFor='reference'>Reference</Label> <Input id='reference' name='reference' placeholder='Transaction ID / Cheque No' /> </div> <div className='space-y-2'> <Label htmlFor='notes'>Notes</Label> <Input id='notes' name='notes' /> </div> <DialogFooter> <Button type='submit'>Record Payment</Button> </DialogFooter> </form> </DialogContent> </Dialog> </div> <div className='relative'> <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' /> <Input placeholder='Search payments...' className='pl-9' value={search} onChange={e => setSearch(e.target.value)} /> </div> {loading ? ( <div className='space-y-3'> {Array.from({ length: 5 }).map((_, i) => ( <Skeleton key={i} className='h-20 w-full' /> ))} </div> ) : filteredPayments.length === 0 ? ( <Card className='border-0 shadow-sm'> <CardContent className='p-8 text-center text-muted-foreground'>No payments found</CardContent> </Card> ) : ( <div className='space-y-3'> {filteredPayments.map(payment => ( <Card key={payment.id} className='border-0 shadow-sm'> <CardContent className='p-4'> <div className='flex items-start justify-between gap-3'> <div className='flex-1 min-w-0 space-y-1'> <div className='flex items-center gap-2'> <Banknote className='w-4 h-4 text-green-600' /> <span className='font-semibold text-sm'>₹{payment.amount?.toLocaleString()}</span> <span className='text-xs px-2 py-0.5 rounded-full bg-muted uppercase'>{payment.method}</span> </div> <div className='flex items-center gap-1 text-sm text-muted-foreground'> <User className='w-3 h-3' /> {payment.customer?.name} </div> {payment.reference && <p className='text-xs text-muted-foreground'>Ref: {payment.reference}</p>} </div> <div className='text-right shrink-0'> <p className='text-xs text-muted-foreground'>{format(new Date(payment.created_at), 'MMM d, yyyy')}</p> </div> </div> </CardContent> </Card> ))} </div> )} </div> ) }