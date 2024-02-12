interface BmiValues {
    height: number;
    weight: number;
  }

export const calculateBmi = (height: number, weight: number) : string => {
    let bmi = weight / ((height / 100)**2)

    let returnString = `Your body mass index: ${bmi}\n`

    if(bmi > 40)
        returnString += "Obese (Class III)"

    else if(bmi >= 35)
        returnString +=  "Obese (Class II)"

    else if(bmi >= 30)
        returnString +=  "Obese (Class I)"

    else if(bmi >= 25)
        returnString +=  "Overweight (Pre-obese)"

    else if(bmi >= 18.5)
        returnString +=  "Normal range"

    else if(bmi >= 17.0)
        returnString +=  "Underweight (Mild thinness)"

    else if(bmi >= 16.0)
        returnString +=  "Underweight (Moderate thinness)"

    else if(bmi < 16.0)
        returnString +=  "Underweight (Severe thinness)"

    return returnString
}

export const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } 
  
  catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
