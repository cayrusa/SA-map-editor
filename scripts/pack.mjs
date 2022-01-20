#! /usr/bin/env node
// -*- js -*-

"use strict";

// Boolean flag to determine whether assets should be downloaded/extracted/copied to dist folder
// The idea is that once you have packaged the assets in the dist folder, there is no need to do it again (unless the assets change of course)
// every time you build the application to try a code change
const packAssets = process.argv[2] == "true"
if (packAssets) {
    console.log("packAssets", packAssets)
} else {
    console.log("packAssets false -> not packing asset files")
}

import { promises as fs } from "fs";
import extract from 'extract-zip';

import fsync from "fs";
// import info from "../package.json";
import path from "path";
import { minify } from "uglify-js";
import https from 'https'
import zlib from 'zlib';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (!fsync.existsSync('./dist'))
    await fs.mkdir('./dist')
if (!fsync.existsSync('./tmp'))
    await fs.mkdir('./tmp')

const libFiles = await readFiles('./lib');
const srcFiles = await readFiles('./src');

// console.log(libFiles)

if (packAssets) {
    if (!fsync.existsSync('./tmp/assets.zip')) {
        console.log('Downloading assets')
        const download = new Promise(resolve => {
    
            https.get('https://www.astralvault.net/games/SA/MapEditor/assets.zip', async res => {
    
                const path = './tmp/assets.zip';
                const filePath = fsync.createWriteStream(path);
                res.pipe(filePath);
                filePath.on('finish', () => {
                    filePath.close();
                    console.log('Download Completed');
                    resolve();
                })
            })
        });
        await download;
    }

    console.log('extracting assets...')
    await extract('./tmp/assets.zip', { dir: path.join(__dirname, '..', 'dist', 'assets') })
    console.log('assets extracted')
}



console.log('minifiying...')
const minified = minify({ ...libFiles, ...srcFiles }, { sourceMap: { url: 'TI3SA.min.js.map', includeSources: true, names: true, root: 'src' } })

if (minified.warnings)
    console.warn(minified.warnings)
if (minified.error)
    console.warn(minified.error)

await fs.writeFile('./dist/TI3SA.min.js', minified.code);
if (minified.map)
    await fs.writeFile('./dist/TI3SA.min.js.map', minified.map);

console.log("minified")

async function readFiles(p) {
    const lib = await fs.readdir(p);

    const libFiles = (await Promise.all(lib.map(async (x) => {
        const stream = await fs.readFile(path.join(p, x));
        const txt = stream.toString();
        return [x, txt];
    })));
    return libFiles.reduce((obj, v) => {
        obj[v[0]] = v[1]
        return obj;
    }, {});
}

console.log('copy local assets');
// The assets folder only contains css sheets and manifests. The actual jpgs and pngs come from the zip extracted earlier in this script
copyFolderRecursiveSync('./assets', './dist/')
copyFolderRecursiveSync('./css', './dist/')

console.log('copy index.html');
copyFileSync('index.html', './dist/index.html')
console.log('Finish');


function copyFileSync(source, target) {

    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if (fsync.existsSync(target)) {
        if (fsync.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }

    fsync.writeFileSync(targetFile, fsync.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
    var files = [];

    // Check if folder needs to be created or integrated
    var targetFolder = path.join(target, path.basename(source));
    if (!fsync.existsSync(targetFolder)) {
        fsync.mkdirSync(targetFolder);
    }

    // Copy
    if (fsync.lstatSync(source).isDirectory()) {
        files = fsync.readdirSync(source);
        files.forEach(function (file) {
            var curSource = path.join(source, file);
            if (fsync.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder);
            } else {
                copyFileSync(curSource, targetFolder);
            }
        });
    }
}