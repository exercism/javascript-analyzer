function twoFer(name) {
    var result = 'One for '
    result += (name == '') ? 'you' : name
    result += ', one for me.'
    return result
}

export { twoFer };

