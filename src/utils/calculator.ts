
class Calculator {
    static calcPercentDiscount = (origin: number, overwrite: number) => {
        return Number((origin - overwrite) / origin * 100).toFixed(1)
    }
}

export default Calculator;