//---------------------------------TEST

var dft = require('diff-file-tree')

var hyperdriveArchive = "hyper://f7cfa9d68049dff23c1e0d991881cf2a25585acce384ea499eb2b78acc76af8f/"
var hyperdriveArchive2 = "hyper://6cd4902bffca80e74e39f0eb6731369f9c74d0b13b5bc9546692487513152d8c/"

const hyperspace = require('hyperspace')
const HyperspaceClient = hyperspace.Client

var Hyperdrive = require('hyperdrive')

import { parseHyperUrl } from '../js/hyper-lib/urls.js'
import * as HyperStruct from '../js/hyper-lib/hyper/struct.js'

diffTest()

async function diffTest(){

  var left = await toDftParam(hyperdriveArchive2)
  var right = await toDftParam(hyperdriveArchive)

  const client = new HyperspaceClient()
  await client.ready()
  await client.status()

  console.log('Hyperspace daemon connected, status:')
  console.log(await client.status())

  var changes = await dft.diff({path: '/', fs: left} ,{path: '/', fs: right})

  console.log(changes)

}

function isUrl (str) {
  return str.startsWith('hyper://') || /^[0-9a-f]{64}/.test(str)
}

async function toDftParam (str) {
  if (isUrl(str)) {
    let urlp = parseHyperUrl(str)
    let drive = await HyperStruct.get(urlp.hostname, {expect: 'hyperdrive'})
    return {fs: drive.api, path: urlp.pathname}
  }
  return ''+str
}

//------------------------TEST
