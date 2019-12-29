#!/usr/bin/env node
const tj = require('@mapbox/togeojson');
const fs = require('fs');
// node doesn't have xml parsing or a dom. use xmldom
const DOMParser = require('xmldom').DOMParser;

const directory = fs.opendirSync('public/resources/gpx');
let dirent;
while((dirent = directory.readSync()) !== null){
    if(dirent.name.endsWith('.gpx')){
        console.log(`Converting ${dirent.name} to GeoJSON`);
        const gpx = new DOMParser().parseFromString(fs.readFileSync(`public/resources/gpx/${dirent.name}`, 'utf-8'));
        const converted = tj.gpx(gpx);
        fs.writeFileSync(`public/resources/gpx/${dirent.name.replace('gpx', 'json')}`, JSON.stringify(converted));
    }
}