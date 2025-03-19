


export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center pb-20">

            {children}

        </div>
    )
}