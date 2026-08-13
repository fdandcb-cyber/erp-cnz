import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Menu, LayoutDashboard, ShoppingCart, Users, Package, Truck, CreditCard, Wrench, Receipt, RotateCcw, Box, BarChart3, Settings, Search, Store, PackageOpen } from 'lucide-react'
const navItems = [ { href: '/', label: 'Dashboard',
icon: LayoutDashboard }, { href: '/store', label: 'Storefront',
icon: Store }, { href: '/orders', label: 'Orders',
icon: ShoppingCart }, { href: '/customers', label: 'Customers',
icon: Users }, { href: '/inventory', label: 'Inventory',
icon: PackageOpen }, { href: '/products', label: 'Products',
icon: Package }, { href: '/purchase', label: 'Purchase',
icon: Truck }, { href: '/sales', label: 'Sales',
icon: Receipt }, { href: '/payments', label: 'Payments',
icon: CreditCard }, { href: '/services', label: 'Services',
icon: Wrench }, { href: '/expenses', label: 'Expenses',
icon: Receipt }, { href: '/returns', label: 'Returns',
icon: RotateCcw }, { href: '/parcels', label: 'Parcels',
icon: Box }, { href: '/reports', label: 'Reports',
icon: BarChart3 }, { href: '/settings', label: 'Settings',
icon: Settings }, ]
export function Sidebar() { const pathname = usePathname();
return ( <aside className='hidden lg:flex flex-col w-60 h-screen border-r bg-background fixed left-0 top-0 z-40'> <div className='flex items-center gap-2 px-4 h-14 border-b'> <div className='w-8 h-8 rounded-lg bg-primary flex items-center justify-center'> <span className='text-primary-foreground font-bold text-sm'>PB</span> </div> <span className='font-semibold text-sm'>Personal Business</span> </div> <ScrollArea className='flex-1 py-2'> <nav className='px-2 space-y-0.5'> {navItems.map((item) => { const Icon = item.icon const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
return ( <Link key={item.href} href={item.href} className={cn( 'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors', isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground' )} > <Icon className='w-4 h-4 shrink-0' /> {item.label} </Link> ) })} </nav> </ScrollArea> </aside> ) }
export function MobileNav() { const pathname = usePathname();
const [open, setOpen] = useState(false);
return ( <div className='lg:hidden'> <Sheet open={open} onOpenChange={setOpen}> <SheetTrigger asChild> <Button variant='ghost' size='icon' className='fixed top-3 left-3 z-50'> <Menu className='w-5 h-5' /> </Button> </SheetTrigger> <SheetContent side='left' className='w-60 p-0'> <div className='flex items-center gap-2 px-4 h-14 border-b'> <div className='w-8 h-8 rounded-lg bg-primary flex items-center justify-center'> <span className='text-primary-foreground font-bold text-sm'>PB</span> </div> <span className='font-semibold text-sm'>Personal Business</span> </div> <ScrollArea className='h-[calc(100vh-3.5rem)] py-2'> <nav className='px-2 space-y-0.5'> {navItems.map((item) => { const Icon = item.icon const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
return ( <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={cn( 'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors', isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground' )} > <Icon className='w-4 h-4 shrink-0' /> {item.label} </Link> ) })} </nav> </ScrollArea> </SheetContent> </Sheet> </div> ) }
export function BottomNav() { const pathname = usePathname();
const mainItems = [ navItems[0], navItems[1], navItems[2], navItems[3], navItems[4] ] return ( <nav className='lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t'> <div className='flex items-center justify-around h-14'> {mainItems.map((item) => { const Icon = item.icon const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
return ( <Link key={item.href} href={item.href} className={cn( 'flex flex-col items-center justify-center gap-0.5 py-1 px-2 min-w-[60px]', isActive ? 'text-primary' : 'text-muted-foreground' )} > <Icon className='w-5 h-5' /> <span className='text-[10px]'>{item.label}</span> </Link> ) })} <Sheet> <SheetTrigger asChild> <button className='flex flex-col items-center justify-center gap-0.5 py-1 px-2 min-w-[60px] text-muted-foreground'> <Menu className='w-5 h-5' /> <span className='text-[10px]'>More</span> </button> </SheetTrigger> <SheetContent side='bottom' className='h-[60vh]'> <ScrollArea className='h-full py-4'> <div className='grid grid-cols-3 gap-2'> {navItems.map((item) => { const Icon = item.icon const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
return ( <Link key={item.href} href={item.href} className={cn( 'flex flex-col items-center gap-2 p-3 rounded-lg text-sm transition-colors', isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted' )} > <Icon className='w-5 h-5' /> <span>{item.label}</span> </Link> ) })} </div> </ScrollArea> </SheetContent> </Sheet> </div> </nav> ) }