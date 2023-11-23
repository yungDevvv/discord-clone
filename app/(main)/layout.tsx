import NavigationSideBar from '@/components/navigations/main/navigation-main-sidebar'

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-[72px z-30 flex-col fixed inset-y-0">
                <NavigationSideBar />
            </div>
            <main className="md:pl-[72px] h-full">
                {children}
            </main>
        </div>
    )
}
