import styled from "styled-components"


export const TechCardContainer = styled.div`
height: 55vh;
width: 40vh;
border-radius: 20px;
border-width:30px 0px 0px 0px;
border-color: ${props => props.borderColor};
position: relative;
background-image: linear-gradient(to bottom, white 55%, #bbdefb);
`

export const CardNumberContainer = styled.div`
height: 30px;
width: 100px;
background-image:linear-gradient(to top, white, #bbdefb);
position: absolute;
left: 40 %;
top:-48px;

`
// top:${props => props.index % 2 === 0 ? "-48px" : "none"};