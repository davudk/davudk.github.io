
export function Navigation() {
    return (
        <header className="flex items-center mt-2 mb-4">

            <a className="text-2xl hover:underline underline-offset-2 decoration-[1.5px]" href="/">
                {process.env.siteName}
            </a>

            {/* <div className="grow"></div>

            <button className="group hidden sm:block text-slate-600 hover:text-current">
                <span className="group-hover:underline">Search</span>
                &nbsp;&#x1F50D;
            </button>

            <button className="text-2xl sm:hidden">&#x1F50D;</button> */}
        </header>
    )
}