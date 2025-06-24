import Topbar from "@/app/ui/topbar"
import ThemeSwitch from "../components/theme-switch"

export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-sym-light dark:bg-black pb-20">

            <Topbar />

            <div className="pt-[65px]">
                {children}
            </div>

            <div className="w-full fixed z-50 bottom-0 flex justify-center bg-sym-light dark:bg-black border-t border-sym-border-light dark:border-sym-border">
                <div className="w-full max-w-[1440px] h-[45px] flex justify-end items-center">
                    <ThemeSwitch />
                </div>
            </div>

        </div>
    )
}