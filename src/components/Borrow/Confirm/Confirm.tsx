import Button from "../../../shared/Button";
import ButtonTransparent from "../../../shared/Button/transparent";
import SpinnerXs from "../../../shared/SpinnerXs";

const Confirm = (props: any) => {
    console.log('props', props)

    return (
        <>
            <div className="flex items-center justify-between mt-3 border p-3 rounded-md dark:border-fadedTurqoise border-primary">
                <div className="flex flex-col gap-3 font-bold text-sm">
                    <div>Borrow Stake Amount</div>
                    <div>No. of Epochs</div>
                    <div>Loan APR</div>
                    <div>Loan Fee</div>
                    <div>Service Fee</div>
                </div>
                <div className="flex flex-col gap-3 font-bold text-sm text-end dark:text-fadedTurqoise text-fluidGreen">
                    <div>{(+props.amount)?.toLocaleString()} ADA</div>
                    <div>{props.epochs} Epochs</div>
                    <div>{props.poolDetails?.apr ? props.poolDetails?.apr?.toFixed(2) + '%' : <SpinnerXs />}</div>
                    <div>{props.poolDetails?.feelenders ? props.poolDetails?.feelenders?.toFixed(2) + ' ADA' : <SpinnerXs />}</div>
                    <div>{props.poolDetails?.feeprotocol ? props.poolDetails?.feeprotocol?.toFixed(0) / 1e6 + ' ADA' : <SpinnerXs />}</div>
                </div>
            </div>
            {+props.totalLiquidity < +props.poolDetails?.amountUsed && <div className="text-xs font-medium text-red-600 mt-5">
                Not enough liquidity available
            </div>}
            <div className="flex items-center gap-5 justify-end mt-10 w-full">
                <ButtonTransparent onClick={() => props.continueAction(false)}>Cancel</ButtonTransparent>
                <Button disabled={!props.poolDetails?.apr || +props.totalLiquidity < +props.poolDetails.amountUsed}>Confirm</Button>
            </div>
        </>
    )
}

export default Confirm;
