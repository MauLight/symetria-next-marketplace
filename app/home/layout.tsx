import Topbar from "@/app/ui/topbar"
import ThemeSwitch from "../components/theme-switch"

export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-sym-light dark:bg-black pb-20">

            <Topbar />

            <div className="">
                {children}
            </div>

            <div className="w-full fixed bottom-0 flex justify-center">
                <div className="w-full max-w-[1440px] h-[60px] flex justify-end items-center">
                    <ThemeSwitch />
                </div>
            </div>

        </div>
    )
}