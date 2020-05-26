export const isPhone = (value) => {
  if (value.indexOf('-') > -1){
    return false;
  }
  let number = Number(value);
  return Number.isInteger(number);
};

export const isEmail = (email) => {
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; // eslint-disable-line
  return re.test(String(email).toLowerCase());
};

export const validateLatLng = (lat, lng) => {
  let valid = true;
  let validLat = true;
  let validLng = true;
  if (lat < -90 || lat > 90) {
    validLat = false;
  }else if (lng < -180 || lng > 180) {
    validLng = false;
  }else if (lat === "" || lng === "") {
    validLat = false;
    validLng = false;
  }
  if (!validLat || !validLng){
    valid = false;
  }
  return valid;
};