import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sparkles,
  Zap,
  Scale,
  Coins,
  TrendingUp,
  Package,
  Sandwich,
  Clover,
  ZapIcon as ZapFast,
  Maximize,
} from "lucide-react"

interface UpgradesProps {
  megaPencilCoins: number
  upgrades: {
    upgradeLuckyChance: () => boolean
    upgradeFartEfficiency: () => boolean
    upgradeMayoMultiplier: () => boolean
    upgradeGoldenJarChance: () => boolean
    upgradeMegaPencilCoinBoost: () => boolean
    buyFartPack: () => boolean
    buyMayoBoost: () => boolean
    buyLuckyCharm: () => boolean
    upgradeSpawnRate: () => boolean
    upgradeMaxCoins: () => boolean
  }
  luckyChance: number
  fartEfficiency: number
  mayoMultiplier: number
  goldenJarChance: number
  megaPencilCoinBoost: number
  spawnRate: number
  maxCoins: number
}

export default function Upgrades({
  megaPencilCoins,
  upgrades,
  luckyChance,
  fartEfficiency,
  mayoMultiplier,
  goldenJarChance,
  megaPencilCoinBoost,
  spawnRate,
  maxCoins,
}: UpgradesProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-yellow-800">Улучшения</CardTitle>
        <CardDescription>Улучшайте свою игру и увеличивайте доходы</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-yellow-900 text-lg font-semibold">MegaPencilCoins: {megaPencilCoins}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UpgradeButton
            onClick={upgrades.upgradeLuckyChance}
            disabled={megaPencilCoins < 5 || luckyChance >= 0.9}
            icon={<Sparkles className="mr-2 h-5 w-5" />}
            title="Улучшить шанс удачи"
            cost={5}
            current={`${(luckyChance * 100).toFixed(1)}%`}
          />
          <UpgradeButton
            onClick={upgrades.upgradeFartEfficiency}
            disabled={megaPencilCoins < 7}
            icon={<Zap className="mr-2 h-5 w-5" />}
            title="Улучшить эффективность пердежа"
            cost={7}
            current={fartEfficiency.toString()}
          />
          <UpgradeButton
            onClick={upgrades.upgradeMayoMultiplier}
            disabled={megaPencilCoins < 10}
            icon={<Scale className="mr-2 h-5 w-5" />}
            title="Улучшить множитель майонеза"
            cost={10}
            current={`x${mayoMultiplier.toFixed(1)}`}
          />
          <UpgradeButton
            onClick={upgrades.upgradeGoldenJarChance}
            disabled={megaPencilCoins < 12 || goldenJarChance >= 0.1}
            icon={<Coins className="mr-2 h-5 w-5" />}
            title="Улучшить шанс золотой монеты"
            cost={12}
            current={`${(goldenJarChance * 100).toFixed(1)}%`}
          />
          <UpgradeButton
            onClick={upgrades.upgradeMegaPencilCoinBoost}
            disabled={megaPencilCoins < 15}
            icon={<TrendingUp className="mr-2 h-5 w-5" />}
            title="Улучшить бонус MPC"
            cost={15}
            current={`x${megaPencilCoinBoost.toFixed(1)}`}
          />
          <UpgradeButton
            onClick={upgrades.buyFartPack}
            disabled={megaPencilCoins < 20}
            icon={<Package className="mr-2 h-5 w-5" />}
            title="Купить пак пердежей"
            cost={20}
            current="+10 пердежей"
          />
          <UpgradeButton
            onClick={upgrades.buyMayoBoost}
            disabled={megaPencilCoins < 25}
            icon={<Sandwich className="mr-2 h-5 w-5" />}
            title="Купить буст майонеза"
            cost={25}
            current="+10,000 майонеза"
          />
          <UpgradeButton
            onClick={upgrades.buyLuckyCharm}
            disabled={megaPencilCoins < 30}
            icon={<Clover className="mr-2 h-5 w-5" />}
            title="Купить счастливый талисман"
            cost={30}
            current="+10% удачи, +2% золотой монеты"
          />
          <UpgradeButton
            onClick={upgrades.upgradeSpawnRate}
            disabled={megaPencilCoins < 35}
            icon={<ZapFast className="mr-2 h-5 w-5" />}
            title="Ускорить появление монет"
            cost={35}
            current={`${(1000 / spawnRate).toFixed(1)} монет/сек`}
          />
          <UpgradeButton
            onClick={upgrades.upgradeMaxCoins}
            disabled={megaPencilCoins < 40}
            icon={<Maximize className="mr-2 h-5 w-5" />}
            title="Увеличить лимит монет"
            cost={40}
            current={maxCoins.toString()}
          />
        </div>
      </CardContent>
    </Card>
  )
}

interface UpgradeButtonProps {
  onClick: () => boolean
  disabled: boolean
  icon: React.ReactNode
  title: string
  cost: number
  current: string
}

function UpgradeButton({ onClick, disabled, icon, title, cost, current }: UpgradeButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {icon}
      <div className="flex flex-col items-start ml-2">
        <span>
          {title} ({cost} MPC)
        </span>
        <span className="text-xs">Текущий: {current}</span>
      </div>
    </Button>
  )
}

