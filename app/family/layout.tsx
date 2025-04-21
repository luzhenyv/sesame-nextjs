export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <main className="flex-1">
                <div className="container mx-auto px-4 py-6">
                    {children}
                </div>
            </main>
        </div>
    );
}