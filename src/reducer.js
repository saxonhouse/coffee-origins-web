import React from 'react';
import { combineReducers } from 'redux'

export function user(state={}, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return Object.assign({}, state, {
        token: action.token,
        user_id: action.user_id
      })
      break;
    case 'SET_PROFILE':
      return Object.assign({}, state, {
        profile: action.profile
      })
      break;
    default:
      return state;
  }
}

export function setToken(token, user_id) {
  return {
    type: 'SET_TOKEN',
    token,
    user_id,
  }
}
export function setProfile(profile) {
  return {
    type: 'SET_PROFILE',
    profile
  }
}
