import test from 'ava'
import createTestServer from 'create-test-server'
import puppeteer from 'puppeteer'
import fs from 'fs'

async function withPage(t, run) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.on('console', message => {
    for (let i = 0; i < message.args().length; i += 1) {
      console.log(`${i}: ${message.args()[i]}`)
    }
  })
  try {
    await run(t, page)
  } finally {
    await page.close()
    await browser.close()
  }
}

function testScript() {
  const file1 = new window.File([], 'test1.txt', {type: 'text/plain'})
  const file2 = new window.File([], 'test2.txt', {type: 'text/plain'})

  const constructor = window.FileList
  const filelist = window.createFileList(file1, [file2])
  const emptyFileList = window.createFileList()

  return {
    'filelist length': filelist.length === 2,
    'filelist item': filelist.item(1) === file2,
    'filelist constructor': filelist.constructor === constructor,
    'emptyFileList length': emptyFileList.length === 0,
    'emptyFileList constructor': emptyFileList.constructor === constructor,
  }
}

async function testEsm(page, file) {
  const server = await createTestServer()
  server.get('/', (request, response) => {
    response.type('text/html')
    response.end(`
      <script type="module">
      import createFileList from '${file}'
      window.createFileList = createFileList
      </script>
      `)
  })
  server.get(file.slice(1), (request, response) => {
    response.type('text/javascript')
    response.end(fs.readFileSync(file))
  })

  await page.goto(server.url)
  return page.evaluate(testScript)
}

test('src', withPage, async (t, page) => {
  const results = await testEsm(page, './src/index.js')
  for (const [, result] of Object.entries(results)) {
    t.true(result)
  }
})

test('esm build', withPage, async (t, page) => {
  const results = await testEsm(page, './dist/create-file-list.mjs')
  for (const [, result] of Object.entries(results)) {
    t.true(result)
  }
})

test('umd build', withPage, async (t, page) => {
  await page.goto('about:blank')
  await page.addScriptTag({path: './dist/create-file-list.js'})

  const results = await page.evaluate(testScript)

  for (const [, result] of Object.entries(results)) {
    t.true(result)
  }
})
