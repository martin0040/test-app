import React from "react";
import { setAuthState } from "@/store/reducers/index";
import { useAppDispatch } from "@/store/store";
const AuthUpdater = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <button className="border border-1 border-black p-2" onClick={() => dispatch(setAuthState(true))}>Log in</button>
      <button className="border border-1 border-black p-2" onClick={() => dispatch(setAuthState(false))}>Log out</button>
    </div>
  );
};
export default AuthUpdater;