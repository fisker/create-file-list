let getDataTransfer = () => new DataTransfer()
const {concat} = Array.prototype

try {
  getDataTransfer()
} catch {
  getDataTransfer = () => new ClipboardEvent('').clipboardData
}

function createFileList() {
  // eslint-disable-next-line prefer-rest-params
  const files = concat.apply([], arguments)
  let i = 0
  const {length} = files

  const dataTransfer = getDataTransfer()

  for (; i < length; i++) {
    dataTransfer.items.add(files[i])
  }

  return dataTransfer.files
}

export default createFileList
