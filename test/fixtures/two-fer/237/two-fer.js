function two_fer (name) {
  let name_var = name;
  alert (name_var);
    if (typeof name_var == 'string') {
      return 'One for ' + name_var + ', one for me'
  } else if (typeof name_var != 'string') {
      return 'One for you, one for me'
    }
};
