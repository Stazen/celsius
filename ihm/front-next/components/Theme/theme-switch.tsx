'use client'

import { FiSun, FiMoon } from "react-icons/fi"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import classNames from "classnames"

export default function ThemeSwitch({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return (
    <></>
  )

  if (resolvedTheme === 'dark') {
    return (
      <FiSun onClick={() => setTheme('light')} color="white" fontSize="1.5em" className={classNames("ml-6 cursor-pointer", className)} />
    )
  }

  if (resolvedTheme === 'light') {
    return (
      <FiMoon onClick={() => setTheme('dark')} color="black" fontSize="1.5em" className={classNames("ml-6 cursor-pointer", className)}/>
    )
  }

}