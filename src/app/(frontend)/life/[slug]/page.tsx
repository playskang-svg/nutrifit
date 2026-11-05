import { HubView, hubMetadata } from '@/components/HubView'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export const generateMetadata = async ({ params }: Props) => hubMetadata('life', (await params).slug)

export default async function LifeHubPage({ params }: Props) {
  return <HubView kind="life" slug={(await params).slug} />
}
