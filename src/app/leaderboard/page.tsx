'use client'

import { useEffect, useState } from 'react'

type Player = { id: number; name: string; score: number; badges: string[] }

export default function LeaderboardPage() {
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then(setPlayers)
  }, [])

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <ul className="space-y-2">
        {players.map((p) => (
          <li key={p.id} className="flex justify-between border p-2 rounded">
            <div>
              <div className="font-semibold">{p.name}</div>
              {p.badges.length > 0 && (
                <div className="text-xs text-muted-foreground">{p.badges.join(', ')}</div>
              )}
            </div>
            <span>{p.score}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
