'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type Mod = { id: number; name: string; description: string; rating: number }

export default function ModsPage() {
  const [mods, setMods] = useState<Mod[]>([])
  const [form, setForm] = useState({ name: '', description: '' })

  const fetchMods = async () => {
    const res = await fetch('/api/mods')
    setMods(await res.json())
  }

  useEffect(() => {
    fetchMods()
  }, [])

  const addMod = async () => {
    if (!form.name || !form.description) return
    const res = await fetch('/api/mods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setForm({ name: '', description: '' })
      fetchMods()
    }
  }

  const rate = async (id: number) => {
    const res = await fetch('/api/mods', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) fetchMods()
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Mod & Skin Library</h1>
      <div className="space-y-2">
        <Input
          placeholder="Mod name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Button onClick={addMod}>Add</Button>
      </div>
      <ul className="space-y-2">
        {mods.map((mod) => (
          <li key={mod.id} className="border p-2 rounded">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{mod.name}</div>
                <p className="text-sm">{mod.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span>{mod.rating}</span>
                <Button size="sm" onClick={() => rate(mod.id)}>
                  +1
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
