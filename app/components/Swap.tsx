"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SwapProps {
  onSwap: (amount: number) => void
}

export default function Swap({ onSwap }: SwapProps) {
  const [amount, setAmount] = useState("")

  const handleSwap = () => {
    const swapAmount = Number.parseFloat(amount)
    if (!isNaN(swapAmount) && swapAmount > 0) {
      onSwap(swapAmount)
      setAmount("")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 text-yellow-800">Swap-to-Earn</h2>
      <div className="flex items-center space-x-2 mb-4">
        <Input
          type="number"
          placeholder="Сумма для свапа"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-40"
        />
        <Button onClick={handleSwap}>Своп</Button>
      </div>
      <p className="text-sm text-yellow-700 text-center">Свапайте токены и получайте Майонез!</p>
    </div>
  )
}

