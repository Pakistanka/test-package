
//@ts-nocheck
import { useState } from "react";
import * as FluidLib from '@/fluid-lib';
import { BiError } from "react-icons/bi";

import Success from "@/shared/Success/Success";
import Spinner from "@/shared/Spinner";
import ButtonTransparent from "@/shared/Button/transparent";
import Button from "@/shared/Button";
import Modal from "@/shared/Modal/Modal";

interface WithdrawStakeOfferProps {
    show: boolean;
    close: () => void;
    pools: any;
  }


const WithdrawStakeOffer = (props: any) => {
    const [loading, setLoading] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [err, setErr] = useState<Error | null>(null);

    const onCancel = async () => {
        try {
            setLoading('Creating Transaction');
            //call withdraw lucid here, props has all fields
            const tryCancel = await FluidLib.Lucid.withdrawLiquidity(props.pools);
            if (tryCancel) {
                setSuccess("Your stake offer has been succefully withdrawn!");
                setLoading(null);
            }
            else {
                setLoading(null)
            }
        }
        catch (err) {
            setLoading(null);
            console.log(err)
        }
    }

    return (
        <Modal show={props.show} close={props.close} sm>
            <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
                {err ? <div className="flex flex-col items-center justify-center h-full w-full font-bold text-xs gap-2 text-center text-red-600">
                    <BiError className=" text-4xl" />
                    {err?.toString()}
                </div> : loading ?
                    <div className="w-full h-full flex items-center justify-center text-center flex-col">
                        <Spinner />
                        <div className="text-xs mt-2 font-bold">{loading}</div>
                    </div>
                    : success ? <Success close={props.close}>{success}</Success> :
                        <>
                            <div className="font-bold text-sm">Are you sure you want to withdraw the stake offer?</div>
                            <div className="flex gap-3">
                                <ButtonTransparent onClick={props.close}>Close</ButtonTransparent>
                                <Button onClick={onCancel}>Continue</Button>
                            </div>
                        </>
                }
            </div>
        </Modal>
    )
}

export default WithdrawStakeOffer;
