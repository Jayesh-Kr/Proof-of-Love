import "./landingpagecard.css";

// eslint-disable-next-line react/prop-types
const LandingPageCard = ({Logo,title,description}) => {
  return (
    <div className="card">
      <Logo/>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  )
}

export default LandingPageCard