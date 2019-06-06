/* jshint node: true */
'use strict';

/* jshint esversion: 6 */
const resistors = {
    black:0,
    brown:1, 
    red:2, 
    orange: 3,
    yellow: 4 , 
    green:5,
    blue:6,
    violet:7,
    grey:8,
    white:9};

export const COLORS = Object.keys(resistors);

export function colorCode(color) {

    return resistors[color];

}
