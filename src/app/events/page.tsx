'use client'

import { useEffect, useState } from 'react'

type Event = { id: number; name: string; date: string; description: string }

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then(setEvents)
  }, [])

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Events & Tournament Hub</h1>
      <ul className="space-y-2">
        {events.map((e) => (
          <li key={e.id} className="border p-2 rounded">
            <div className="font-semibold">{e.name}</div>
            <div className="text-sm text-muted-foreground">{e.date}</div>
            <p className="text-sm">{e.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
