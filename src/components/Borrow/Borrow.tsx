//@ts-nocheck
import { useEffect, useState } from "react";


import * as  FluidLib from './../../fluid-lib'
import DepthChart from "../DepthChart";
import Confirm from "./Confirm/Confirm";
import Inputs from "./Inputs/Inputs";
import Success from "../../shared/Success/Success";
import Spinner from "../../shared/Spinner";

const BorrowStake = (props: any) => {
    const [continueAction, setContinueAction] = useState(false);
    const [amount, setAmount] = useState('');
    const [epochs, setEpochs] = useState(2);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [poolDetails, setPoolDetails] = useState(null);
    const [totalLiquidity, setTotalLiquidity] = useState(null);

    const onBorrow = async () => {
        try {
            setLoading(true);

            const res = await FluidLib.Lucid.borrowStake(amount, epochs)
            if (res) {
                setSuccess(true);
                setLoading(false);
            }
        }
        catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (continueAction) {
            getPool();
        }
        else {
            setPoolDetails(null)
        }
    }, [continueAction]);

    const getPool = async () => {
        const pool = await FluidLib.Lucid.getBorrowDetails(amount, epochs, deadline);
        setPoolDetails(pool);
    }

    const onEpochChange = (val: any) => {
        setEpochs(val);
        if (props.epochChange) {
            props.epochChange(val)
        }
    }

    return (
        <div className="w-full h-full relative">
            <div className="font-bold uppercase tracking-wider">Borrow Stake</div>
            {loading ? <div className="flex items-center justify-center w-full min-h-[300px]"><Spinner /></div> :
                success ? <div className="flex items-center justify-center w-full min-h-[375px]">
                    <Success>You have successfully borrowed the stake amount of {(+amount).toLocaleString()} ADA.</Success>
                </div> : !continueAction ?
                        <Inputs
                            amount={amount}
                            epochs={epochs}
                            setAmount={setAmount}
                            setEpochs={onEpochChange}
                            continueAction={setContinueAction}
                            cancel={props.cancel}
                        />
                        :
                        <Confirm
                            totalLiquidity={totalLiquidity}
                            poolDetails={poolDetails}
                            amount={amount}
                            epochs={epochs}
                            onBorrow={onBorrow}
                            continueAction={setContinueAction}
                        />}

            {!loading && !success ? (
                <div className="w-full min-h-[400px] lg:hidden">
                    <DepthChart key={epochs} setTotalLiquidity={setTotalLiquidity} epochs={epochs} />
                </div>
                ) : (
                    null
                )
            }

        </div>
    )
}

export default BorrowStake;
