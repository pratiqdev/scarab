import fs from 'fs'
import dirt from './dirt.js'

type Config = {
    title?: string;
    path?: string;
    description?: string;
    navbar?: { [key:string]: string }; 
    menu?: { [key:string]: string }; 
    colors?: {
        primary?: string;
        secondary?: string;
    }
    // cssImports?: string[];
}


const htmlString =
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}}{{PATH}}</title>
    <!-- {{META_TAGS}} -->
</head>
<body>
    <nav>
        <h1>{{TITLE}}</h1>
        <div>
            {{NAV_LINKS}}
            <button>Menu</button>
        </div>
    </nav>
    <div id="container">
        <aside>
            {{SIDE_MENU}}
        </aside>
        <main>
            <div id="main-wrapper">
                {{CONTENT}}
            </div>
        </main>
    </div>
    <footer>
        {{TITLE}}
        {{NAV_LINKS}}
    </footer>
</body>
</html>`


const generateSideNav = (obj:any) => {
    return Object.entries(obj).map((o:any)=>{
        const name:string = o[0]
        const path:string | Object= o[1]
        
        if(typeof path === 'object'){
            let str = `<div><h3>${name}</h3>`
            str += generateSideNav(path)
            str += `</div>`
            return str
        }else{
            return `<a class="menu-link" href="${path.split('pages')[1].replace('.md', '')}">${name.replace('.md', '')}</a>`
        }
    }).join('')
}

const fileMap = await dirt('pages')
let fileMenu = generateSideNav(fileMap)

const template = (config:Config, content:string) => {
    console.log('>> Template:', config)
    let html = htmlString
    const replacers = {
        '{{TITLE}}': config.title ?? 'SCARAB',
        '{{PATH}}': config.path ? ` | ${config.path.split('/').pop() ?? ''}` : '',
        '{{CONTENT}}': content === '' ? '404????' : content,
        '{{PRIMARY_COLOR}}': config.colors?.primary ?? '#00f',
        '{{SECONDARY_COLOR}}': config.colors?.secondary ?? '#0f0',
        '{{NAV_LINKS}}': !config?.navbar || !Object.entries(config.navbar).length ? '' : Object.entries(config.navbar).map(([text, url])=> `<a href="${url}">${text}</a>`).join(''),
        '{{SIDE_MENU}}': fileMenu,
    }

    Object.entries(replacers).forEach(([find, replace]) => {
        html = html.replace(new RegExp(find, 'g'), replace)
    })

    return html
}

export default template