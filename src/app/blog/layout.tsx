
export const metadata = {
  title: 'Blog',
  description: 'Blog lists',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
