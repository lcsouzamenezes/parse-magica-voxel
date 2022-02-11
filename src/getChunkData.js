const SIZEHandler = require('./chunkHandlers/SIZE');
const RGBAHandler = require('./chunkHandlers/RGBA');
const XYZIHandler = require('./chunkHandlers/XYZI');
const PACKHandler = require('./chunkHandlers/PACK');
const MATTHandler = require('./chunkHandlers/MATT');
const nTRNHandler = require('./chunkHandlers/nTRN');
const nGRPHandler = require('./chunkHandlers/nGRP');
const nSHPHandler = require('./chunkHandlers/nSHP');
const LAYRHandler = require('./chunkHandlers/LAYR');
const MATLHandler = require('./chunkHandlers/MATL');
const rOBJHandler = require('./chunkHandlers/rOBJ');

const chunkHandlers = {
  SIZE: SIZEHandler,
  XYZI: XYZIHandler,
  RGBA: RGBAHandler,
  PACK: PACKHandler,
  MATT: MATTHandler,
  nTRN: nTRNHandler,
  nGRP: nGRPHandler,
  nSHP: nSHPHandler,
  LAYR: LAYRHandler,
  MATL: MATLHandler,
  rOBJ: rOBJHandler,
};

function SKIPHandler(state, _startIndex, endIndex){
  state.readByteIndex = endIndex;
  return { error: "Unsupported chunk type" };
}

module.exports = function getChunkData(state, id, startIndex, endIndex){
  if(!chunkHandlers[id]){
    console.log("Unsupported chunk type " + id);
    return SKIPHandler(state, startIndex, endIndex);
  }
  return chunkHandlers[id](state, startIndex, endIndex);
};
