//@ts-nocheck
import { Lucid, Blockfrost, Data, Constr, Utils, sha256 } from "lucid-cardano";
import { BoostedStakeScript } from "../utils";


export const addLiquidity = async (apr, amount,epochs) => {
    try {
        const lucid = await Lucid.new(new Blockfrost(process.env.NEXT_PUBLIC_BLOCKFROST_API, process.env.NEXT_PUBLIC_BLOCKFROST_KEY), process.env.NEXT_PUBLIC_BLOCKFROST_NETWORK);
        const walletApi = await window.cardano[JSON.parse(localStorage.wallet)?.name].enable();
        lucid.selectWallet(walletApi);

        const validatorHash = lucid.utils.validatorToScriptHash(BoostedStakeScript);

        const CredentialSC = lucid.utils.scriptHashToCredential(validatorHash);


        const { paymentCredential, stakeCredential } = lucid.utils.getAddressDetails(
            await lucid.wallet.address(),
        );

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


        const tx = await lucid
            .newTx()
            .payToContract(addressLiquidity, { inline: datumRequest }, nfts)
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
