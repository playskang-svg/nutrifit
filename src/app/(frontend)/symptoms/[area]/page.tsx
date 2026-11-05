import { HubView, hubMetadata } from '@/components/HubView'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ area: string }> }

export const generateMetadata = async ({ params }: Props) => hubMetadata('area', (await params).area)

export default async function AreaPage({ params }: Props) {
  return <HubView kind="area" slug={(await params).area} />
}
