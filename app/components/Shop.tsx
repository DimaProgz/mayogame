import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Wind } from "lucide-react"

interface ShopProps {
  mayo: number
  buyFart: () => void
  fartCost: number
}

export default function Shop({ mayo, buyFart, fartCost }: ShopProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-yellow-800">Магазин</CardTitle>
        <CardDescription>Покупайте улучшения для вашей игры</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-yellow-900 text-lg font-semibold">Майонез: {mayo.toFixed(0)}</div>
        <Button
          onClick={buyFart}
          disabled={mayo < fartCost}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <Wind className="mr-2 h-5 w-5" />
          Купить Пердеж (Цена: {fartCost})
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-yellow-700 text-center">
          Покупка пердежа дает шанс получить MegaPencilCoin.
          <br />
          Шанс получить MegaPencilCoin зависит от вашего шанса удачи.
        </p>
      </CardFooter>
    </Card>
  )
}

