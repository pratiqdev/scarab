#!/usr/bin/env node

import express from 'express'
import fs from 'fs'
import render from './render.js'
import dirt from './dirt.js'
import template from './template.js'
import debug from 'debug'


// + parse scarab.json or create default config
// + parse directory for md pages
// + create default homepage if no index.md/home.md found
// + create 404.md page if no index.md found 
// + setup express server / create routes
// +
// +
// +
// +

// % If page not found - return custom 404.md page or built-in 404 page
// % If index not found - return IndexDisplayPage




//? Index Display Page
//> Create a function that returns an html page with a list of links
//> to possible routes in the current dir



const __dirname = fs.realpathSync('.')

const port = 3000
const app = express()
app.use(express.static(__dirname + '/static'))



const defaultConfig = {
  title: 'SCARAB',
    description: 'Static site built with Scarab',
    menu: {
      'Home': '/'
    },
    navbar: {
      'About': '/about',
      'GitHub': 'https://github.com/pratiqdev',
    },
    colors: {
      primary: '#aaf'
    }
  }
  let configExists = fs.existsSync(__dirname + '/scarab.json')
  let config = !configExists ? defaultConfig : JSON.parse(fs.readFileSync(__dirname + '/scarab.json', {encoding: 'utf-8'}) ?? '{}')
  config = Object.assign(config, defaultConfig)
  
  console.log(`>> SCARAB | ${config.title}`)
console.log('>> Serving static files from:', __dirname + '/static')
// console.log('>> Found pages:', JSON.stringify(fileMap, null, 2))
console.log('>> Config:', config)


let listOpen = false    

// const recurse = (obj) => {
//   return Object.entries(obj).map((o:any)=>{
//       const name:string = o[0]
//       const path:string | Object= o[1]
      
//         if(typeof path === 'object'){
//             listOpen = true
//             let str = `<div><h3>${name}</h3><ul>`
//             str += recurse(path)
//             str += `</ul></div>`
//             return str
//         }else{
//             return `<a href="${path.split('pages')[1].replace('.md', '')}">${name}</a><br />`
//           }
//         }).join('')
//       }
      
      // const fileMap = await dirt('pages')
      // let fileElString = '<h1>SCARAB</h1>' + recurse(fileMap)
      
      
      
      
      
      
      // app.get('/', (req, res) => {
      //   res.send('home?')
      // })

app.get('*', ({ path }, res) => {
    //- If path is directory: try to load '/path/index.md' or create index display page
    //- If 
    console.log('>> path:', path)
    if(path === '/') path = '/index'
    // if(!path || path.trim() === '/') path = '404'
    const fileContents = fs.readFileSync('./pages'+path+'.md', {encoding: 'utf-8'})
    
    
    res.send(template({...config, path}, render(fileContents)))
})





app.listen(port, () => {
  console.log('>> Scarab running on port', port)
})