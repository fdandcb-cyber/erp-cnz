'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { getProducts, createProduct, deleteProduct } from '@/lib/db/actions'
import { Product } from '@/lib/types'
import { Search, Plus, Package, AlertTriangle, Trash2, Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
export default function ProductsPage() { const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState('');
const [showAdd, setShowAdd] = useState(false);
const [showLowStock, setShowLowStock] = useState(false);
const router = useRouter();
useEffect(() => { loadProducts() }, []);
 async function loadProducts() { setLoading(true);
try { const data = await getProducts(search || undefined, showLowStock || undefined) setProducts(data as Product[]) } finally { setLoading(false) } }
 async function handleAdd(e: React.FormEvent<HTMLFormElement>) { e.preventDefault();
const form = e.currentTarget const data = new FormData(form);
try { await createProduct({ name: data.get('name') as string, category: data.get('category') as string || null, sku: data.get('sku') as string || null, purchase_price: Number(data.get('purchase_price')) || 0, selling_price: Number(data.get('selling_price')) || 0, current_stock: Number(data.get('current_stock')) || 0, minimum_stock: Number(data.get('minimum_stock')) || 0, location: data.get('location') as string || null,
remarks: data.get('remarks') as string || null, }) setShowAdd(false) loadProducts() toast.success('Product added') }
catch { toast.error('Failed to add product') } }
 async function handleDelete(id: string) { if (!confirm('Are you sure?'));
return try { await deleteProduct(id) loadProducts() toast.success('Product deleted') }
catch { toast.error('Failed to delete') } }
const filteredProducts = products.filter(p => { if (!search);
return true const term = search.toLowerCase();
return p.name.toLowerCase().includes(term) || (p.sku && p.sku.toLowerCase().includes(term)) });
return ( <div className='space-y-4'> <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'> <h2 className='text-xl font-bold'>Products</h2> <div className='flex gap-2'> <Button variant='outline' size='sm' className={showLowStock ? 'bg-amber-50 border-amber-200' : ''} onClick={() => { setShowLowStock(!showLowStock) loadProducts() }}> <AlertTriangle className='w-4 h-4 mr-1' /> Low Stock </Button> <Dialog open={showAdd} onOpenChange={setShowAdd}> <DialogTrigger asChild> <Button> <Plus className='w-4 h-4 mr-2' /> Add Product </Button> </DialogTrigger> <DialogContent className='sm:max-w-md max-h-[90vh] overflow-y-auto'> <DialogHeader> <DialogTitle>Add Product</DialogTitle> </DialogHeader> <form onSubmit={handleAdd} className='space-y-4'> <div className='space-y-2'> <Label htmlFor='name'>Name *</Label> <Input id='name' name='name' required /> </div> <div className='grid grid-cols-2 gap-3'> <div className='space-y-2'> <Label htmlFor='category'>Category</Label> <Input id='category' name='category' /> </div> <div className='space-y-2'> <Label htmlFor='sku'>SKU</Label> <Input id='sku' name='sku' /> </div> </div> <div className='grid grid-cols-2 gap-3'> <div className='space-y-2'> <Label htmlFor='purchase_price'>Purchase Price</Label> <Input id='purchase_price' name='purchase_price' type='number' min='0' step='0.01' defaultValue='0' /> </div> <div className='space-y-2'> <Label htmlFor='selling_price'>Selling Price</Label> <Input id='selling_price' name='selling_price' type='number' min='0' step='0.01' defaultValue='0' /> </div> </div> <div className='grid grid-cols-2 gap-3'> <div className='space-y-2'> <Label htmlFor='current_stock'>Current Stock</Label> <Input id='current_stock' name='current_stock' type='number' min='0' defaultValue='0' /> </div> <div className='space-y-2'> <Label htmlFor='minimum_stock'>Min Stock</Label> <Input id='minimum_stock' name='minimum_stock' type='number' min='0' defaultValue='0' /> </div> </div> <div className='space-y-2'> <Label htmlFor='location'>Location</Label> <Input id='location' name='location' /> </div> <div className='space-y-2'> <Label htmlFor='remarks'>Remarks</Label> <Input id='remarks' name='remarks' /> </div> <DialogFooter> <Button type='submit'>Save Product</Button> </DialogFooter> </form> </DialogContent> </Dialog> </div> </div> <div className='relative'> <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' /> <Input placeholder='Search products...' className='pl-9' value={search} onChange={e => { setSearch(e.target.value);
if (e.target.value.length > 2 || e.target.value === '') { loadProducts() } }} /> </div> {loading ? ( <div className='space-y-3'> {Array.from({ length: 5 }).map((_, i) => ( <Skeleton key={i} className='h-24 w-full' /> ))} </div> ) : filteredProducts.length === 0 ? ( <Card className='border-0 shadow-sm'> <CardContent className='p-8 text-center text-muted-foreground'>No products found</CardContent> </Card> ) : ( <div className='space-y-3'> {filteredProducts.map(product => { const isLow = product.current_stock <= product.minimum_stock const isOut = product.current_stock === 0
return ( <Card key={product.id} className='border-0 shadow-sm'> <CardContent className='p-4'> <div className='flex items-start justify-between gap-3'> <div className='flex-1 min-w-0 space-y-1'> <div className='flex items-center gap-2 flex-wrap'> <span className='font-semibold text-sm'>{product.name}</span> {isOut && <Badge variant='destructive'>Out of Stock</Badge>} {isLow && !isOut && <Badge variant='outline' className='border-amber-300 text-amber-700 bg-amber-50'>Low Stock</Badge>} </div> <p className='text-xs text-muted-foreground'>{product.category || 'Uncategorized'} · {product.sku || 'No SKU'}</p> <div className='flex items-center gap-3 text-xs pt-1'> <span>Stock: <span className={isOut ? 'text-red-600 font-medium' : isLow ? 'text-amber-600 font-medium' : ''}>{product.current_stock}</span></span> <span>Min: {product.minimum_stock}</span> <span>Buy: ₹{product.purchase_price}</span> <span>Sell: ₹{product.selling_price}</span> </div> </div> <div className='flex items-center gap-1 shrink-0'> <Button variant='ghost' size='icon' className='h-8 w-8' onClick={() => router.push(`/products/${product.id}`)}> <Eye className='w-4 h-4' /> </Button> <Button variant='ghost' size='icon' className='h-8 w-8 text-red-600' onClick={() => handleDelete(product.id)}> <Trash2 className='w-4 h-4' /> </Button> </div> </div> </CardContent> </Card> ) })} </div> )} </div> ) }