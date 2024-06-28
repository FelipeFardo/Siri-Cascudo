import { auth } from '@siricascudo/auth'

import { Header } from '@/components/header'

export default async function Projects() {
  const session = await auth()

  return (
    <div className="space-y-4 py-4">
      <Header />
      <main className="mx-auto w-full max-w-[1200px]">Projects</main>
      <p>{JSON.stringify(session, null, 2)}</p>
      <h1>{session?.orgSlug}</h1>
    </div>
  )
}
