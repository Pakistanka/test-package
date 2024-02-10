import Button from "../../../shared/Button";
import ButtonTransparent from "../../../shared/Button/transparent";


const Confirm = (props: any) => {
    return (
        <>
            <div className="flex items-center justify-between mt-3 border p-3 rounded-md dark:border-fadedTurqoise border-primary">
                <div className="flex flex-col gap-3 font-bold text-sm">
                    <div>Lend Stake Amount</div>
                    <div>APR</div>
                    <div>Service Fee</div>
                </div>
                <div className="flex flex-col gap-3 font-bold text-sm text-end dark:text-fadedTurqoise text-fluidGreen">
                    <div>{(+props.amount)?.toLocaleString()} ADA</div>
                    <div>{props.apr} %</div>
                    <div>1%</div>
                </div>
            </div>
            <div className="flex items-center gap-5 justify-end mt-20 w-full">
                <ButtonTransparent onClick={() => props.continueAction(false)}>Back</ButtonTransparent>
                <Button onClick={props.onLend}>Confirm</Button>
            </div>
        </>
    )
}

export default Confirm;
