import { createEffect, createSignal, onMount } from 'solid-js'
import QRCode from 'qrcode/lib/browser'
const defaultLink = 'https://qr.angelo.fyi'

const updateQr = (canvas: HTMLCanvasElement, text: string) => {
  QRCode.toCanvas(canvas, text, (error) => {
    if (error) console.error(error)
  })
}

export default function Home() {
  let qrCanvas
  const [text, setText] = createSignal(defaultLink)

  onMount(() => {
    updateQr(qrCanvas, text())
  })

  createEffect(() => {
    updateQr(qrCanvas, text())
  })

  return (
    <>
      <main class='mx-auto p-4 text-center text-gray-700'>
        <h1 class='max-6-xs my-16 text-6xl font-thin uppercase text-sky-700'>QR Code Tool</h1>

        {/* Main content below */}

        <div class='flex flex-col items-center'>
          <textarea
            autofocus
            class='rounded p-2 outline outline-1 outline-gray-300'
            placeholder='Type something here!'
            oninput={(e) => {
              setText(e.currentTarget.value == '' ? defaultLink : e.currentTarget.value)
            }}
          />
          <canvas ref={qrCanvas} class='my-2'></canvas>
        </div>

        {/* Footer */}
      </main>
      <footer class='mx-auto p-4 text-center text-gray-700'>
        Created by{' '}
        <a href='https://angeloanan.xyz' class='text-sky-700 underline'>
          Angelo
        </a>{' '}
        at 4 AM 💀
      </footer>
    </>
  )
}
