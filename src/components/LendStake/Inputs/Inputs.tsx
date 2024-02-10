import { useState } from "react";
import ReactSlider from "react-slider";
import ButtonTransparent from "../../../shared/Button/transparent";
import Button from "../../../shared/Button";



const Inputs = (props: any) => {
    const [err, setErr] = useState<string | null>(null);

    const onAmountChange = (val: string) => {
        const numb = val?.replace(/,/g, '').replace(/\./g, '').replace("\u00a0", "").replace("\u00a0", "").replace("\u00a0", "");
        if (+numb && err) {
            setErr(null)
        }
        if (parseInt(numb) < 1000) {
            setErr("Minimum amount is 1000 ADA");
        }
        else if (parseInt(numb) > 1e6) {
            setErr("Maximum amount is 1 million ADA");
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
        if (+val > 36 || +val < 6) {
            setErr('Minimum epochs is 6 and Maximum epochs is 36.')
        } else {
            setErr(null)
        }
        props.setEpochs(val);
    }

    const onAprChange = (val: string) => {
        if (+val > 20) {
            setErr('APR cannot be larger than 20.')
        }
        else if (+val < 5) {
            setErr('Minimum APR should be 5.')
        }
        else {
            setErr(null)
        }
        props.setApr(val);
    }

    return (
        <>
            <div className="form-control w-full max-w-xs mt-5">
                <label className="label">
                    <span className="text-xs font-bold tracking-wide uppercase">Enter Stake Amount</span>
                </label>
                <input type="text" value={props.amount?.toLocaleString()} onChange={(e) => onAmountChange(e.target.value)} placeholder="Lend Stake Amount in ADA" className="input input-bordered input-primary w-full max-w-xs bg-transparent text-sm font-bold" />
            </div>
            <div className="form-control w-full max-w-xs mt-3">
                <label className="label">
                    <span className="text-xs font-bold tracking-wide uppercase">Choose APR</span>
                </label>
                <input type="number" value={props.apr} onChange={(e) => onAprChange(e.target.value)} placeholder="APY in %" className="input lg:hidden input-bordered input-primary w-full max-w-xs bg-transparent text-sm font-bold" />
                <div className="hidden lg:block">
                    <ReactSlider
                        className="int-slider"
                        markClassName="slider-mark"
                        min={5}
                        max={20}
                        step={0.5}
                        value={props.apr}
                        withTracks
                        onAfterChange={(val) => props.setApr(val)}
                        thumbClassName="slider-thumb"
                        trackClassName="slider-track"
                        renderThumb={(props, state) => <div {...props}>{state.valueNow}%</div>}
                    />
                    <div className="w-full flex items-center justify-between mt-3 text-xs font-bold">
                        <div>Min 5%</div>
                        <div>Max 20%</div>
                    </div>
                </div>
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
                        min={6}
                        max={36}
                        step={1}
                        value={props.epochs}
                        withTracks
                        onAfterChange={(val) => props.setEpochs(val)}
                        thumbClassName="slider-thumb"
                        trackClassName="slider-track"
                        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                    />
                    <div className="w-full flex items-center justify-between mt-3 text-xs font-bold">
                        <div>Min 6</div>
                        <div>Max 36</div>
                    </div>
                </div>
            </div>
            {err && <div className="text-xs font-medium text-red-600 mt-5">{err}</div>}
            <div className="flex items-center gap-5 justify-end mt-10 w-full">
                <ButtonTransparent onClick={() => props.cancel(null)}>Cancel</ButtonTransparent>
                <Button disabled={!props.amount || !props.apr || props.apr > 20 || props.apr < 5 || props.epochs < 6 || props.epochs > 36} onClick={() => props.continueAction(true)}>Continue</Button>
            </div>
        </>
    )
}

export default Inputs;
