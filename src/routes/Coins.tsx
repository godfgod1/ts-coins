import styled from 'styled-components'; 
import { Link } from "react-router-dom";
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
const CoinsList = styled.ul``;
const Coin = styled.li`
  display:flex;
  justify-content:flex-start;
  align-items:center;
  background-color:white;
  color:${props=>props.theme.bgColor};
  border-radius:15px;
  margin-bottom:10px;
  height:50px;
  a{
    display:flex;
    align-items:center;
    transition:color 0.2s ease-in;
    padding:30px;
    
  }
  &:hover{
    a{
      color:${props=>props.theme.accentColor}
    }
  }
  

`;


const Title = styled.h1`
  color:${props => props.theme.accentColor};
  font-size:100px;

`

const Loader = styled.span`
  text-align:center
  display:block;
`
const Img = styled.img`
  width:30px;
  height:30px;
  margin-right:10px;
`

const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
    },
    {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
    },
    {
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
    },
]

interface CoinInterface{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}


export default function Coins(){
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{

    (async()=>{
      setLoading(true)
     const response = await (await fetch("https://api.coinpaprika.com/v1/coins")).json()
      setCoins(response.slice(0,100))
      setLoading(false)
    })()

  },[])

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading && <Loader>"Loading..."</Loader>}

      <CoinsList>
        {coins?.map(coin=>
        (
          <Coin key={coin.id}>
            <Link 
              to={`/${coin.id}`}
              state={{ name: coin.name, rank: coin.rank }}
              >
              <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/>
            {coin.name} &rarr;
            </Link>
          </Coin>
        )
          )}
      </CoinsList>
    </Container>
  )
}