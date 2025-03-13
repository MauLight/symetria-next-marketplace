import Topbar from "@/app/ui/topbar"

//export const experimental_ppr = true

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full min-h-screen">

            <Topbar />

            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
            </div>
        </div>
    )
}