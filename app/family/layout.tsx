export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="bg-background/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-2">
                    <h1 className="text-2xl font-bold">Health Management Application</h1>
                </div>
            </header>
            <main className="flex-1">
                <div className="container mx-auto px-4 py-6">
                    {children}
                </div>
            </main>
        </div>
    );
}