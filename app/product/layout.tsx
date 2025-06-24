import Topbar from "../ui/topbar";


export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="w-full flex flex-col items-center bg-sym-light dark:bg-black">

            <Topbar />

            <>
                {children}
            </>
        </div>
    )
}