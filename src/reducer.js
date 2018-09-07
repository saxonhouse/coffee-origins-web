import React from 'react';

export function userReducer(state={}, action) {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, state, {
        loggedIn: action.loggedIn,
        user: action.user,
        token: action.token
      })
      break;
    default:
      return state;
  }
}

export function setUser(loggedIn, user, token) {
  return {
    type: 'SET_USER',
    loggedIn,
    user,
    token
  }
}
