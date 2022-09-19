// esta funcion trae el mensaje de error de la API
export const getError = (error) => {
  if (error.response && error.response.data.message) {
    return error.response.data.message;
  } else {
    return error.message;
  }
}