import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { BsSearch } from "react-icons/bs";
import "./index.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Header from "../Header"
import Footer from "../Footer"
import Stack from "@mui/material/Stack";

const filtersList = [
  { id: uuidv4(), disPlayText: "All", category: "" },
  { id: uuidv4(), disPlayText: "Grains", category: "grains" },
  { id: uuidv4(), disPlayText: "Pulses", category: "pulses" },
  { id: uuidv4(), disPlayText: "Crops", category: "crops" },
  { id: uuidv4(), disPlayText: "Nuts", category: "nuts" },
  { id: uuidv4(), disPlayText: "Others", category: "others" },
];

const componentStatus = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "INPROGRESS",
};

class FairPrice extends Component {
  state = {
    status: componentStatus.initial,
    searchInput: "",
    productsList: [],
    activeCategory: "",
  };

  componentDidMount() {
    this.getFairPriceProducts();
  }

  fetchSuccessFunction = (data) => {
    this.setState({
      productsList: data.fairPriceList,
      status: componentStatus.success,
    });
  };

  getFairPriceProducts = async () => {
    this.setState({ status: componentStatus.inProgress });
    const { searchInput, activeCategory } = this.state;
    const url = `https://dibuybe.onrender.com/fair-price?category=${activeCategory}&search=${searchInput}`;
    // console.log("url", url);
    const options = {
      method: "GET",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJzcmludXNyaTc2NTg1QGdtYWlsLmNvbSIsImlhdCI6MTY3NDcwODgzMX0.QNkp8Y4jhoKIezwAm8Nc4RYtHYeTX7AbgifIRLfCvpY",
      },
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      this.fetchSuccessFunction(data);
    } else {
      this.setState({ status: componentStatus.failure });
    }
  };

  onClickFiltersButton = (event) => {
    this.setState(
      { activeCategory: event.target.id },
      this.getFairPriceProducts
    );
  };

  leftSideRenderView = () => {
    const { activeCategory } = this.state;
    return (
      <div className="p-3 left_side_bar vh-100">
        <h1 className="h3">Filters</h1>
        <ul className="list-unstyled d-flex flex-column">
          {filtersList.map((each) => (
            <li key={each.id} className="">
              <button
                type="button"
                id={each.category}
                className={
                  activeCategory === (each.category || "")
                    ? "fairPriceFilterButtons text-primary activeColor rounded bg-light w-75 p-3"
                    : "fairPriceFilterButtons p-3"
                }
                onClick={this.onClickFiltersButton}
              >
                {each.disPlayText}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  onChangeSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  onClickSearchButton = () => {
    this.getFairPriceProducts();
  };

  onClickEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.getFairPriceProducts();
    }
  };

  renderSearchView = () => {
    const { searchInput } = this.state;
    return (
      <nav className="navbar navbar-light ">
        <form className="form-inline">
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon1"
              value={searchInput}
              onChange={this.onChangeSearchInput}
              onKeyDown={this.onClickEnter}
            />
            <div className="input-group-prepend">
              <button
                type="button"
                onClick={this.onClickSearchButton}
                className="input-group-text"
                id="basic-addon1"
              >
                <BsSearch />
              </button>
            </div>
          </div>
        </form>
      </nav>
    );
  };

  renderSuccessView = () => {
    const { productsList } = this.state;
    return (
      <>
        {productsList.length === 0 ? (
          <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="text-center">
              <img
                src="https://res.cloudinary.com/dp8ggbibl/image/upload/v1675939046/Mini%20Project/search_not_found_rdbqe9.png"
                alt="search-not-found"
              />
            </div>
            <p className="h2 text-secondary">No Products Available Right Now</p>
          </div>
        ) : (
          <ul className="list-unstyled fairPrice_products_Container">
            {productsList.map((each) => (
              <li key={each._id} className="col-3 p-3">
                <div className="fair_price_card p-3">
                  <div className="w-100">
                    <img
                      className="w-100 image_Container"
                      src={each.image}
                      alt={each.name}
                    />
                  </div>
                  <div className="mt-2">
                    {each.name.length > 14 ? (
                      <h1 className="h4">{each.name.slice(0, 13)}..</h1>
                    ) : (
                      <h1 className="h4">{each.name}</h1>
                    )}
                    <div className="d-flex justify-content-between align-items-center text-secondary">
                      <p className="m-0">Fair Price:</p>
                      <p className="h5 m-0">₹{each.fairPrice}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center text-secondary mt-3">
                      <p className="m-0">Dealer Price:</p>
                      <p className="h5 m-0">₹{each.dealerPrice}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  onClickRetryButton = () => {
    this.getFairPriceProducts();
  };

  renderFailureView = () => (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div>
        <img
          src="https://res.cloudinary.com/dp8ggbibl/image/upload/v1675939028/Mini%20Project/something_went_rong_a28kdn.png"
          alt="something-went-wrong"
        />
      </div>
      <p className="text-secondary h2 mt-3">Oops! Something Went Wrong</p>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={this.onClickRetryButton}>
          Retry
        </Button>
      </Stack>
    </div>
  );

  renderInProgressView = () => (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Loader type="BallTriangle" color="#00BFFF" height={50} width={50} />
    </div>
  );

  desicionMakingFunction = () => {
    const { status } = this.state;
    switch (status) {
      case componentStatus.success:
        return this.renderSuccessView();
      case componentStatus.failure:
        return this.renderFailureView();
      case componentStatus.inProgress:
        return this.renderInProgressView();
      default:
        return null;
    }
  };

  rightSideRenderView = () => (
    <div>
      {this.renderSearchView()}
      {this.desicionMakingFunction()}
    </div>
  );

  render() {
    // const { activeCategory } = this.state;
    // console.log(activeCategory);
    return (
      <>
        <Header />
        <div className="d-flex justify-content-center align-items-center">
          <div className="fair_price_container mt-5 mb-5">
            <div className="col-2">{this.leftSideRenderView()}</div>
            <div className="col-10 rightsideColor">
              {this.rightSideRenderView()}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default FairPrice;
