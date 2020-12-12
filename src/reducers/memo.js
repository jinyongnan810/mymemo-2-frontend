import * as types from "../actions/types";
const initialState = {
  memos: [],
  currentMemo: null,
  loading: true,
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.LOAD_MEMO:
      return {
        memos: payload,
        currentMemo: payload.length > 0 ? payload[0] : null,
        loading: false,
      };
    case types.SET_CURRENT_MEMO:
      return {
        ...state,
        currentMemo: state.memos.filter((memo) => memo.id === payload)[0],
      };
    case types.LOAD_MEMO_FAIL:
      return { memos: [], currentMemo: null, loading: false };
    case types.UPDATE_MEMO: {
      const newMemo = action.payload;
      const memos = state.memos.slice();
      memos.find((memo) => {
        if (memo.id === newMemo.id) {
          memo.title = newMemo.title;
          memo.content = newMemo.content;
          memo.updatedAt = newMemo.updatedAt;
          return true;
        }
        return false;
      });
      if (state.currentMemo.id === newMemo.id) {
        return { ...state, memos: memos, currentMemo: newMemo };
      } else {
        return { ...state, memos: memos };
      }
    }
    case types.CREATE_MEMO: {
      const newMemo = action.payload;
      const memos = state.memos.slice();
      memos.unshift(newMemo);
      return { ...state, memos: memos };
    }
    case types.DELETE_MEMO: {
      const id = action.payload;
      const memos = state.memos.slice().filter((memo) => memo.id !== id);
      if (id === state.currentMemo.id) {
        const newCurrentMemo = memos.length > 0 ? memos[0] : null;
        return { ...state, memos: memos, currentMemo: newCurrentMemo };
      }
      return { ...state, memos: memos };
    }
    case types.CHANGE_SEARCHING_WORD: {
      const word = action.payload.toLowerCase();
      if (word) {
        return {
          ...state,
          memos: state.memos.map((memo) => {
            if (
              memo.title.toLowerCase().indexOf(word) > -1 ||
              memo.content.toLowerCase().indexOf(word) > -1
            ) {
              return { ...memo, searchHit: true };
            }
            return { ...memo, searchHit: false };
          }),
        };
      } else {
        return {
          ...state,
          memos: state.memos.map((memo) => ({ ...memo, searchHit: false })),
        };
      }
    }
    default:
      return state;
  }
};
