import { CoursePart } from "../types";

const assertNever = (value: never): never => {
throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
);
};

const Part: React.FC< {part: CoursePart} > = ({ part }) => {
    return (
      <div>
        {(() => {
          switch (part.kind) {
            case "basic":
              return (
                <div>
                  <p><b>{part.name}</b></p>
                  <p>Exercises: {part.exerciseCount}</p>
                  <p>Description: {part.description}</p>
                </div>
              );
  
            case "group":
              return (
                <div>
                  <p><b>{part.name}</b></p>
                  <p>Exercises: {part.exerciseCount}</p>
                  <p>Group Projects: {part.groupProjectCount}</p>
                </div>
              );
  
            case "background":
              return (
                <div>
                  <p><b>{part.name}</b></p>
                  <p>Exercises: {part.exerciseCount}</p>
                  <p>Description: {part.description}</p>
                  <p>Background Material: {part.backgroundMaterial}</p>
                </div>
              );

              case "special":
              return (
                <div>
                  <p><b>{part.name}</b></p>
                  <p>Exercises: {part.exerciseCount}</p>
                  <p>Description: {part.description}</p>
                  <div><p>Requirements: {part.requirements.map((r) => <p style={{display: "inline-block", marginRight: 5}}>{r + ","}</p>)}</p></div>
                </div>
              );
  
            default:
              return assertNever(part);
          }
        })()}
      </div>
    );
  };

  export default Part;