import { readdir, stat, realpath } from "fs/promises"
import { join } from "path"

export type DirtMap = (path:string) => Promise<string | { [x: string]: any; } | { [x: string]: { [x: string]: any; }; }>

const dirtMap:DirtMap = async (path = ".") =>
  (await stat (path)) .isFile ()
    ? String (await realpath(path))
    : Promise
        .all
          ( (await readdir (path))
              .map
                ( p => 
                    dirtMap (join (path, p))
                      .then (obj => ({ [p]: obj }))
                )
          )
          //@ts-ignore
        .then (results => Object.assign(...results))

export default dirtMap
