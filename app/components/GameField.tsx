"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarcodeIcon as Jar } from "lucide-react"

interface GameFieldProps {
  onCollectCoin: () => void
  spawnRate: number
  maxCoins: number
}

interface Coin {
  id: number
  x: number
  y: number
}

export default function GameField({ onCollectCoin, spawnRate, maxCoins }: GameFieldProps) {
  const [coins, setCoins] = useState<Coin[]>([])
  const [isCollecting, setIsCollecting] = useState(false)
  const gameFieldRef = useRef<HTMLDivElement>(null)
  const lastSpawnTimeRef = useRef(Date.now())
  const collectingPositionRef = useRef<{ x: number; y: number } | null>(null)

  const spawnCoin = useCallback(() => {
    if (coins.length < maxCoins) {
      const newCoin: Coin = {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
      }
      setCoins((prevCoins) => [...prevCoins, newCoin])
    }
  }, [coins.length, maxCoins])

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      const now = Date.now()
      if (now - lastSpawnTimeRef.current >= spawnRate) {
        spawnCoin()
        lastSpawnTimeRef.current = now
      }
    }, 50)

    return () => clearInterval(spawnInterval)
  }, [spawnRate, spawnCoin])

  const collectCoins = useCallback(
    (x: number, y: number) => {
      const collectRadius = 50
      setCoins((prevCoins) => {
        const remainingCoins = prevCoins.filter((coin) => {
          const coinElement = document.getElementById(`coin-${coin.id}`)
          if (coinElement) {
            const rect = coinElement.getBoundingClientRect()
            const distance = Math.sqrt(
              Math.pow(x - (rect.left + rect.width / 2), 2) + Math.pow(y - (rect.top + rect.height / 2), 2),
            )
            if (distance <= collectRadius) {
              onCollectCoin()
              return false
            }
          }
          return true
        })
        return remainingCoins
      })
    },
    [onCollectCoin],
  )

  const handleStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault()
      setIsCollecting(true)
      if ("touches" in e) {
        const touch = e.touches[0]
        collectingPositionRef.current = { x: touch.clientX, y: touch.clientY }
        collectCoins(touch.clientX, touch.clientY)
      } else {
        collectingPositionRef.current = { x: e.clientX, y: e.clientY }
        collectCoins(e.clientX, e.clientY)
      }
    },
    [collectCoins],
  )

  const handleMove = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault()
      if (isCollecting) {
        if ("touches" in e) {
          const touch = e.touches[0]
          collectingPositionRef.current = { x: touch.clientX, y: touch.clientY }
          collectCoins(touch.clientX, touch.clientY)
        } else {
          collectingPositionRef.current = { x: e.clientX, y: e.clientY }
          collectCoins(e.clientX, e.clientY)
        }
      }
    },
    [isCollecting, collectCoins],
  )

  const handleEnd = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    setIsCollecting(false)
    collectingPositionRef.current = null
  }, [])

  return (
    <div
      ref={gameFieldRef}
      className="w-full h-[60vh] bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg shadow-inner overflow-hidden relative touch-none select-none"
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <AnimatePresence>
        {coins.map((coin) => (
          <motion.div
            key={coin.id}
            id={`coin-${coin.id}`}
            className="absolute w-16 h-16 flex items-center justify-center"
            style={{ left: `${coin.x}%`, top: `${coin.y}%` }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Jar className="w-12 h-12 text-yellow-500 drop-shadow-lg" />
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-yellow-800 text-center bg-white/70 px-4 py-2 rounded-full shadow-md">
        Проведите пальцем по банкам, чтобы собрать их!
      </div>
    </div>
  )
}

