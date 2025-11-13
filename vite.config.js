import { defineConfig } from 'vite'
import { resolve } from 'path'
import { cpSync, existsSync } from 'fs'

export default defineConfig ({
  
  base: '/Proyecto-ProcImg/',
  build: {
    outDir: 'dist',
  },
  plugins: [
    {
      name: 'copy-nft-folder',
      closeBundle() {
        const src = resolve(__dirname, 'public/nft')
        const dest = resolve(__dirname, 'dist/nft')
        if (existsSync(src)) {
          cpSync(src, dest, { recursive: true })
          console.log('✅ Carpeta NFT copiada a dist/nft')
        } else {
          console.warn('⚠️ No se encontró carpeta /public/nft')
        }
      },
    },
  ],
  /* root: './src',
  server: {
    port: 3000
  } */
})