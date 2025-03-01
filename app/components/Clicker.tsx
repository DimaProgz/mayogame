import { BarcodeIcon as Jar } from "lucide-react"

interface ClickerProps {
  mayo: number
  addMayo: (amount: number) => void
  clickPower: number
  autoClickPower: number
  mayoMultiplier: number
}

export default function Clicker({ mayo, addMayo, clickPower, autoClickPower, mayoMultiplier }: ClickerProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-2xl mb-4 text-yellow-900">Майонез: {mayo.toFixed(0)}</div>
      <button
        onClick={() => addMayo(1)}
        className="transition-transform active:scale-95 mb-8 p-8 bg-yellow-200 rounded-full shadow-lg hover:bg-yellow-300"
      >
        <Jar size={150} className="text-yellow-500 hover:text-yellow-600" />
      </button>
      <div className="text-lg text-yellow-800">Сила клика: {clickPower}</div>
      <div className="text-lg text-yellow-800">Авто-клики: {autoClickPower}/сек</div>
      <div className="text-lg text-yellow-800">Множитель майонеза: x{mayoMultiplier.toFixed(1)}</div>
    </div>
  )
}

