//@ts-nocheck
import { Lucid, Blockfrost, Data, Constr, Utils, sha256 } from "lucid-cardano";
import * as FluidLib from './../../../fluid-lib';
import { BoostedStakeScript } from "../utils";


export const getBorrowDetails = async (amount, epochs, deadline) => {
    const lucid = await Lucid.new(new Blockfrost(process.env.NEXT_PUBLIC_BLOCKFROST_API, process.env.NEXT_PUBLIC_BLOCKFROST_KEY), process.env.NEXT_PUBLIC_BLOCKFROST_NETWORK);
    const walletApi = await window.cardano[JSON.parse(localStorage.wallet)?.name].enable();
    lucid.selectWallet(walletApi);

    const validatorHash = lucid.utils.validatorToScriptHash(BoostedStakeScript);

    const CredentialSC = lucid.utils.scriptHashToCredential(validatorHash);

    const days = 5 * epochs
    const Realdeadline = days*86400000+Date.now()
    const address = await lucid.wallet.address()
    const { paymentCredential, stakeCredential } = lucid.utils.getAddressDetails(address);
    const borrowAmount = BigInt(amount) * 1000000n

    let pool;
    try {
        pool = await FluidLib.StakeBoost.getAvailablePools(Number(borrowAmount).toString(), 0, stakeCredential.hash,Realdeadline.toString());
    }
    catch (err) {
        console.log(err);
    }

    const poolsUsed = []
    let counterAmount = Number(borrowAmount)
    let i = 0
    while ((i < 8) && (counterAmount > 0)) {
        try {
            if (counterAmount - pool[i].rentData.poolAmount > 0) {
                poolsUsed.push(pool[i])
                poolsUsed[i].partial = false
                poolsUsed[i].amountUsed = pool[i].rentData.poolAmount
                counterAmount = counterAmount - pool[i].rentData.poolAmount
                i++
            } else {
                poolsUsed.push(pool[i])
                poolsUsed[i].partial = true
                poolsUsed[i].amountUsed = counterAmount
                counterAmount = counterAmount - pool[i].rentData.poolAmount
                i++
            }
        } catch (e) {
            i++;
        }
    }

    const holder = {};

    poolsUsed.forEach(function (d) {
        if (holder.hasOwnProperty("amountUsed")) {
            holder.amountUsed = holder.amountUsed + d.amountUsed;
        } else {
            holder.amountUsed = d.amountUsed
        }
        if (holder.hasOwnProperty("apr")) {
            holder.apr = holder.apr + d.rentData.dailyRentAmount * d.amountUsed / 1000000 / 1000000;
        } else {
            holder.apr = d.rentData.dailyRentAmount * d.amountUsed / 1000000 / 1000000;
        }
    });

    holder.apr = holder.apr / holder.amountUsed
    holder.feelenders = holder.apr * holder.amountUsed * days
    holder.feeprotocol = 28 * holder.amountUsed * days / 1000000
    holder.apr = holder.apr * 5 / 137 * 1000000 * 1000000
    //ADAWG THIS IS THE LIQUIDITY AVAILABLE FOR RENT WITH THE APR AND FEE TO PAY
    //THIS IS WHAT HAS TO BE SHOWN ON CONFIRMATION (It's in ADA)
    return holder;
}
