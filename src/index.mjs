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
  let index = 0
  const {length} = files

  const dataTransfer = getDataTransfer()

  for (; index < length; index++) {
    dataTransfer.items.add(files[index])
  }

  return dataTransfer.files
}

export default createFileList
