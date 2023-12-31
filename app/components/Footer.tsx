
export function Footer() {
    return (
        <footer className="max-w-2xl mx-auto mt-2 py-2">
            <div className="sm:text-center opacity-80">
                {process.env.siteName} &copy; 2023. All rights reserved.
            </div>
        </footer>
    )
}