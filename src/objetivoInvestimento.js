export function convertToMontlyReturnRate(yearlyReturnRate) {
    return yearlyReturnRate ** (1/12)
    // taxa de retorno anual
}

export function generateReturnsArray(
    startingAmount = 0, 
    timeHorizon = 0, 
    timePeriod = 'monthly', 
    monthlyContribution = 0, 
    returnRate = 0, 
    returnTimeFrame = 'monthly',
)
    {
        if (!timeHorizon || !startingAmount) {
            console.log('Investimento inicial e prazo devem ser preenchidos com valores positivos.')
        }

        const finalReturnRate =
            returnTimeFrame === 'monthly'
            ?1 + returnRate / 100
            :convertToMontlyReturnRate(1 + returnRate / 100)//Descobrindo a taxa mensal composta

        const finalTimeHorizon = 
            timePeriod === 'monthly'
            ?timeHorizon
            :timeHorizon * 12

        const referenceInvestmentObject = {
            investedAmount: startingAmount,
            interestReturns: 0,
            // retorno de juros
            totalInterestReturns: 0,
            // total retorno de juros
            month: 0,
            totalAmount: startingAmount,
        }

        const returnsArray = [referenceInvestmentObject]

            console.log(finalTimeHorizon)
        for (let timeReference =1; timeReference <= finalTimeHorizon; timeReference++){
            const totalAmount = returnsArray[timeReference - 1].totalAmount * finalReturnRate + monthlyContribution
            //                                                  quantia total (que é o valor inicial) *
            //                                                  o percentual (1.12, por exemplo) + 
            //                                                  o depósito daquele mes
            // exemplo: quantia total = quantia inicial * percentual mensal + valor mensal aplicado
            // 100 * 1.12 + 100 = 212
            // 212 * 1.12 + 100 = 337,44
            // 337,44 ...
            const interestReturns = returnsArray[timeReference - 1].totalAmount * finalReturnRate
            // é o valor com rendimento sem a contribuição/depósito mensal
            const investedAmount = startingAmount + monthlyContribution * timeReference
            const totalInterestReturns = totalAmount - investedAmount //tudo que eu tenho com juros, menos os valores aplicados

            returnsArray.push(
                {
                investedAmount,
                interestReturns,
                totalInterestReturns,
                month: timeReference,
                totalAmount
                },
            )
        }
    return returnsArray
}