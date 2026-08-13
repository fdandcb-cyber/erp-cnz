'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getParcels, createParcel, updateParcelStatus } from '@/lib/db/actions'
import { Parcel } from '@/lib/types'
import { format } from 'date-fns'
import { Search, Plus, Box, Truck, Phone } from 'lucide-react'
import { toast } from 'sonner'
const statusColors: Record<string, string> = { booked: 'bg-blue-100 text-blue-800', in_transit: 'bg-amber-100 text-amber-800',
delivered: 'bg-green-100 text-green-800', }
export default function ParcelsPage() { const [parcels, setParcels] = useState<Parcel[]>([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState('');
const [showAdd, setShowAdd] = useState(false);
useEffect(() => { loadData() }, []);
 async function loadData() { setLoading(true);
try { const data = await getParcels() setParcels(data as Parcel[]) } finally { setLoading(false) } }
 async function handleAdd(e: React.FormEvent<HTMLFormElement>) { e.preventDefault();
const form = e.currentTarget const data = new FormData(form);
try { await createParcel({ parcel_number: data.get('parcel_number') as string, bus_name: data.get('bus_name') as string, driver_name: data.get('driver_name') as string || null, driver_phone: data.get('driver_phone') as string || null, destination: data.get('destination') as string, receiver_name: data.get('receiver_name') as string, receiver_phone: data.get('receiver_phone') as string || null, charges: Number(data.get('charges')) || 0, status: 'booked',
notes: data.get('notes') as string || null, }) setShowAdd(false) loadData() toast.success('Parcel booked') }
catch { toast.error('Failed to book parcel') } }
 async function handleStatusChange(id: string,
status: string) { try { await updateParcelStatus(id, status) loadData() toast.success('Status updated') }
catch { toast.error('Failed to update status') } }
const filteredParcels = parcels.filter(p => { if (!search);
return true const term = search.toLowerCase();
return p.parcel_number?.toLowerCase().includes(term) || p.receiver_name?.toLowerCase().includes(term) || p.destination?.toLowerCase().includes(term) })
return ( <div className='space-y-4'> <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'> <h2 className='text-xl font-bold'>Parcels</h2> <Dialog open={showAdd} onOpenChange={setShowAdd}> <DialogTrigger asChild> <Button> <Plus className='w-4 h-4 mr-2' /> Book Parcel </Button> </DialogTrigger> <DialogContent className='sm:max-w-md max-h-[90vh] overflow-y-auto'> <DialogHeader> <DialogTitle>Book Parcel</DialogTitle> </DialogHeader> <form onSubmit={handleAdd} className='space-y-4'> <div className='space-y-2'> <Label htmlFor='parcel_number'>Parcel Number *</Label> <Input id='parcel_number' name='parcel_number' required /> </div> <div className='space-y-2'> <Label htmlFor='bus_name'>Bus Name *</Label> <Input id='bus_name' name='bus_name' required /> </div> <div className='grid grid-cols-2 gap-3'> <div className='space-y-2'> <Label htmlFor='driver_name'>Driver</Label> <Input id='driver_name' name='driver_name' /> </div> <div className='space-y-2'> <Label htmlFor='driver_phone'>Driver Phone</Label> <Input id='driver_phone' name='driver_phone' type='tel' /> </div> </div> <div className='space-y-2'> <Label htmlFor='destination'>Destination *</Label> <Input id='destination' name='destination' required /> </div> <div className='grid grid-cols-2 gap-3'> <div className='space-y-2'> <Label htmlFor='receiver_name'>Receiver *</Label> <Input id='receiver_name' name='receiver_name' required /> </div> <div className='space-y-2'> <Label htmlFor='receiver_phone'>Receiver Phone</Label> <Input id='receiver_phone' name='receiver_phone' type='tel' /> </div> </div> <div className='space-y-2'> <Label htmlFor='charges'>Charges</Label> <Input id='charges' name='charges' type='number' min='0' step='0.01' defaultValue='0' /> </div> <div className='space-y-2'> <Label htmlFor='notes'>Notes</Label> <Input id='notes' name='notes' /> </div> <DialogFooter> <Button type='submit'>Book Parcel</Button> </DialogFooter> </form> </DialogContent> </Dialog> </div> <div className='relative'> <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' /> <Input placeholder='Search parcels...' className='pl-9' value={search} onChange={e => setSearch(e.target.value)} /> </div> {loading ? ( <div className='space-y-3'> {Array.from({ length: 5 }).map((_, i) => ( <Skeleton key={i} className='h-24 w-full' /> ))} </div> ) : filteredParcels.length === 0 ? ( <Card className='border-0 shadow-sm'> <CardContent className='p-8 text-center text-muted-foreground'>No parcels found</CardContent> </Card> ) : ( <div className='space-y-3'> {filteredParcels.map(parcel => ( <Card key={parcel.id} className='border-0 shadow-sm'> <CardContent className='p-4'> <div className='flex items-start justify-between gap-3'> <div className='flex-1 min-w-0 space-y-1'> <div className='flex items-center gap-2 flex-wrap'> <Box className='w-4 h-4 text-blue-600' /> <span className='font-semibold text-sm'>{parcel.parcel_number}</span> <Badge variant='outline' className={statusColors[parcel.status] || ''}> {parcel.status.replace('_', ' ')} </Badge> </div> <div className='flex items-center gap-1 text-sm text-muted-foreground'> <Truck className='w-3 h-3' /> {parcel.bus_name} · {parcel.destination} </div> <div className='flex items-center gap-1 text-xs text-muted-foreground'> <Phone className='w-3 h-3' /> {parcel.receiver_name} · {parcel.receiver_phone} </div> {parcel.charges && parcel.charges > 0 && <p className='text-xs'>Charges: ₹{parcel.charges.toLocaleString()}</p>} </div> <div className='flex flex-col items-end gap-1 shrink-0'> <p className='text-xs text-muted-foreground'>{format(new Date(parcel.created_at), 'MMM d')}</p> <Select value={parcel.status} onValueChange={v => handleStatusChange(parcel.id, v)}> <SelectTrigger className='h-7 w-[110px] text-xs'> <SelectValue /> </SelectTrigger> <SelectContent> <SelectItem value='booked'>Booked</SelectItem> <SelectItem value='in_transit'>In Transit</SelectItem> <SelectItem value='delivered'>Delivered</SelectItem> </SelectContent> </Select> </div> </div> </CardContent> </Card> ))} </div> )} </div> ) }