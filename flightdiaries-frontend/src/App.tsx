import { useEffect, useState } from 'react'
import { getAllDiaries, createDiary } from './services/diaryService'
import { DiaryEntry } from './types';
import { Weather, Visibility } from './types';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
  const [weather, setWeather] = useState<Weather>(Weather.Sunny)
  const [comment, setComment] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  useEffect(() => {
    if (error !== '') {
      const timer = setTimeout(() => {
        setError('');
      }, 5000); 
  
      return () => clearTimeout(timer);
    }
  }, [error]);

  const submitDiary = (event: React.SyntheticEvent) => {
    event.preventDefault() 

    const newDiary = {
      visibility: visibility,
      weather: weather,
      comment: comment,
      date: date
    }

    createDiary(newDiary)
    .then(response => {
      console.log('Diary entry created successfully:', response);
    })
    .catch(error => {
      setError(error)
    });
  };

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value as Visibility);
  };
  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value as Weather);
  };
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
    console.log(date)
  };

  return (
    <div>
      <h1 style={{marginLeft:30}}>Flight Diaries</h1>

      <div className='submitForm'>
        <form onSubmit={submitDiary}>
          <p style={{color:"red"}}>{error}</p>

          <input type="date" onChange={handleDateChange} value={date} id="start" name="trip-start" />
 
          <h3>Weather</h3>
          <div className='weatherButtons' style={{ display: 'flex' }}>
          {Object.values(Weather).map(w => (
            <div key={w} >
              <label >
                <input 
                  type="radio"
                  value={w}
                  checked={w === weather}
                  onChange={handleWeatherChange}
                />
                {w}
              </label>
            </div>
           ))}
           </div>
           <h3>Visibility</h3>
           <div className='visibilityButtons' style={{ display: 'flex' }}>
          {Object.values(Visibility).map(w => (
            <div key={w} >
              <label >
                <input 
                  type="radio"
                  value={w}
                  checked={w === visibility}
                  onChange={handleVisibilityChange}
                />
                {w}
              </label>
            </div>
           ))}

           
           </div>
           <h3 style={{marginBottom:0}}>Comment</h3>
          <input type="text" value={comment} onChange={handleCommentChange} placeholder="Enter comment..."></input>
          <button type='submit' style={{marginTop: 30, display:"block"}}>SUBMIT</button>
        </form>
      </div>

      <ul>
        {
        diaries.map(d =>
        <div key={d.id}>
          <h3>{d.date}</h3>
          <p style={{margin:0}}>Weather: {d.weather}</p>
          <p style={{margin:0}}>Visibility: {d.visibility}</p>
          <p>{d.comment}</p>
        </div>
        )
      }
      </ul>
    </div>
  )
}

export default App
