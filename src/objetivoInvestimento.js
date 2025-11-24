export function convertToMontlyReturnRate(yearlyReturnRate) {
    return yearlyReturnRate ** (1/12)
    // taxa de retorno anual
}

export async function generateReturnsArray(
    startingAmount = 0, 
    // amount = quantia
    // quantia inicial
    timeHorizon = 0, 
    //horizonte temporal
    timePeriod = 'monthly', 
    // período de tempo
    monthlyContribution = 0, 
    // contribuição mensal
    returnRate = 0, 
    // returnRate = taxa de retorno
    returnTimeFrame = 'monthly'
    // período de retorno
)
    {
        if (!timeHorizon || !startingAmount) {
            throw new Error('Investimento inicial e prazo devem ser preenchidos com valores positivos.')
        }

        const finalReturnRate =
            returnTimeFrame === 'monthly'
            ?1 + returnRate / 100
            :convertToMontlyReturnRate(1 + returnRate / 100)//Descobrindo a taxa mensal composta

        const finalTimeHorizon = 
            timePeriod === 'monthly'
            ?timePeriod
            :timePeriod * 12

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
        for (let timeReference =1; timeReference <= finalTimeHorizon; timeReference++){

        }
}