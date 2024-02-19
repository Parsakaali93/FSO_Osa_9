import { CoursePart } from "../types";
import Part from "./Part";
  const Content: React.FC<{ parts: CoursePart[] }> = (props) => {
    return (
        <div>
            {props.parts.map((part) => <Part part={part}/>) }
        </div>
    )
  }
  
  export default Content;