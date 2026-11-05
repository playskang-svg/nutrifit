import { HubView, hubMetadata } from '@/components/HubView'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export const generateMetadata = async ({ params }: Props) => hubMetadata('body', (await params).slug)

export default async function BodyHubPage({ params }: Props) {
  return <HubView kind="body" slug={(await params).slug} />
}
