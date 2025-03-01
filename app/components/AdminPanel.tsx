"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sandwich, Pencil } from "lucide-react"

interface AdminPanelProps {
  setMayo: (value: number | ((prevValue: number) => number)) => void
  setMegaPencilCoins: (value: number | ((prevValue: number) => number)) => void
  mayo: number
  megaPencilCoins: number
}

export default function AdminPanel({ setMayo, setMegaPencilCoins, mayo, megaPencilCoins }: AdminPanelProps) {
  const [mayoAmount, setMayoAmount] = useState("")
  const [mpcAmount, setMpcAmount] = useState("")

  const handleAddMayo = () => {
    const amount = Number.parseInt(mayoAmount)
    if (!isNaN(amount)) {
      setMayo((prev) => prev + amount)
      setMayoAmount("")
    }
  }

  const handleAddMPC = () => {
    const amount = Number.parseInt(mpcAmount)
    if (!isNaN(amount)) {
      setMegaPencilCoins((prev) => prev + amount)
      setMpcAmount("")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-yellow-800">Админ-панель</CardTitle>
        <CardDescription>Управление ресурсами игроков</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Sandwich className="mr-2" /> Добавить Майонез
          </h3>
          <div className="flex space-x-2">
            <Input
              type="number"
              value={mayoAmount}
              onChange={(e) => setMayoAmount(e.target.value)}
              placeholder="Количество"
              className="w-full"
            />
            <Button onClick={handleAddMayo} className="bg-yellow-500 hover:bg-yellow-600">
              Добавить
            </Button>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Pencil className="mr-2" /> Добавить MegaPencilCoins
          </h3>
          <div className="flex space-x-2">
            <Input
              type="number"
              value={mpcAmount}
              onChange={(e) => setMpcAmount(e.target.value)}
              placeholder="Количество"
              className="w-full"
            />
            <Button onClick={handleAddMPC} className="bg-blue-500 hover:bg-blue-600">
              Добавить
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full text-center">
          <p className="text-sm text-yellow-700">
            Текущий баланс: {mayo} Майонеза, {megaPencilCoins} MPC
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}

