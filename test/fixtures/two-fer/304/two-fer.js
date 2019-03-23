const isName = (n) => {
    let name;
    n.trim() === "" ? name = "you" : name = n.trim();
    console.log(`One for ${name} and one for me`)
}