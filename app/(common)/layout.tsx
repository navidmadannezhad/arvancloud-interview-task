export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen flex flex-col bg-secondary-main flex items-center justify-center">
        {children}
    </section>
  );
} 
