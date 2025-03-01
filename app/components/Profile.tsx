import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sandwich, Wind, Pencil, Sparkles, Zap } from "lucide-react"

interface ProfileProps {
  mayo: number
  farts: number
  megaPencilCoins: number
  luckyChance: number
  fartEfficiency: number
}

export default function Profile({ mayo, farts, megaPencilCoins, luckyChance, fartEfficiency }: ProfileProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-yellow-800">Профиль игрока</CardTitle>
        <CardDescription>Ваши текущие показатели</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center text-yellow-900">
            <Sandwich className="mr-2" /> Майонез:
          </span>
          <span className="font-semibold">{mayo.toFixed(0)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center text-yellow-900">
            <Wind className="mr-2" /> Пердежи:
          </span>
          <span className="font-semibold">{farts}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center text-yellow-900">
            <Pencil className="mr-2" /> MegaPencilCoins:
          </span>
          <span className="font-semibold">{megaPencilCoins}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center text-yellow-900">
            <Sparkles className="mr-2" /> Шанс удачи:
          </span>
          <span className="font-semibold">{(luckyChance * 100).toFixed(1)}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center text-yellow-900">
            <Zap className="mr-2" /> Эффективность пердежа:
          </span>
          <span className="font-semibold">{fartEfficiency}</span>
        </div>
      </CardContent>
    </Card>
  )
}

