import Topbar from "@/app/ui/topbar"
import Hero from "./components/hero"

//export const experimental_ppr = true

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full min-h-screen flex flex-col items-center bg-black">

            <Topbar />
            <section className="w-[1440px]">
                <Hero />
            </section>

            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
            </div>
        </div>
    )
}