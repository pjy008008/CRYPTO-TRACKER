import { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

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
  color: ${(props) => props.theme.coinListColor};
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
const ThemeToggleBtn = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  color: ${(props) => props.theme.toggleBtnColor};
  background-color: white;
  border-radius: 50%;
  border: none;
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

// const endpoint = "https://api.coinpaprika.com/v1/coins";
const Coins = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<InterfaceCoin[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  });
  return (
    <Container>
      <ThemeToggleBtn
        className={
          isDark ? "material-symbols-outlined" : "material-symbols-outlined"
        }
        onClick={toggleDarkAtom}
      >
        {isDark ? "light_mode" : "dark_mode"}
      </ThemeToggleBtn>
      <Helmet>
        <title>CRYPTO-CURRENCY</title>
      </Helmet>
      <Header>
        <Title>CRYPTO-CURRENCY</Title>
      </Header>
      {isLoading ? (
        <Loader>{"Loading..."}</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://raw.githubusercontent.com/jsupa/crypto-icons/main/icons/${coin.symbol.toLowerCase()}.png`}
                  // src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
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
