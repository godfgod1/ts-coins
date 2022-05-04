import {useLocation,useParams} from "react-router"
import styled from 'styled-components'; 
import {useState, useEffect} from "react"




const Container = styled.div`
  padding: 0px 20px;
  max-width:480px;
  margin:0 auto;
`;


const Header = styled.div`
  height:10vh;
  display:flex;
  justify-content:center;
  align-items:center;

`;


const Loader = styled.span`
  text-align:center
  display:block;
  color:white;
  font-size:50px;
`

const Title = styled.h1`
  color:${props => props.theme.accentColor};
  font-size:100px;

`
interface RouteState{
  name:string
}
interface RouterParams{
  coinId:string
}
export default function Coin(){
  const [loading, setLoading] = useState(true);
  
  const param = useParams() ;
  const coinId = param.coinId ;
  const location = useLocation();
  const state = location.state as RouteState;
  const [ info, setInfo ] = useState({})
  const [ priceInfo, setPriceInfo ] = useState({})

  useEffect(()=>{
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData)
      setPriceInfo(priceData)
    })()
  },[])

  return (
  <Container>
    <Header>
      <Title>{state?.name || "Loading"}</Title>
    </Header>
    {loading ? <Loader>"Loading..."</Loader> : <span>"asdasd</span>}
  </Container>
  )
}