
export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="w-full min-h-screen flex flex-col items-center">

            <div className="w-full">
                {children}
            </div>
        </div>
    )
}