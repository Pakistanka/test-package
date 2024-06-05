import { FC } from "react";

import FAQ from "./FAQ/FAQ";
import Button from "../../shared/Button";


const ActionType: FC = (props: any) => {
    return (
        <div className="w-full h-full flex flex-col min-h-[375px] items-center justify-center">
        <div className="font-exBold uppercase tracking-wider text-base-300">Boosted Stake</div>
        <div className="font-bold text-sm uppercase tracking-wider text-base-300">Best yield on Cardano</div>
        <div className="flex items-center gap-5 mt-7">
            <Button onClick={() => props.setActionType('Borrow')}>Borrow stake</Button>
        </div>
        <div className="mt-4 w-full">

            <div className="collapse collapse-arrow w-full bg-lighter-gray dark:bg-darker-gray">
                <input type="checkbox" />
                <div className="collapse-title">
                    <div className="font-bold text-base-300">FAQ</div>
                </div>
                <div className="collapse-content w-full">
                    <FAQ />
                </div>
            </div>

        </div>
    </div>
    )
}

export default ActionType;
