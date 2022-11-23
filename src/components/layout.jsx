// components/layout.js

import Navbar from './navbar'
import Footer from './footer'
import { useEffect, useState } from 'react'

export default function Layout({ children }) {
//console.log(pagesProps);
  const [page, setPage] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8000/api/pages')
      .then((res) => res.json())
      .then((page) => {
        setPage(page)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!page) return <p>No profile data</p>
  return (
    <>
      <Navbar pages={page} />
        <main>{children}</main>
      <Footer />
    </>
  )
}

