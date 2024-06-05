
import { useEffect, useState } from "react";


import * as  FluidLib from './../../fluid-lib'
// import DepthChart from "../DepthChart";
import Confirm from "./Confirm/Confirm";
import Inputs from "./Inputs/Inputs";
import Success from "../../shared/Success/Success";
import Spinner from "../../shared/Spinner";

interface PoolDetails {
    resume: {
        amountUsed: number;
        apr: number;
        feelenders: number;
        feeprotocol: number;
    };
    tx: string;
}


const BorrowStake = (props: any) => {
    const [continueAction, setContinueAction] = useState(false);
    const [amount, setAmount] = useState('');
    const [epochs, setEpochs] = useState(2);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [poolDetails, setPoolDetails] = useState<PoolDetails | null>(null);

    const [totalLiquidity, setTotalLiquidity] = useState(null);

    const signerAddr = props.signer;
    const borrowerAddr = props.borrower;
    const partnerAddr = props.partner


    useEffect(() => {
        if (continueAction) {
            onBorrow();
        }
        else {
            setPoolDetails(null)
        }
    }, [continueAction]);

    const onBorrow = async () => {

        try {
            setLoading(true);

            const payload = {
                signer: signerAddr.toString(),
                epochs: epochs,
                borrower: borrowerAddr.toString(),
                amount: amount,
                partner: partnerAddr.toString(),
            }
            const res = await FluidLib.StakeBoost.BoostedStakeSdk(payload);
            console.log('res', res)

            console.log(
                'details',
                setPoolDetails(
                    {
                        "resume": {
                            "amountUsed": 10000,
                            "apr": 5.510948905109489,
                            "feelenders": 45.3,
                            "feeprotocol": 8.4
                        },
                        "tx": "84aa0083825820d58c9243c3e41e86a311b5ad5cfaf400339bd05a9371848381c106f96592da0402825820003951a17c51397efcb08ebc2ae1a813caf2dff5365fe6b04040e1e31f4c4b1404825820653532b954fc6638a1e95b41b59d6d348226743bce952316ee9ed8cfed05f2c7010186a3005839116ef4901a1def16b6293527187859273373813cf4fcd702cb4ba2858ee4ff47a36e9602fdee192181be146d445591a051d56b5615fe3e7d42011b00000002540be400028201d81859011dd8799fd8799fd8799f581c4000403905718b262c8c0038569b478ad0a51ed2be05a1a2406e7012ffd8799fd8799fd8799f581c2e1408b2845461c9240c8cc696a1fc5dd8594684662a2946e5fd44d8ffffffff4040189740401b00000002540be4001a000f4240d8799fd8799f581c1db7e8e3c128c1a3711c7326b232231c98441149041349ee8e0282ecffd8799fd8799fd8799f581ce4ff47a36e9602fdee192181be146d445591a051d56b5615fe3e7d42ffffffff1b0000018f0d0dbfe01b0000018f3891726ad8799fd8799f581c4000403905718b262c8c0038569b478ad0a51ed2be05a1a2406e7012ffd8799fd8799fd8799f581c2e1408b2845461c9240c8cc696a1fc5dd8594684662a2946e5fd44d8ffffffff000105ff825839011db7e8e3c128c1a3711c7326b232231c98441149041349ee8e0282ece4ff47a36e9602fdee192181be146d445591a051d56b5615fe3e7d421a000f4240825839014000403905718b262c8c0038569b478ad0a51ed2be05a1a2406e70122e1408b2845461c9240c8cc696a1fc5dd8594684662a2946e5fd44d81a02b33920825839316cbbafa1e66aeab48dbe1aa0cc448ebd0c01ff4e3d3a6905e85b79a398659a2701a5e3366d7c48f3f4dd3df44613f0daf271b0b8c8ed3d601a00802c80825839011db7e8e3c128c1a3711c7326b232231c98441149041349ee8e0282ece4ff47a36e9602fdee192181be146d445591a051d56b5615fe3e7d421a004c4b40825839011db7e8e3c128c1a3711c7326b232231c98441149041349ee8e0282ece4ff47a36e9602fdee192181be146d445591a051d56b5615fe3e7d421a1c357138021a0004332d031a072347d9081a072345810b58202ffb44acef5e61eb8deea57678277820722c80c133c8e80695b0769e9c767f720d81825820653532b954fc6638a1e95b41b59d6d348226743bce952316ee9ed8cfed05f2c70110825839011db7e8e3c128c1a3711c7326b232231c98441149041349ee8e0282ece4ff47a36e9602fdee192181be146d445591a051d56b5615fe3e7d421a1ee8dab1111a00064cc412818258202c812d5ba6d240eea79dca528f22a3854adcaac140f3151ecbcf5d945c5981e300a10581840002d87b9f181e001b00000002540be400d8799fd8799f581c1db7e8e3c128c1a3711c7326b232231c98441149041349ee8e0282ecffd8799fd8799fd8799f581ce4ff47a36e9602fdee192181be146d445591a051d56b5615fe3e7d42ffffffffff821a000bcc941a11c18333f5f6"
                })
            )

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

    // const getPool = async () => {
    //     const res = await FluidLib.StakeBoost.getBorrowFromPartners(signer, epochs, borrower, amount, partner);
    //     // const pool = await FluidLib.Lucid.getBorrowDetails(amount, epochs, deadline);
    //     setPoolDetails(pool);
    // }

    const onEpochChange = (val: any) => {
        setEpochs(val);
        if (props.epochChange) {
            props.epochChange(val)
        }
    }

    console.log('poolDetails', poolDetails)


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
                            // onBorrow={onBorrow}
                        />
                        :
                        <Confirm
                            totalLiquidity={totalLiquidity}
                            poolDetails={poolDetails}
                            amount={amount}
                            epochs={epochs}
                            continueAction={setContinueAction}
                        />}

            {/* {!loading && !success ? (
                <div className="w-full min-h-[400px] lg:hidden">
                    <DepthChart key={epochs} setTotalLiquidity={setTotalLiquidity} epochs={epochs} />
                </div>
                ) : (
                    null
                )
            } */}

        </div>
    )
}

export default BorrowStake;
