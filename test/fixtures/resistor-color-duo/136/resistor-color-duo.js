/* jshint node: true */
'use strict';

/* jshint esversion: 6 */
const resistors = [
    'black',
    'brown',
    'red',
    'orange',
    'yellow' ,
    'green',
    'blue',
    'violet',
    'grey',
    'white'];

export function decodedValue(group,obj=resistors) {
    const ids = group.map(color => obj.indexOf(color) );
    return parseInt(ids.join(''));
}

