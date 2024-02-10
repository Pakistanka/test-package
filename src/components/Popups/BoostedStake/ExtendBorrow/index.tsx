//@ts-nocheck
import { useEffect, useState } from "react";

import Inputs from "./Inputs";
import Confirm from "./Confirm";
import * as FluidLib from '@/fluid-lib';
import ButtonTransparent from "@/shared/Button/transparent";
import Button from "@/shared/Button";
import DepthChart from "@/components/DepthChart";
import Modal from "@/shared/Modal/Modal";
import Spinner from "@/shared/Spinner";
import Success from "@/shared/Success/Success";

const ExtendBorrow = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [epochs, setEpochs] = useState(1);
    const [confirm, setConfirm] = useState(false);
    const [poolDetails, setPoolDetails] = useState(null);

    useEffect(() => {
        if (confirm) {
            getPool();
        }
        else {
            setPoolDetails(null)
        }
    }, [confirm]);

    const getPool = async () => {
        const pool = await FluidLib.Lucid.getBorrowDetails(props.stakeAmount, epochs, deadline);
        setPoolDetails(pool);
    }

    const onBorrow = async () => {
        try {
            setLoading(true);
            const res = await FluidLib.Lucid.borrowStake(props.stakeAmount, epochs)
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
        <Modal show={props.show} sm close={props.close}>
            <div className="p-7 h-full">
                <div className="font-exBold text-xl">Extend Stake Borrow</div>
                {loading ? <div className="flex flex-col items-center justify-center w-full h-full font-bold text-xs gap-2">
                    <Spinner />
                    {<div>{loading}</div>}
                </div> : success ? <Success close={props.close}>You have successfully extended the stake amount borrow</Success> :
                    <>
                        <div className="p-5 flex flex-col h-[95%] w-full overflow-y-auto custom-scroll">
                            {!confirm ? <div className="flex flex-col">
                                <Inputs amount={props.stakeAmount} epochs={epochs} setEpochs={setEpochs} />
                                <div className="flex items-center gap-5 justify-end mt-5 w-full">
                                    <ButtonTransparent onClick={props.close}>Cancel</ButtonTransparent>
                                    <Button disabled={!epochs || epochs > 15 || epochs < 1} onClick={() => setConfirm(true)}>Continue</Button>
                                </div>
                                <DepthChart />
                            </div> :
                                <Confirm poolDetails={poolDetails} amount={props.stakeAmount} epochs={epochs} onBorrow={onBorrow} cancel={() => setConfirm(false)} />
                            }
                        </div>
                    </>}
            </div>
        </Modal>
    )
}

export default ExtendBorrow;
