//@ts-nocheck
import { useState } from "react";
import * as FluidLib from '@/fluid-lib';
import Inputs from "@/components/LendStake/ui/Inputs/Inputs";
import Confirm from "@/components/LendStake/ui/Confirm/Confirm";
import Spinner from "@/shared/Spinner";
import DepthChart from "@/components/DepthChart";
import Success from "@/shared/Success/Success";
import Modal from "@/shared/Modal/Modal";


const EditStakeOffer = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [amount, setAmount] = useState(props.stakeAmount)
    const [apr, setApr] = useState(props.apr);
    const [epochs, setEpochs] = useState(6)
    const [continueAction, setContinueAction] = useState(false);

    const onLendEdit = async () => {
        try {
            setLoading(true);
            const res = await FluidLib.Lucid.editLiquidity(apr, amount,epochs, props.pools);
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
                <div className="font-exBold text-xl">Edit Stake Lend Offer</div>
                {loading ? <div className="flex flex-col items-center justify-center w-full h-full font-bold text-xs gap-2">
                    <Spinner />
                    {<div>{loading}</div>}
                </div> : success ? <Success close={props.close}>You have successfully extended the stake amount borrow</Success> :
                    <>
                        <div className="p-5 flex flex-col h-[95%] w-full overflow-y-auto custom-scroll">
                            {!continueAction ? <div className="flex flex-col">
                            <Inputs epochs={epochs} setEpochs={setEpochs} continueAction={setContinueAction} setAmount={setAmount} amount={amount} apr={apr} setApr={setApr} />
                                <DepthChart />
                            </div> :
                                <Confirm amount={amount} apr={apr} onLend={onLendEdit} continueAction={setContinueAction} />
                            }
                        </div>
                    </>}
            </div>
        </Modal>
    )
}

export default EditStakeOffer;
