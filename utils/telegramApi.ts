import WebApp from "@twa-dev/sdk"

export interface GameData {
  mayo: number
  farts: number
  megaPencilCoins: number
  luckyChance: number
  fartEfficiency: number
  mayoMultiplier: number
  goldenJarChance: number
  megaPencilCoinBoost: number
  fartCost: number
  spawnRate: number
  maxCoins: number
}

// Simulated server-side storage
const serverStorage: { [key: string]: GameData } = {}

export async function syncDataWithTelegram(userId: string, gameData: GameData): Promise<void> {
  console.log(`Синхронизация данных для пользователя ${userId}:`, gameData)
  // In a real application, you would send this data to your server
  // For now, we'll just store it in our simulated server storage
  serverStorage[userId] = gameData
}

export async function getDataFromTelegram(userId: string): Promise<GameData | null> {
  console.log(`Получение данных для пользователя ${userId}`)
  // In a real application, you would fetch this data from your server
  // For now, we'll just retrieve it from our simulated server storage
  return serverStorage[userId] || null
}

export function initTelegramApp(): { userId: string | null; isAdmin: boolean } {
  WebApp.ready()
  const user = WebApp.initDataUnsafe.user
  const userId = user ? user.id.toString() : null
  const isAdmin = userId === "7371022568" || userId === "5151739993" || userId === "6357406717"
  return { userId, isAdmin }
}

