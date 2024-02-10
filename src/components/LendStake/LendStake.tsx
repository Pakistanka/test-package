
//@ts-nocheck
import { useState } from "react";

import * as  FluidLib from './../../fluid-lib';
import Success from "../../shared/Success/Success";
import Spinner from "../../shared/Spinner";
import Confirm from "./Confirm/Confirm";
import Inputs from "./Inputs/Inputs";
import DepthChart from "../DepthChart";


const LendStake = (props: any) => {
    const [continueAction, setContinueAction] = useState(false);
    const [amount, setAmount] = useState(null);
    const [apr, setApr] = useState(5);
    const [epochs, setEpochs] = useState(6);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const onLend = async () => {
        try {
            setLoading(true);
            const res = await FluidLib.Lucid.addLiquidity(apr, amount, epochs);
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

    return (
        <div className="w-full h-full relative">
            <div className="font-bold uppercase tracking-wider">Provide Liquidity</div>
            {loading ? <div className="flex items-center justify-center w-full min-h-[300px]"><Spinner /></div> :
                success ? <div className="flex items-center justify-center w-full min-h-[375px]">
                    <Success>You have successfully added liquidity of {(+amount).toLocaleString()} ADA.</Success>
                </div> :
                    !continueAction ? <Inputs epochs={epochs} setEpochs={setEpochs} amount={amount} apr={apr} setAmount={setAmount}
                        setApr={setApr} continueAction={setContinueAction} cancel={props.cancel} />
                        : <Confirm amount={amount} apr={apr} onLend={onLend} continueAction={setContinueAction} />}
            {!loading && !success ? <div className="w-full min-h-[400px] lg:hidden">
                <DepthChart epochs={epochs} />
            </div> : null}
        </div>
    )
}

export default LendStake;
