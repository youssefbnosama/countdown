import { useEffect, useRef, useState } from 'react';
import './App.css';
import img1 from './images/icon-facebook.svg'
import img2 from './images/icon-instagram.svg'
import img3 from './images/icon-pinterest.svg'
function App() {
  const [sec,setSec] = useState(59)
  const [min,setMin] = useState(59)
  const [hr,setHr] = useState(23)
  const [day,setDay] = useState(15)
  useEffect(()=>{
    if(localStorage.getItem(`date`) == null){
      localStorage.setItem(`date`,Math.floor(new Date().getTime() / 1000))
    }
  },[])
  useEffect(()=>{
    let a = Math.floor(new Date().getTime()/1000) - localStorage.getItem(`date`)
    if(a < 60){
      setSec(59 - a)
    } else if(a < 60 * 60){
      setSec(59 - (Math.floor((a/60 -Math.floor(a/60)) * 60))) 
      setMin(59 - Math.floor(a/60))     
    }else if(a < 60*60*24){
      setHr(23 - Math.floor(a/3600 ))
     let x =  ((a/3600) - Math.floor(a/3600 )) * 60
      setMin(59 - Math.floor(x))
      let y = (x - Math.floor(x))* 60 
      setSec(59 - Math.floor(y))
    } else{
      const all = a / (60 * 60 * 24)
    let x =   Math.floor(all)
    setDay(15 - x)
    let y = (all - x) * 24
      setHr( 23 - Math.floor(y))
      const z = (y - Math.floor(y)) * 60
      setMin(59 - Math.floor(z))
      const s = Math.floor((z-Math.floor(z))* 60)
      setSec(59 - s)
    }
  },[])
 useEffect(()=>{
    if(sec == -1){
   setSec(59)
   setMin(min - 1)
  }
  if(min == -1){
    setMin(59)
    setHr(hr - 1)
  }
  if(hr == 0 && min == 0 && sec == -1){
    setSec(59)
    setMin(59)
    setHr(23)
    setDay(day - 1)
  }
  if(day == 0){
    setSec(59)
    setMin(59)
    setHr(23)
    setDay(15)
    localStorage.removeItem(`date`)
  }
  setTimeout(() => {
    setSec(sec - 1)
  }, 1000);
  },[sec])
  return (
    <div className="App w-full h-screen relative flex justify-center items-center">
      <div className=' absolute w-full h-full stars'></div>
      <div className=' absolute w-full h-1/3 mountain  bottom-0'></div>
      <div className=' w-3/5 mx-auto flex flex-col justify-between h-1/2 '>
        <div>
          <h2 className=' z-2 uppercase text-center text-2xl text-white tracking-wider'>we're launching soon</h2>
            <div className='par flex uppercase justify-between'>
              <div className=' rounded flex flex-col'><div className=' text-5xl font-extrabold ' >{day}</div><span className=' text-white self-center'>days</span></div>
              <div className=' rounded flex flex-col'><div className=' text-5xl font-extrabold '>{hr}</div><span className=' text-white self-center'>hours</span></div>
              <div className=' rounded flex flex-col'><div className=' text-5xl font-extrabold ' >{min}</div><span className=' text-white self-center'>minutes</span></div>
              <div className=' rounded flex flex-col'><div className=' text-5xl font-extrabold ' >{sec}</div><span className=' text-white self-center'>secodes</span></div>
            </div>
        </div> 
        <ul className=' w-1/5 place-self-center flex list-none justify-between'>
          <li><img src={img1} /></li>
          <li><img src={img2} /></li>
          <li><img src={img3} /></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
