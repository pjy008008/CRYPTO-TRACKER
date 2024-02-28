import { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
  max-width: 480px;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Loader = styled.div`
  text-align: center;
  display: block;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;
interface InterfaceCoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
// const coins = [
//   {
//     id: "btc-bitcoin",
//     name: "Bitcoin",
//     symbol: "BTC",
//     rank: 1,
//     is_new: false,
//     is_active: true,
//     type: "coin",
//   },
//   {
//     id: "eth-ethereum",
//     name: "Ethereum",
//     symbol: "ETH",
//     rank: 2,
//     is_new: false,
//     is_active: true,
//     type: "coin",
//   },
//   {
//     id: "hex-hex",
//     name: "HEX",
//     symbol: "HEX",
//     rank: 3,
//     is_new: false,
//     is_active: true,
//     type: "token",
//   },
// ];
// const apiUrl = "https://api.coinpaprika.com/v1/coins"
// const endpoint = "https://api.coinpaprika.com/v1/coins";
const Coins = () => {
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const data = await response.json();
  //     setCoins(data.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);
  const { isLoading, data } = useQuery<InterfaceCoin[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  });
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loader>{"Loading..."}</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};
export default Coins;
