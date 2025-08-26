'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Item = { id: number; name: string; image: string; price: number }

export default function MarketplacePage() {
  const [items, setItems] = useState<Item[]>([])
  const [form, setForm] = useState({ name: '', image: '', price: '' })

  const fetchItems = async () => {
    const res = await fetch('/api/marketplace')
    setItems(await res.json())
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const postItem = async () => {
    const price = parseFloat(form.price)
    if (!form.name || !form.image || isNaN(price)) return
    const res = await fetch('/api/marketplace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price }),
    })
    if (res.ok) {
      setForm({ name: '', image: '', price: '' })
      fetchItems()
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Marketplace</h1>
      <div className="flex gap-2">
        <Input
          placeholder="Item name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <Button onClick={postItem}>Post</Button>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-4 border p-2 rounded">
            <Image src={item.image} alt={item.name} width={40} height={40} className="rounded" />
            <span className="flex-1">{item.name}</span>
            <span>{item.price}g</span>
          </li>
        ))}
      </ul>
    </div>
  )
}