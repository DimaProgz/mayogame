"use client"

import { useState, useEffect, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GameField from "./components/GameField"
import Shop from "./components/Shop"
import Profile from "./components/Profile"
import Withdraw from "./components/Withdraw"
import Upgrades from "./components/Upgrades"
import AdminPanel from "./components/AdminPanel"
import { syncDataWithTelegram, getDataFromTelegram, initTelegramApp, type GameData } from "../utils/telegramApi"
import { Card, CardContent } from "@/components/ui/card"

export default function MayonnaiseGame() {
  const [mayo, setMayo] = useState(0)
  const [farts, setFarts] = useState(0)
  const [megaPencilCoins, setMegaPencilCoins] = useState(0)
  const [luckyChance, setLuckyChance] = useState(0.5)
  const [fartEfficiency, setFartEfficiency] = useState(1)
  const [mayoMultiplier, setMayoMultiplier] = useState(1)
  const [goldenJarChance, setGoldenJarChance] = useState(0.01)
  const [megaPencilCoinBoost, setMegaPencilCoinBoost] = useState(1)
  const [fartCost, setFartCost] = useState(100)
  const [spawnRate, setSpawnRate] = useState(500)
  const [maxCoins, setMaxCoins] = useState(30)
  const [userId, setUserId] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const { userId, isAdmin } = initTelegramApp()
    setUserId(userId)
    setIsAdmin(isAdmin)

    const loadData = async () => {
      if (userId) {
        const savedData = await getDataFromTelegram(userId)
        if (savedData) {
          setMayo(savedData.mayo)
          setFarts(savedData.farts)
          setMegaPencilCoins(savedData.megaPencilCoins)
          setLuckyChance(savedData.luckyChance)
          setFartEfficiency(savedData.fartEfficiency)
          setMayoMultiplier(savedData.mayoMultiplier)
          setGoldenJarChance(savedData.goldenJarChance)
          setMegaPencilCoinBoost(savedData.megaPencilCoinBoost)
          setFartCost(savedData.fartCost)
          setSpawnRate(savedData.spawnRate)
          setMaxCoins(savedData.maxCoins)
        }
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (userId) {
      const saveData = async () => {
        const gameData: GameData = {
          mayo,
          farts,
          megaPencilCoins,
          luckyChance,
          fartEfficiency,
          mayoMultiplier,
          goldenJarChance,
          megaPencilCoinBoost,
          fartCost,
          spawnRate,
          maxCoins,
        }
        await syncDataWithTelegram(userId, gameData)
      }

      saveData()
    }
  }, [
    userId,
    mayo,
    farts,
    megaPencilCoins,
    luckyChance,
    fartEfficiency,
    mayoMultiplier,
    goldenJarChance,
    megaPencilCoinBoost,
    fartCost,
    spawnRate,
    maxCoins,
  ])

  const collectCoin = useCallback(() => {
    const bonus = Math.random() < goldenJarChance ? 10 : 1
    setMayo((prev) => prev + 1 * mayoMultiplier * bonus)
  }, [mayoMultiplier, goldenJarChance])

  const buyFart = useCallback(() => {
    if (mayo >= fartCost) {
      setMayo((prev) => prev - fartCost)
      if (Math.random() < luckyChance) {
        setMegaPencilCoins((prev) => prev + fartEfficiency * megaPencilCoinBoost)
      }
    }
  }, [mayo, fartCost, luckyChance, fartEfficiency, megaPencilCoinBoost])

  const increaseFartCost = useCallback(() => {
    setFartCost((prev) => prev + 40)
  }, [])

  const upgrades = {
    upgradeLuckyChance: useCallback(() => {
      if (megaPencilCoins >= 15 && luckyChance < 0.9) {
        setMegaPencilCoins((prev) => prev - 15)
        setLuckyChance((prev) => Math.min(prev + 0.05, 0.9))
        increaseFartCost()
        return true
      }
      return false
    }, [megaPencilCoins, luckyChance, increaseFartCost]),
    upgradeFartEfficiency: useCallback(() => {
      if (megaPencilCoins >= 20) {
        setMegaPencilCoins((prev) => prev - 20)
        setFartEfficiency((prev) => prev + 1)
        increaseFartCost()
        return true
      }
      return false
    }, [megaPencilCoins, increaseFartCost]),
    upgradeMayoMultiplier: useCallback(() => {
      if (megaPencilCoins >= 25) {
        setMegaPencilCoins((prev) => prev - 25)
        setMayoMultiplier((prev) => prev + 0.1)
        increaseFartCost()
        return true
      }
      return false
    }, [megaPencilCoins, increaseFartCost]),
    upgradeGoldenJarChance: useCallback(() => {
      if (megaPencilCoins >= 30 && goldenJarChance < 0.1) {
        setMegaPencilCoins((prev) => prev - 30)
        setGoldenJarChance((prev) => Math.min(prev + 0.01, 0.1))
        increaseFartCost()
        return true
      }
      return false
    }, [megaPencilCoins, goldenJarChance, increaseFartCost]),
    upgradeMegaPencilCoinBoost: useCallback(() => {
      if (megaPencilCoins >= 35) {
        setMegaPencilCoins((prev) => prev - 35)
        setMegaPencilCoinBoost((prev) => prev + 0.1)
        increaseFartCost()
        return true
      }
      return false
    }, [megaPencilCoins, increaseFartCost]),
    buyFartPack: useCallback(() => {
      if (megaPencilCoins >= 40) {
        setMegaPencilCoins((prev) => prev - 40)
        setFarts((prev) => prev + 10)
        increaseFartCost()
        return true
      }
      return false
    }, [megaPencilCoins, increaseFartCost]),
    buyMayoBoost: useCallback(() => {
      if (megaPencilCoins >= 45) {
        setMegaPencilCoins((prev) => prev - 45)
        setMayo((prev) => prev + 10000)
        increaseFartCost()
        return true
      }
      return false
    }, [megaPencilCoins, increaseFartCost]),
    buyLuckyCharm: useCallback(() => {
      if (megaPencilCoins >= 50) {
        setMegaPencilCoins((prev) => prev - 50)
        setLuckyChance((prev) => Math.min(prev + 0.1, 0.9))
        setGoldenJarChance((prev) => Math.min(prev + 0.02, 0.1))
        increaseFartCost()
        return true
      }
      return false
    }, [megaPencilCoins, increaseFartCost]),
    upgradeSpawnRate: useCallback(() => {
      if (megaPencilCoins >= 55) {
        setMegaPencilCoins((prev) => prev - 55)
        setSpawnRate((prev) => Math.max(prev * 0.9, 100)) // Increase spawn rate by 10%, min 100ms
        increaseFartCost()
        return true
      }
      return false
    }, [megaPencilCoins, increaseFartCost]),
    upgradeMaxCoins: useCallback(() => {
      if (megaPencilCoins >= 60) {
        setMegaPencilCoins((prev) => prev - 60)
        setMaxCoins((prev) => prev + 5) // Increase max coins by 5
        increaseFartCost()
        return true
      }
      return false
    }, [megaPencilCoins, increaseFartCost]),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 p-4">
      <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl">
        <CardContent className="p-6">
          <h1 className="text-4xl font-bold mb-8 text-yellow-800 text-center">Mayonnaise Coin Collector</h1>
          <Tabs defaultValue="game" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-2">
              <TabsTrigger value="game">Игра</TabsTrigger>
              <TabsTrigger value="shop">Магазин</TabsTrigger>
              <TabsTrigger value="profile">Профиль</TabsTrigger>
              <TabsTrigger value="upgrades">Улучшения</TabsTrigger>
              <TabsTrigger value="withdraw">Вывод</TabsTrigger>
              {isAdmin && <TabsTrigger value="admin">Админ</TabsTrigger>}
            </TabsList>
            <TabsContent value="game">
              <GameField onCollectCoin={collectCoin} spawnRate={spawnRate} maxCoins={maxCoins} />
            </TabsContent>
            <TabsContent value="shop">
              <Shop mayo={mayo} buyFart={buyFart} fartCost={fartCost} />
            </TabsContent>
            <TabsContent value="profile">
              <Profile
                mayo={mayo}
                farts={farts}
                megaPencilCoins={megaPencilCoins}
                luckyChance={luckyChance}
                fartEfficiency={fartEfficiency}
              />
            </TabsContent>
            <TabsContent value="upgrades">
              <Upgrades
                megaPencilCoins={megaPencilCoins}
                upgrades={upgrades}
                luckyChance={luckyChance}
                fartEfficiency={fartEfficiency}
                mayoMultiplier={mayoMultiplier}
                goldenJarChance={goldenJarChance}
                megaPencilCoinBoost={megaPencilCoinBoost}
                spawnRate={spawnRate}
                maxCoins={maxCoins}
              />
            </TabsContent>
            <TabsContent value="withdraw">
              <Withdraw />
            </TabsContent>
            {isAdmin && (
              <TabsContent value="admin">
                <AdminPanel
                  setMayo={setMayo}
                  setMegaPencilCoins={setMegaPencilCoins}
                  mayo={mayo}
                  megaPencilCoins={megaPencilCoins}
                />
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

