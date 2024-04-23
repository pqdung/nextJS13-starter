
import type { Metadata, ResolvingMetadata } from 'next'
import slugify from 'slugify';

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const tempId1 = params?.slug?.split('.html') ?? [];
  const tempId2 = tempId1[0]?.split('-') ?? [];
  const id = tempId2[tempId2.length - 1];

  // fetch data
  const response = await fetch(`http://localhost:8000/blogs/${id}`);
  const data = await response.json();

  return {
    title: data.title,
    description: data.content,
    openGraph: {
      title: data.title,
      description: data.content,
      type: 'website',
      images: data.img
    }
  }
}

export default function ViewDetailLayout({
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
