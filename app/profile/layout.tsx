import Topbar from "../ui/topbar";


export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-sym-light dark:bg-black pb-20">

            <Topbar />

            {children}

        </div>
    )
}