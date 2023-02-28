import { Link } from "react-router-dom"
import { TechCardContainer, CardNumberContainer } from "./styledComponent"

const TechCard = (props) => {
    const { imageUrl, description, index, price, _id } = props.eachCard
    const { borderColors, updateStateForSimilarProdClick } = props

    // console.log("in tech card")
    return (
        <Link to={`/product/${_id}`} className="navLink" onClick={() => updateStateForSimilarProdClick(_id)}>
            <TechCardContainer borderColor={borderColors[index]} direction={index % 2 === 0 ? "to bottom" : "to top"} className="card d-flex flex-column justify-content-around align-items-center mb-5 m-1">
                <img alt="" className={`cardImage w-75`} src={imageUrl} />
                <p className="w-75 text-center">{description.slice(0, 60)}...</p>
                <CardNumberContainer index={index} className="shadow-lg rounded-pill cardNoCon h6 d-flex justify-content-center align-items-center">Rs.{price}</CardNumberContainer>
            </TechCardContainer>
        </Link>
    )
}


export default TechCard