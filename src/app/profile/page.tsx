'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

type Profile = {
  name: string
  avatar: string
  inventory: { id: number; name: string; image: string }[]
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then(setProfile)
  }, [])

  if (!profile) return <div>Loading...</div>

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="flex items-center gap-4">
        <Image src={profile.avatar} alt={profile.name} width={64} height={64} className="rounded-full" />
        <span className="text-xl">{profile.name}</span>
      </div>
      <h2 className="font-semibold">Inventory</h2>
      <ul className="space-y-2">
        {profile.inventory.map((item) => (
          <li key={item.id} className="flex items-center gap-2 border p-2 rounded">
            <Image src={item.image} alt={item.name} width={32} height={32} className="rounded" />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
