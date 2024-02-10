const FAQ = () => {

    return (
        <div className="flex flex-col w-full">
            <div className="collapse collapse-plus bg-lighter-gray dark:bg-darker-gray">
                <input type="checkbox" />
                <div className="collapse-title text-sm font-medium text-base-300">
                    What is Boosted Staking?
                </div>
                <div className="collapse-content text-xs -mt-2 text-darker-gray">
                    <p>
                        With Boosted Staking, you can now lend or borrow your
                        desired amount of ADA delegation and use them for ISPOs, airdrops & more.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-lighter-gray dark:bg-darker-gray">
                <input type="checkbox" />
                <div className="collapse-title text-sm font-medium text-base-300">
                    How do I Borrow Stake?
                </div>
                <div className="collapse-content text-xs -mt-2 text-darker-gray">
                    <p>
                        Borrowers can borrow ada delegation for the number of epoch they need it, this ADA cannot be spent.
                        <br />You can borrow the delegation by choosing the amount and the no. of epochs you'd need the
                        stake amount attached to your address and pay a fee accordingly.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-lighter-gray dark:bg-darker-gray">
                <input type="checkbox" />
                <div className="collapse-title text-sm font-medium text-base-300">
                    How do I Provide Liquidity?
                </div>
                <div className="collapse-content text-xs -mt-2 text-darker-gray">
                    <p>
                        Lenders can provide liquidity for the Boosted Staking and get higher APR than regular staking,
                        the ADA will be locked if used by Borrowers.
                        <br /> You can add the liquidity by choosing a desired APR & amount.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default FAQ;
