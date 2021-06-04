import React from "react"
import { Container } from "react-bootstrap"

const AUTH_URL = 1;
  

export default function Connect() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Connect to Spotify
      </a>
    </Container>
  )
}
