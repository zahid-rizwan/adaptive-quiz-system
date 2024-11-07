import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const QuizItemCard = ({chapters, image, subjectName, time,questions }) => {
  const navigate=useNavigate();
  const handleNavigate = () => {
    navigate('/dashboard/quiz-view',{state:{
      chapters:chapters,
      image:image,
      subjectName:subjectName,
      time:time,
      questions:questions
    }})
  }

  useEffect(()=>{
    console.log("questions:",questions);
  },[])
  return (
    <div className="w-4/12 flex justify-center items-center px-2 py-2" onClick={()=>handleNavigate()}>
      <div

        className="h-[80px] cursor-pointer w-full bg-cover rounded-xl border overflow-hidden"
        // style={{ backgroundImage: `url(${image})` }}
      >
        <div className="h-full w-full flex flex-col justify-center p-2 ">
          {/* <div className="bg-white rounded-lg w-max px-3 text-primary text-sm font-medium py-1">
            {time}
          </div> */}
          <div className="w-full bg-primary rounded-xl p-5  shadow-xl">
            <p className="text-white text-sm">{subjectName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizItemCard;
