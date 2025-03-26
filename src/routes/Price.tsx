import { useQuery } from "react-query";
import { fetchCoinTickers } from "./api";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

interface IPriceContext {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string; //최고가 날짜
      ath_price: number; //최고가
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number; //1
      percent_change_1y: number; //6
      percent_change_6h: number; //2
      percent_change_7d: number;
      percent_change_12h: number; //3
      percent_change_15m: number;
      percent_change_24h: number; //4
      percent_change_30d: number; //5
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
const BigTab = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: left;
  background-color: ${(props) => props.theme.ContainerBgColor};
  border-radius: 10px;
  padding: 15px 20px;
`;
const Tabs = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span`
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.ContainerBgColor};
  padding: 7px 0px;
  border-radius: 10px;
`;
const Context = styled.span<{ ispos?: boolean }>`
  color: ${(props) => (props.ispos ? "#e84118" : "#00a8ff")};
`;

const Price = () => {
  const { coinId } = useOutletContext<IPriceContext>();
  const { isLoading, data } = useQuery<PriceData>({
    queryKey: ["priceInfo"],
    queryFn: () => fetchCoinTickers(coinId),
  });

  const setArrow = (data: number) => {
    if (data < 0) {
      return (
        <span
          style={{ fontSize: "33px", color: "#00a8ff", paddingTop: "5px" }}
          className="material-symbols-outlined"
        >
          trending_down
        </span>
      );
    } else {
      return (
        <span
          style={{ fontSize: "33px", color: "#e84118", paddingTop: "5px" }}
          className="material-symbols-outlined"
        >
          trending_up
        </span>
      );
    }
  };
  const checkPositive = (data: number) => {
    return data > 0 ? true : false;
  };

  console.log(data);
  return (
    <>
      <BigTab>
        <span>
          {data?.quotes.USD.ath_date}
          <br />
          최고가 달성
        </span>
        <span style={{ fontSize: "30px" }}>
          ${data?.quotes.USD.ath_price.toFixed(3)}
        </span>
      </BigTab>
      <Tabs>
        <Tab>
          <div
            style={{
              textAlign: "left",
              paddingLeft: "30px",
              paddingTop: "5px",
            }}
          >
            1시간 전보다
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px 30px",
              fontSize: "30px",
              alignItems: "center",
            }}
          >
            <Context
              ispos={checkPositive(data?.quotes.USD.percent_change_1h || 0)}
            >
              {data?.quotes.USD.percent_change_1h}%
            </Context>
            {setArrow(data?.quotes.USD.percent_change_1h || 0)}
          </div>
        </Tab>
        <Tab>
          <div
            style={{
              textAlign: "left",
              paddingLeft: "30px",
              paddingTop: "5px",
            }}
          >
            6시간 전보다
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px 30px",
              fontSize: "30px",
              alignItems: "center",
            }}
          >
            <Context
              ispos={checkPositive(data?.quotes.USD.percent_change_6h || 0)}
            >
              {data?.quotes.USD.percent_change_6h}%
            </Context>
            {setArrow(data?.quotes.USD.percent_change_6h || 0)}
          </div>
        </Tab>
        <Tab>
          <div
            style={{
              textAlign: "left",
              paddingLeft: "30px",
              paddingTop: "5px",
            }}
          >
            12시간 전보다
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px 30px",
              fontSize: "30px",
              alignItems: "center",
            }}
          >
            <Context
              ispos={checkPositive(data?.quotes.USD.percent_change_12h || 0)}
            >
              {data?.quotes.USD.percent_change_12h}%
            </Context>
            {setArrow(data?.quotes.USD.percent_change_12h || 0)}
          </div>
        </Tab>
        <Tab>
          <div
            style={{
              textAlign: "left",
              paddingLeft: "30px",
              paddingTop: "5px",
            }}
          >
            1일 전보다
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px 30px",
              fontSize: "30px",
              alignItems: "center",
            }}
          >
            <Context
              ispos={checkPositive(data?.quotes.USD.percent_change_24h || 0)}
            >
              {data?.quotes.USD.percent_change_24h}%
            </Context>
            {setArrow(data?.quotes.USD.percent_change_24h || 0)}
          </div>
        </Tab>
        <Tab>
          <div
            style={{
              textAlign: "left",
              paddingLeft: "30px",
              paddingTop: "5px",
            }}
          >
            1달 전보다
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px 30px",
              fontSize: "30px",
              alignItems: "center",
            }}
          >
            <Context
              ispos={checkPositive(data?.quotes.USD.percent_change_30d || 0)}
            >
              {data?.quotes.USD.percent_change_30d}%
            </Context>
            {setArrow(data?.quotes.USD.percent_change_30d || 0)}
          </div>
        </Tab>
        <Tab>
          <div
            style={{
              textAlign: "left",
              paddingLeft: "30px",
              paddingTop: "5px",
            }}
          >
            1년 전보다
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px 30px",
              fontSize: "30px",
              alignItems: "center",
            }}
          >
            <Context
              ispos={checkPositive(data?.quotes.USD.percent_change_1y || 0)}
            >
              {data?.quotes.USD.percent_change_1y}%
            </Context>
            {setArrow(data?.quotes.USD.percent_change_1y || 0)}
          </div>
        </Tab>
      </Tabs>
    </>
  );
};
export default Price;
