const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/apf-cohort-203",
  headers: {
    authorization: "4cc65bb5-2577-41d3-953e-f0915e017bf0",
    "Content-Type": "application/json",
  },
};

const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((response) => getResponseData(response));
};

export const getCardList = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((response) => getResponseData(response));
};

export const setUserInfo = ({ name, about }) => {
  const requestBody = JSON.stringify({ name, about });
  
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: requestBody,
  })
    .then((response) => getResponseData(response));
};

export const setUserAvatar = (avatar) => {
  const requestBody = JSON.stringify({ avatar });
  
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: requestBody,
  })
    .then((response) => getResponseData(response));
};

export const addCard = ({ name, link }) => {
  const requestBody = JSON.stringify({ name, link });
  
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: requestBody,
  })
    .then((response) => getResponseData(response));
};

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((response) => getResponseData(response));
};

export const changeLikeCardStatus = (cardId, isLiked) => {
  const method = isLiked ? "DELETE" : "PUT";
  
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers,
  })
    .then((response) => getResponseData(response));
};