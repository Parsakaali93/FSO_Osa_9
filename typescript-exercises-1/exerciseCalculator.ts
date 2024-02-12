interface results {
    days: number,
    trainingDays: number,
    targetHours: number,
    averageHours: number,
    targetReached: boolean,
    rating: number,
    feedback: string
}

export const calculateExercise = (trainingData: number[], target: number):results => 
{
    const days = trainingData.length;
    const trainingDays = trainingData.filter(hours => hours > 0).length;

    const sum = trainingData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const averageHours = sum / trainingData.length;

    const targetReached = averageHours >= target;
    let rating;
    let ratingFeedback;

    if(averageHours >= target)
    {
        rating = 3;
        ratingFeedback = "Well done, you've reached your target!";
    }

    else if(averageHours >= target * 0.8)
    {
        rating = 2;
        ratingFeedback = "You almost reached your target!";
    }

    else
    {
        rating = 1;
        ratingFeedback = "Lazy!";
    }

    return{
        days: days,
        trainingDays: trainingDays,
        targetHours: target,
        averageHours: averageHours,
        targetReached: targetReached,
        rating: rating,
        feedback: ratingFeedback
    };
};

const cliArgs = process.argv.slice(3);
const numbers = cliArgs.map(arg => parseFloat(arg));

const target = Number(process.argv[2]);

if (isNaN(target))
    console.log("Invalid target");

else{
    if (numbers.some(isNaN)) {
    console.log("Please provide valid numbers as command-line arguments.");
    } else {
    console.log(calculateExercise(numbers, target));
    }
}

