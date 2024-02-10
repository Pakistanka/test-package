//@ts-nocheck
import { Lucid, Blockfrost, Data, Constr, Utils, sha256 } from "lucid-cardano";
import { BoostedStakeScript } from "../utils";


export const editLiquidity = async (apr, amount,epochs,poolUsed) => {
    try {
        const lucid = await Lucid.new(new Blockfrost(process.env.NEXT_PUBLIC_BLOCKFROST_API, process.env.NEXT_PUBLIC_BLOCKFROST_KEY), process.env.NEXT_PUBLIC_BLOCKFROST_NETWORK);
        const walletApi = await window.cardano[JSON.parse(localStorage.wallet)?.name].enable();
        lucid.selectWallet(walletApi);

        const validatorHash = lucid.utils.validatorToScriptHash(BoostedStakeScript);

        const CredentialSC = lucid.utils.scriptHashToCredential(validatorHash);

        const user=await lucid.wallet.address();
        const { paymentCredential, stakeCredential } = lucid.utils.getAddressDetails(
            user
        );


        let lower = (Date.now() - 100000)
        let upper = (Date.now() + 500000)

        lower = lower - lower % 1000;
        upper = upper - upper % 1000;

        let referenceScript = undefined
        let fluidFeesAddress = undefined

        if (process.env.NEXT_PUBLIC_CARDANO_NETWORK == "mainnet") {
          fluidFeesAddress="addr1x9kthtapue4w4dydhcd2pnzy367scq0lfc7n56g9apdhngucvkdzwqd9uvmx6lzg706d6005gcflpkhjwxct3j8d84sqw2gxus"
        referenceScript=await lucid.utxosByOutRef([{ txHash: "2c812d5ba6d240eea79dca528f22a3854adcaac140f3151ecbcf5d945c5981e3", outputIndex: 0 }])
        }else{
          fluidFeesAddress="addr_test1qzs3xlw7vahd788r6kwaalmel4l30x29xaac2etj7gh8yc58ddqu446gw9z8wet3tfhcp93ynp78xt7m3j9pjr06ct5sevysxa"
        referenceScript=await lucid.utxosByOutRef([{ txHash: "a9a87c30882f65e5cec6bb7cb75f0fc12b99297ee8d822258a59609e3e2fcd9c", outputIndex: 0 }])
        }
        let tx = await lucid
        .newTx()

        let i=0;

        while(i<poolUsed.length){
            const utxo=await lucid.utxosByOutRef([{ txHash: poolUsed[i].rentUtxoId.substring(0, 64), outputIndex: parseInt(poolUsed[i].rentUtxoId.substring(65)) }])
              const redeemerRequest=Data.to(
                new Constr(1,[
                ])
              )
              tx=tx.collectFrom(utxo,redeemerRequest)
                 .readFrom(referenceScript)
            i=i+1;
            }



            const addressLiquidity = lucid.utils.credentialToAddress(CredentialSC, stakeCredential);
            const payment_vkh = new Constr(0, [paymentCredential.hash]);
            const staking_vkh = new Constr(0, [stakeCredential.hash]); //secondo me qua è 0
            const staking_inline = new Constr(0, [new Constr(0, [staking_vkh])])
            const addressCbor = new Constr(0, [payment_vkh, staking_inline])

            const dailyPrice = Math.ceil(apr / 5 * 137)
            const poolSize = BigInt(parseInt(amount)) * 1000000n
            const minDays = 1
            const multiples = 5
            const Realdeadline = parseInt(epochs)*5*86400000+Date.now()

            const datumRequest = Data.to(new Constr(0,
                [addressCbor,//policy Borrower
                    "",//HERE THE POLICY OF THE TOKEN, if ADA is empty
                    "",//HERE THE ASSETNAME IN HEX, if ADA is empty
                    BigInt(dailyPrice),//HERE THE PRICE BEWARE OF DECIMALES
                    "",//HERE THE POLICY OF THE TOKEN, if ADA is empty
                    "",//HERE THE ASSETNAME IN HEX, if ADA is empty
                    poolSize,//HERE THE PRICE BEWARE OF DECIMALES
                    BigInt(1000000),//divider
                    addressCbor,
                    BigInt(0),
                    BigInt(Realdeadline),
                    addressCbor,
                    BigInt(0),
                    BigInt(minDays),
                    BigInt(multiples)
                ])
            );

            const nfts = {}
            //This is the unit of the NFT I want to sell policyid+assetname
            nfts['lovelace'] = poolSize

            tx=await tx.validFrom(lower)
            .validTo(upper)
            .payToContract(addressLiquidity, { inline: datumRequest }, nfts)
            .addSignerKey(paymentCredential.hash)
            .complete();

            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();

            return true;
    }
    catch(err){
        console.log(err)
        return false;
    }

}
