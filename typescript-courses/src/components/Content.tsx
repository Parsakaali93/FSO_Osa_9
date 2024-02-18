interface ContentProps {
    parts: Part[];
  }

interface Part {
    name: string;
    exerciseCount: number;
}

const Content = (props: ContentProps) => {
    const elements = props.parts.map((part) => <p>{part.name} {part.exerciseCount}</p>);

    return (
        <div>
            {elements}
        </div>
    )
  }
  
  export default Content;