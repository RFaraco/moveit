
import '../styles/global.css'
import React, { useState } from 'react'

function MyApp({ Component, pageProps }) {
  /* aqui fica o conteudo que se repete em todas as páginas */

 

  return (
    
      <Component {...pageProps} />
  )  
}

export default MyApp
