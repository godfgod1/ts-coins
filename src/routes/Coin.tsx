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


interface InfoData{
  id:string;
  name:string;
  symbol:string;
  rank:number;
  is_new:boolean;
  is_active:boolean;
  type:string;
  contract:string;
  platform:string;

  description:string;
  message:string;
  open_source:boolean;
  development_status:string;
  hardware_wallet:boolean;
  proof_type:string;
  org_structure:string;
  hash_algorithm:string;
  first_data_at:string;
  last_data_at:string;
}

interface PriceData{
id:string;
name:string;
symbol:string;
rank:number;
circulating_supply:number;
total_supply:number;
max_supply:number;
beta_value:number;
first_data_at:string;
last_updated:string;
quotes:{
  USD:{
    ath_date: string;
ath_price: number
market_cap:number
market_cap_change_24h: number
percent_change_1h: number
percent_change_1y: number
percent_change_6h:number
percent_change_7d: number
percent_change_12h: number
percent_change_15m: number
percent_change_24h: number
percent_change_30d: number
percent_change_30m: number
percent_from_price_ath: number
price: number
volume_24h: number
volume_24h_change_24h: number
  }
};
}

export default function Coin(){
  const [loading, setLoading] = useState(true);
  const param = useParams() ;
  const coinId = param.coinId ;
  const location = useLocation();
  const state = location.state as RouteState;
  const [ info, setInfo ] = useState<InfoData>()
  const [ priceInfo, setPriceInfo ] = useState<PriceData>()

  useEffect(()=>{
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      console.log(infoData)
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log(priceData)
      setInfo(infoData)
      setPriceInfo(priceData)
    })()
  },[])

  return (
  <Container>
    <Header>
      <Title>{state?.name || "Loading"}</Title>
    </Header>
    {loading ? <Loader>"Loading..."</Loader>:priceInfo?.quotes.USD.ath_date}
  </Container>
  )
}