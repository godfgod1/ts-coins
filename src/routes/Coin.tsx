import {useParams} from "react-router"
import styled from 'styled-components'; 

interface RouterParams{
  coinId:string
}




const Title = styled.h1`
  color:${props => props.theme.accentColor};
  font-size:100px;

`

export default function Coin(){
  const {coinId} = useParams()
  
  return <Title>코인{coinId}</Title>
}