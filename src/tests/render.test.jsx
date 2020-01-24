import React from "react";
import { render } from "@testing-library/react";
import { Home } from "../components/Home";
import { About } from "../components/About";
import { Concerts } from "../components/Concerts";
import { Login } from "../components/Login";
import { Registration } from "../components/Registration";
import { User } from "../components/User";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

const httpLink = createHttpLink({
  uri: "http://localhost:8080/graphql",
  credentials: "include"
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
});

describe("Render Home Component", () => {
  it("Test component Render", () => {
    const { debug } = render(
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    );

    debug();
  });

  it("Test component Render", () => {
    const { debug } = render(
      <ApolloProvider client={client}>
        <About />
      </ApolloProvider>
    );

    debug();
  });

  it("Test component Render", () => {
    const { debug } = render(
      <ApolloProvider client={client}>
        <User />
      </ApolloProvider>
    );

    debug();
  });

  it("Test component Render", () => {
    const { debug } = render(
      <ApolloProvider client={client}>
        <Concerts />
      </ApolloProvider>
    );

    debug();
  });

  it("Test component Render", () => {
    const { debug } = render(
      <ApolloProvider client={client}>
        <Login />
      </ApolloProvider>
    );

    debug();
  });

  it("Test component Render", () => {
    const { debug } = render(
      <ApolloProvider client={client}>
        <Registration />
      </ApolloProvider>
    );

    debug();
  });
});
