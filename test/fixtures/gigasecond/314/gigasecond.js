export const gigasecond = (gs, expectedDate) => {

    var gs = Date();
    var expectedDate = Date();
    var gigaSecond = 1000000000;
    
    if ((gs.setSeconds(gs.getSeconds() + gigaSecond)) === expectedDate.getSeconds()) {
        return true;
    }



}