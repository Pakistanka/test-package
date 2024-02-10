
import { useState } from "react";
import ReactSlider from "react-slider";
import ButtonTransparent from "../../../shared/Button/transparent";
import Button from "../../../shared/Button";

const Inputs = (props: any) => {
    const [err, setErr] = useState<string | null>(null);

    const onAmountChange = (val: any) => {
        const numb = val?.replace(/,/g, '').replace(/\./g, '').replace("\u00a0", "").replace("\u00a0", "").replace("\u00a0", "");
        if (+numb && err) {
            setErr(null)
        }
        if (+numb % 1000 !== 0) {
            setErr('Borrow amount must be in multiples of 1000.')
        }
        else if (+numb < 10000) {
            setErr('Minimum borrow amount is 10,000 ADA.')
        }
        else if (+numb > 1e6) {
            setErr('Maximum borrow amount is 1M ADA.')
        }
        else {
            setErr(null)
        }
        if (parseInt(numb)) {
            props.setAmount(parseInt(numb));
        }
        else if (numb == "") {
            props.setAmount("")
        }
    }
    const onEpochChange = (val: string) => {

        if (+val > 24 || +val < 2) {
            setErr('Minimum epochs is 6 and Maximum epochs is 24.')
        }
        else {
            setErr(null)
        }
        props.setEpochs(val);
    }

    return (
        <>
            <div className="form-control w-full max-w-xs mt-5">
                <label className="label">
                    <span className="text-xs font-bold tracking-wide uppercase">Enter Stake Amount</span>
                </label>
                <input type="text" value={props.amount?.toLocaleString()} onChange={(e) => onAmountChange(e.target.value)} placeholder="Borrow Stake Amount in ADA" className="input input-bordered input-primary w-full max-w-xs bg-transparent text-sm font-bold" />
            </div>
            <div className="form-control w-full max-w-xs mt-5">
                <label className="label">
                    <span className="text-xs font-bold tracking-wide uppercase">Choose No. of Epochs</span>
                </label>
                <input type="number" value={props.epochs} onChange={(e) => onEpochChange(e.target.value)} placeholder="No. of Epochs" className="input lg:hidden input-bordered input-primary w-full max-w-xs bg-transparent text-sm font-bold" />
                <div className="hidden lg:block">
                    <ReactSlider
                        className="int-slider"
                        markClassName="slider-mark"
                        min={2}
                        max={24}
                        step={1}
                        value={props.epochs}
                        withTracks
                        onAfterChange={(val) => props.setEpochs(val)}
                        thumbClassName="slider-thumb"
                        trackClassName="slider-track"
                        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                    />
                    <div className="w-full flex items-center justify-between mt-3 text-xs font-bold">
                        <div>Min 2</div>
                        <div>Max 24</div>
                    </div>
                </div>
            </div>
            {err && <div className="text-xs font-medium text-red-600 mt-5">{err}</div>}
            <div className="flex items-center gap-5 justify-end mt-5 w-full">
                <ButtonTransparent onClick={() => props.cancel(null)}>Cancel</ButtonTransparent>
                <Button disabled={!props.amount || !props.epochs || +props.epochs > 24 || +props.epochs < 2 || err} onClick={() => props.continueAction(true)}>Continue</Button>
            </div>
        </>
    )
}

export default Inputs;
