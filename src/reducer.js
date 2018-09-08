import React from 'react';

export function userReducer(state={}, action) {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, state, {
        user: action.user,
        token: action.token
      })
      break;
    default:
      return state;
  }
}

export function setUser(user, token) {
  return {
    type: 'SET_USER',
    user,
    token
  }
}
