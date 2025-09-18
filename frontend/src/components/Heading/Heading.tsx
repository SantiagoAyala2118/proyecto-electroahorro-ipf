
type HeadingProps = {
  highlight: string;
  heading: string;
}
const Heading = (props: HeadingProps) => {
  return (
    <div className="w-fit mx-auto">
            <h2 className="text-5xl font-bold">
              <span className="text-lime-500">{props.highlight} </span> <span className='text-white'>{props.heading}</span>
              </h2>

            <div className="w-50 h-1 bg-lime-400 mt-3 ml-auto" ></div>
          </div>
  )
}

export default Heading
