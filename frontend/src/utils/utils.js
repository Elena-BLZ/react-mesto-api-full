export const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((data) => {
      const errMessage = data.statusCode === 400 ? `Данные введены неверно. (${data.validation.body.message})` : data.message;
      throw new Error(errMessage);
    })
  };

