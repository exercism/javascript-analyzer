export const gigasecond = (born_date) => {
    
    var ms_epoch_time_to_born = born_date.getTime();
    var age_lived_in_sec = Math.pow(10,9);

    var result_in_ms = ms_epoch_time_to_born + age_lived_in_sec * 1000;
    return new Date(result_in_ms);

} 