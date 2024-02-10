//@ts-nocheck
import { useState } from "react";
import ReactSlider from "react-slider";

const Inputs = (props: any) => {
    const [err, setErr] = useState<string | null>(null);

    const onEpochChange = (val: string) => {
        if (+val > 15 || +val < 1) {
            setErr('Epochs cannot be larger than 15.')
        }
        else {
            props.setEpochs(val);
        }
    }

    return (
        <>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="text-xs font-bold tracking-wide uppercase">Stake Amount</span>
                </label>
                <input type="text" value={props.amount?.toLocaleString()} disabled placeholder="Borrow Stake Amount in ADA" className="input disabled:bg-lighter-gray disabled:text-black input-bordered input-primary w-full max-w-xs bg-transparent text-sm font-bold" />
            </div>
            <div className="form-control w-full max-w-xs mt-5">
                <label className="label">
                    <span className="text-xs font-bold tracking-wide uppercase">Choose No. of Epochs</span>
                </label>
                <input type="number"
                    value={props.epochs}
                    onChange={(e) => onEpochChange(e.target.value)}
                    placeholder="No. of Epochs"
                    className="input lg:hidden input-bordered input-primary w-full max-w-xs bg-transparent text-sm font-bold" />
                <div className="hidden lg:block">
                    <ReactSlider
                        className="int-slider"
                        markClassName="slider-mark"
                        min={1}
                        max={15}
                        step={1}
                        value={props.epochs}
                        withTracks
                        onAfterChange={(val) => props.setEpochs(val)}
                        thumbClassName="slider-thumb"
                        trackClassName="slider-track"
                        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                    />
                    <div className="w-full flex items-center justify-between mt-3 text-xs font-bold">
                        <div>Min 1</div>
                        <div>Max 15</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inputs;
