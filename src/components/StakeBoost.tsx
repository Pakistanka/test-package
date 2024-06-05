//@ts-nocheck
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import "../index.css";
import BorrowStake from "./Borrow/Borrow";
import LendStake from "./LendStake/LendStake";
import ActionType from "./ActionType/ActionType";


// export const StakeBoost = (props: any) => {
export const StakeBoost = (props: any) => {
  const [actionType, setActionType] = useState<string | null>(null);
  const [epochs, setEpochChange] = useState<number | null>(null);
  const [borrower, setBorrower] = useState<string | null>(null);

    useEffect(() => {
      setEpochChange(null)
    }, [actionType])

    useEffect(() => {
      setBorrower(null)
    }, [actionType, borrower])


  return (
    <div className="w-full min-h-screen pt-40 relative">
      <div className="w-full h-full flex flex-wrap gap-2 xl:gap-5 items-start pb-20 relative justify-center">
          <div className="w-[95%] md:w-[500px] min-h-[450px] p-5 flex flex-col rounded-md bg-white dark:bg-dark-gray shadow-md">
              {!actionType ? <ActionType setActionType={setActionType} />
                  : actionType == 'Borrow' && <BorrowStake cancel={setActionType} epochChange={setEpochChange} {...props} />
              }
          </div>
      </div>
  </div>
  );
};

// export default StakeBoost;
