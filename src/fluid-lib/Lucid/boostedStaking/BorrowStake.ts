//@ts-nocheck
import { Lucid, Blockfrost, Data, Constr, Utils, sha256 } from "lucid-cardano";
import { BoostedStakeScript } from "../utils";
import * as FluidLib from './../../../fluid-lib';

export const borrowStake = async (amount, epochs) => {
  try {
    const lucid = await Lucid.new(new Blockfrost(process.env.NEXT_PUBLIC_BLOCKFROST_API, process.env.NEXT_PUBLIC_BLOCKFROST_KEY), process.env.NEXT_PUBLIC_BLOCKFROST_NETWORK);
    const walletApi = await window.cardano[JSON.parse(localStorage.wallet)?.name].enable();
    lucid.selectWallet(walletApi);

    const validatorHash = lucid.utils.validatorToScriptHash(BoostedStakeScript);

    const CredentialSC = lucid.utils.scriptHashToCredential(validatorHash);



    const address = await lucid.wallet.address()
    const { paymentCredential, stakeCredential } = lucid.utils.getAddressDetails(address);
    const addressActive = lucid.utils.credentialToAddress(CredentialSC, stakeCredential);
    const payment_vkh = new Constr(0, [paymentCredential.hash]);
    const staking_vkh = new Constr(0, [stakeCredential.hash]); //secondo me qua è 0
    const staking_inline = new Constr(0, [new Constr(0, [staking_vkh])])
    const addressCbor = new Constr(0, [payment_vkh, staking_inline])

    console.log(amount)
    console.log(epochs)
    const borrowAmount = BigInt(amount) * 1000000n
    const days = 5 * epochs
    const Realdeadline = days*86400000+Date.now()
    let pool;
    try {
      pool = await FluidLib.StakeBoost.getAvailablePools(Number(borrowAmount).toString(), 0, stakeCredential.hash,Realdeadline.toString());
      //pool = await FluidLib.StakeBoost.getAvailablePools(Number(borrowAmount).toString(), 0, stakeCredential.hash);
    }
    catch (err) {
      console.log(err);
    }

    let poolsUsed = []
    let counterAmount = Number(borrowAmount)
    let i = 0
    console.log(pool)
    while ((i < 8) && (counterAmount > 0)) {
      try {
        console.log(pool[i])
        if (pool[i].rentData.poolAmount - counterAmount <= 0) {
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
        console.log(counterAmount)
      } catch (e) {
        i++
        console.log(e)
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
    console.log(holder)
    poolsUsed = poolsUsed.sort(function (a, b) { return a.rentUtxoId.localeCompare(b.rentUtxoId); });



    let lower = (Date.now() - 100000)
    let upper = (Date.now() + 500000)

    lower = lower - lower % 1000;
    upper = upper - upper % 1000;


    //THIS IS ONLY TESTNET!!!!
    let referenceScript = undefined
    let fluidFeesAddress = undefined

    if (process.env.NEXT_PUBLIC_CARDANO_NETWORK == "mainnet") {
      fluidFeesAddress="addr1x9kthtapue4w4dydhcd2pnzy367scq0lfc7n56g9apdhngucvkdzwqd9uvmx6lzg706d6005gcflpkhjwxct3j8d84sqw2gxus"
    referenceScript=await lucid.utxosByOutRef([{ txHash: "2c812d5ba6d240eea79dca528f22a3854adcaac140f3151ecbcf5d945c5981e3", outputIndex: 0 }])
    }else{
      fluidFeesAddress="addr_test1qzs3xlw7vahd788r6kwaalmel4l30x29xaac2etj7gh8yc58ddqu446gw9z8wet3tfhcp93ynp78xt7m3j9pjr06ct5sevysxa"
    referenceScript=await lucid.utxosByOutRef([{ txHash: "a9a87c30882f65e5cec6bb7cb75f0fc12b99297ee8d822258a59609e3e2fcd9c", outputIndex: 0 }])
    }
    //a9a87c30882f65e5cec6bb7cb75f0fc12b99297ee8d822258a59609e3e2fcd9c
    let tx = await lucid
      .newTx()



    i = 0
    console.log(poolsUsed)
    while (i < poolsUsed.length) {
      const utxo = await lucid.utxosByOutRef([{ txHash: poolsUsed[i].rentUtxoId.substring(0, 64), outputIndex: parseInt(poolsUsed[i].rentUtxoId.substring(65)) }])
      console.log(utxo)
      const redeemerRequest = Data.to(
        new Constr(2, [
          BigInt(days),
          BigInt(i),
          BigInt(poolsUsed[i].amountUsed),
          addressCbor
        ])
      )
      console.log(redeemerRequest)

      const datumUtxo = Data.from(utxo[0].datum)
      const datumActive = Data.to(new Constr(0,
        [datumUtxo.fields[0],//policy Borrower
        datumUtxo.fields[1],//HERE THE POLICY OF THE TOKEN, if ADA is empty
        datumUtxo.fields[2],//HERE THE ASSETNAME IN HEX, if ADA is empty
        datumUtxo.fields[3],//HERE THE PRICE BEWARE OF DECIMALES
        datumUtxo.fields[4],//HERE THE POLICY OF THE TOKEN, if ADA is empty
        datumUtxo.fields[5],//HERE THE ASSETNAME IN HEX, if ADA is empty
        BigInt(poolsUsed[i].amountUsed),//HERE THE PRICE BEWARE OF DECIMALES
        datumUtxo.fields[7],
          addressCbor,
        BigInt(upper + 86400000 * days),
        datumUtxo.fields[10],
        datumUtxo.fields[11],
        datumUtxo.fields[12],
        datumUtxo.fields[13],
        datumUtxo.fields[14]
        ])
      );
      const ownerCredential = lucid.utils.keyHashToCredential(poolsUsed[i].rentData.renterAddress[1])
      const addressPartial = lucid.utils.credentialToAddress(CredentialSC, ownerCredential)
      console.log("parziale, uso")
      console.log(addressPartial)
      console.log(poolsUsed[i].rentData.poolAmount)
      console.log(poolsUsed[i].amountUsed)
      const datumRefill = Data.to(new Constr(0,
        [datumUtxo.fields[0],//policy Borrower
        datumUtxo.fields[1],//HERE THE POLICY OF THE TOKEN, if ADA is empty
        datumUtxo.fields[2],//HERE THE ASSETNAME IN HEX, if ADA is empty
        datumUtxo.fields[3],//HERE THE PRICE BEWARE OF DECIMALES
        datumUtxo.fields[4],//HERE THE POLICY OF THE TOKEN, if ADA is empty
        datumUtxo.fields[5],//HERE THE ASSETNAME IN HEX, if ADA is empty
        BigInt(poolsUsed[i].rentData.poolAmount - poolsUsed[i].amountUsed),//HERE THE PRICE BEWARE OF DECIMALES
        datumUtxo.fields[7],
        datumUtxo.fields[0],//HERE IF POOL WAS RETURNED NEEDS TO CHANGE
        datumUtxo.fields[9],
        datumUtxo.fields[10],
        datumUtxo.fields[11],
        datumUtxo.fields[12],
        datumUtxo.fields[13],
        datumUtxo.fields[14]
        ])
      );
      console.log(datumActive)
      console.log(datumRefill)
      if (!poolsUsed[i].partial) {
        tx = tx.collectFrom(utxo, redeemerRequest)
          .readFrom(referenceScript)
          .payToContract(addressActive, { inline: datumActive }, { ["lovelace"]: BigInt(poolsUsed[i].amountUsed) })
          .payToAddress(address, { ["lovelace"]: 1000000n })
      } else {
        console.log("prelevo e mando indietro")
        console.log(BigInt(poolsUsed[i].amountUsed))
        console.log(BigInt(poolsUsed[i].rentData.poolAmount - poolsUsed[i].amountUsed))
        tx = tx.collectFrom(utxo, redeemerRequest)
          .readFrom(referenceScript)
          .payToContract(addressActive, { inline: datumActive }, { ["lovelace"]: BigInt(poolsUsed[i].amountUsed) })
          .payToContract(addressPartial, { inline: datumRefill }, { ["lovelace"]: BigInt(poolsUsed[i].rentData.poolAmount - poolsUsed[i].amountUsed) })
      }
      i++
    }


    i = 0



    while (i < poolsUsed.length) {
      const spendingCredential = lucid.utils.keyHashToCredential(poolsUsed[i].rentData.renterAddress[0])
      const ownerCredential = lucid.utils.keyHashToCredential(poolsUsed[i].rentData.renterAddress[1])
      const ownerPaymentAddress = lucid.utils.credentialToAddress(spendingCredential, ownerCredential)
      console.log("I will pay this for these days")
      console.log(BigInt((Number(poolsUsed[i].amountUsed) / 1000000) * days * poolsUsed[i].rentData.dailyRentAmount))
      console.log(days)
      console.log(ownerPaymentAddress)

      console.log(BigInt((Number(poolsUsed[i].amountUsed) / 1000000) * days * poolsUsed[i].rentData.dailyRentAmount))

      tx = tx.payToAddress(ownerPaymentAddress, { ["lovelace"]: BigInt((Number(poolsUsed[i].amountUsed) / 1000000) * days * poolsUsed[i].rentData.dailyRentAmount) })
        .payToAddress(fluidFeesAddress, { ["lovelace"]: BigInt(Math.max((Number(poolsUsed[i].amountUsed) / 1000000) * days * 28), 1000000) })
      i++
    }


    console.log(await tx.toString())

    tx = await tx.validFrom(lower)
      .validTo(upper)
      .complete();



    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();
    console.log(txHash)
    return true;
  }
  catch (err) {
    console.log(err);
    return false;
  }
}
