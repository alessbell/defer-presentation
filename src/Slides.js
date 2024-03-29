import React from "react";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ApolloExplorer } from "@apollo/explorer/react";

import code from "./media/code.png";
import multipartRFC from "./media/multipartRFC.jpg";
import terminalizer from "./media/terminalizer.gif";
import devtoolsVideo from "./media/devtools2.mp4";
import lastSlide from "./media/lastSlide.png";
import ourTeam from "./media/ourTeam.png";
import ourTeam2 from "./media/ourTeam2.png";
import ourTeam3 from "./media/ourTeam4.png";
import firstSlide from "./media/firstSlide2.png";
import multipartFormat from "./media/multipart.png";
import warning from "./media/warning.jpg";
import deception from "./media/deception.png";
import deferNetworkTab from "./media/deferNetworkTab3.png";
import deferNetworkTab2 from "./media/deferNetworkTab4.png";
import googleReview from "./media/googleReview.png";

import {
  Text,
  CodeSpan,
  CodePane,
  Deck,
  Slide,
  FlexBox,
  Box,
  FullScreen,
  Progress,
  SlideLayout,
  Heading,
  Notes,
} from "spectacle";

// remove slow transition effects
const transition = {
  from: {
    // opacity: 0,
    // transform: 'rotate(45deg)'
  },
  enter: {
    // opacity: 1,
    // transform: 'rotate(0)'
  },
  leave: {
    // opacity: 0,
    // transform: 'rotate(315deg)'
  },
};

const theme = {
  colors: {
    secondary: "#fc5201",
    tertiary: "#15252d",
  },
  backdropStyle: {
    background: "#15252d",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
  },
  fontSizes: {
    header: "64px",
    h1: "64px",
    paragraph: "28px",
    text: "38px",
  },
  fonts: {
    header: "Roboto Mono, sans-serif",
    text: "Work Sans, sans-serif",
    paragraph: "Work Sans, sans-serif",
  },
};

const backslash = String.raw`\\`.slice(1);

const curl = `curl --request POST ${backslash}
  --header 'content-type: application/json' ${backslash}
  --header 'accept: multipart/mixed;boundary="graphql";deferSpec=20220824' ${backslash}
  --url 'https://main--alessia-bellisarios-rfqf1c.apollographos.net/graphql' ${backslash}
  --data '{"variables": {"name": "charmander"},"operationName": "Pokemon","query":"query Pokemon($name: String!) {...PokemonDetails @defer regions { results { id name __typename } __typename }} fragment PokemonDetails on Query {  pokemon(name: $name) { species { id }  __typename}}"}'`;

function IFrame({ src }) {
  return (
    <div
      className="embed"
      style={{
        height: "57em",
        marginTop: "1.5rem",
        marginLeft: "-11rem",
        width: "180%",
        "-ms-zoom": 0.75,
        "-moz-transform": "scale(0.75)",
        "-moz-transform-origin": "0 0",
        "-o-transform": "scale(0.75)",
        "-o-transform-origin": "0 0",
        "-webkit-transform": "scale(0.75)",
        "-webkit-transform-origin": "0 0",
      }}
    >
      <iframe title={src} src={src} />
    </div>
  );
}

function App() {
  return (
    <Deck
      transition={transition}
      theme={theme}
      template={({ slideNumber, numberOfSlides }) => (
        <>
          <FlexBox
            justifyContent="space-between"
            position="absolute"
            bottom={0}
            width={1}
          >
            <Box padding="0 1em">
              <FullScreen />
            </Box>
            <Box padding="0 1em">
              <Progress />
            </Box>
          </FlexBox>
          <FlexBox
            justifyContent="space-between"
            position="absolute"
            top={0}
            width={1}
          >
            <Box padding="0 1em"></Box>
            <Box padding="0 1em">
              <CodeSpan color="white" fontSize="22px !important">
                slides: aless.co/defer
              </CodeSpan>
            </Box>
          </FlexBox>
        </>
      )}
    >
      <SlideLayout.FullBleedImage src={firstSlide} />
      {/* <SlideLayout.VerticalImage
        objectFit="contain"
        imgContainerProps={{ padding: "7rem" }}
        listItems={[
          "Staff Engineer at Apollo",
          "Worked on @defer support in Apollo Client",
          "@alessbell on the internet",
        ]}
        src="https://avatars.githubusercontent.com/u/5139846?v=4"
      ></SlideLayout.VerticalImage> */}
      <Slide>
        <Heading>Agenda</Heading>
        <Text>
          <ul>
            <li>a brief history</li>
            <li>@defer 101: what is it, why do we need it?</li>
            <li>@defer 201: how does it work?</li>
          </ul>
        </Text>
        <Notes></Notes>
      </Slide>

      <Slide>
        <Heading>A brief history</Heading>
        <Text>
          <ul>
            <li>
              @defer + @stream: first described by Lee Byron at{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/watch?v=ViXL0YQnioU"
              >
                React Europe 2016
              </a>
            </li>
            <li>
              @stream: partial items of List type in initial response,
              subsequent items later
            </li>
            <li>
              currently a{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/graphql/graphql-spec/pull/742"
              >
                Stage 2 Draft Proposal
              </a>
              , libraries can implement as experimental
            </li>
          </ul>
        </Text>
        <Notes>
          You'll often hear defer and stream in the same sentence. This is
          because they're the subject of a single proposal.
        </Notes>
      </Slide>
      <Slide>
        <Heading>
          @defer 101: what <i>is</i> @defer?
        </Heading>
        <Text>
          <ul>
            <li>deprioritize delivery of some fields using fragments</li>
            <li>
              <i>both</i>{" "}
              <a
                target="_"
                href="https://github.com/graphql/graphql-over-http/blob/93d30461dc258aae4eb31e8a90c35a3e2251dc6a/rfcs/IncrementalDelivery.md?plain=1#L1"
              >
                incremental delivery over HTTP
              </a>{" "}
              and the directive itself
            </li>
            <li>
              the former is general mechanism that can be used to power multiple
              features
            </li>
          </ul>
        </Text>
        <Notes>
          Allows you to deprioritize some fields on a query, incremental
          delivery isn't inherently tied to “directives”
        </Notes>
      </Slide>
      <SlideLayout.BigFact>
        <Heading>The problem 🐌⏳</Heading>
        <img style={{ width: "30rem", marginTop: "5rem" }} alt="" src={code} />
      </SlideLayout.BigFact>

      <SlideLayout.BigFact style={{ margin: "20rem" }}>
        🙅‍♀️🎣
      </SlideLayout.BigFact>

      <Slide>
        <FlexBox flexDirection="column" justifyContent="center">
          <img
            style={{
              width: "70rem",
              marginTop: "1rem",
            }}
            alt=""
            src={ourTeam}
          />
        </FlexBox>
      </Slide>

      <Slide>
        <FlexBox flexDirection="column" justifyContent="center">
          <img
            style={{
              width: "55rem",
              marginTop: "3rem",
            }}
            alt=""
            src={warning}
          />
        </FlexBox>
      </Slide>

      <Slide>
        <FlexBox flexDirection="column" justifyContent="center">
          <img
            style={{
              width: "65rem",
              marginTop: "1rem",
            }}
            alt=""
            src={ourTeam2}
          />
        </FlexBox>
      </Slide>

      <Slide>
        <FlexBox flexDirection="column" justifyContent="center">
          <img
            style={{
              width: "50rem",
              marginTop: "10rem",
            }}
            alt=""
            src={ourTeam3}
          />
        </FlexBox>
      </Slide>

      <Slide>
        <FlexBox flexDirection="column" justifyContent="center">
          <img
            style={{
              width: "80rem",
              marginTop: "10rem",
            }}
            alt=""
            src={deception}
          />
        </FlexBox>
      </Slide>

      <Slide>
        <FlexBox flexDirection="column" justifyContent="center">
          <Heading>🎉🎉🎉</Heading>
          <img
            style={{
              width: "60rem",
            }}
            alt=""
            src={googleReview}
          />
        </FlexBox>
      </Slide>

      <SlideLayout.TwoColumn
        left={
          <div style={{ marginTop: "8rem" }}>
            <CodePane
              language="graphql"
              theme={nightOwl}
              showLineNumbers={false}
            >
              {`
                query PokemonQuery($name: String!) {
                  pokemon(name: $name) { # slow
                    stats
                    abilities
                    held_items
                  }
                  regions { # could be fast!
                    name
                  }
                }
              `}
            </CodePane>
          </div>
        }
        right={
          <>
            <IFrame src="https://defer-pokemon-app.vercel.app/" />
          </>
        }
      />
      <SlideLayout.TwoColumn
        left={
          <div style={{ marginTop: "8rem" }}>
            <CodePane
              language="graphql"
              theme={nightOwl}
              showLineNumbers={false}
            >
              {`
                query PokemonQuery($name: String!) {
                  ... @defer {
                    pokemon(name: $name) { # 🐌
                      stats
                      abilities
                      held_items
                    }
                  }
                  regions { # ⚡️
                    name
                  }
                }
              `}
            </CodePane>
          </div>
        }
        right={<IFrame src="https://defer-pokemon-app.vercel.app/deferred" />}
      />

      <Slide>
        <div style={{ marginTop: "2rem" }}>
          <CodePane language="jsx" theme={nightOwl} showLineNumbers={false}>
            {`
            function Pokemon({ selectedPokemon }) {
              const { data, loading } = useQuery(query, {
                variables: { name: selectedPokemon },
              });

              if (loading) return <Spinner />;

              return (
                <>
                  {data.pokemon ? (
                    <h2>
                      HP:{" "}
                      {
                        data.pokemon.stats.find(({ stat }) => stat.name === "hp")
                          .base_stat
                      }
                    </h2>
                  ) : null}
                </>
              )
            };
              `}
          </CodePane>
        </div>
      </Slide>
      <Slide>
        <div
          style={{
            maxWidth: "100%",
            position: "absolute",
            right: "0",
            left: "0",
            margin: "0 2rem",
          }}
        >
          <Heading>
            @defer 201
            <br />
            Accept: multipart/mixed
          </Heading>
          <CodePane
            theme={nightOwl}
            highlightRanges={[
              [0, 1],
              [2, 2],
              [3, 3],
              [4, 4],
              [5, 12],
            ]}
            language="bash"
          >
            {`curl --request POST ${backslash}
     --header 'content-type: application/json' ${backslash}
     --header 'accept: multipart/mixed;boundary="graphql";deferSpec=20220824' ${backslash}
     --url 'https://main--alessia-bellisarios-rfqf1c.apollographos.net/graphql' ${backslash}
     --data '{
       "variables": { "name": "charmander" },
       "query": "query Pokemon($name: String!) {
         ... @defer {
           pokemon(name: $name) { species { id } __typename }
         }
         regions { results { id name __typename } __typename }"
       }'`}
          </CodePane>
          <button
            style={{ fontSize: "16px", width: "10rem", marginTop: "1rem" }}
            onClick={() => {
              navigator.clipboard.writeText(curl);
            }}
          >
            Copy to clipboard
          </button>
        </div>
        <Notes>
          That feels pretty magical. What's going on under the hood?
        </Notes>
      </Slide>
      <Slide>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            alt=""
            style={{ width: "75em", marginTop: "5em" }}
            src={terminalizer}
          />
        </div>
      </Slide>
      <Slide>
        <Heading>Content-Type: multipart/mixed</Heading>
        <CodePane theme={nightOwl} showLineNumbers={false}>
          {`
--graphql
content-type: application/json

{"data":{"regions":{"__typename":"BaseList", ... }},"hasNext":true}
--graphql
content-type: application/json

{"hasNext":false,"incremental":[{"data":{"pokemon":{"__typename":"Pokemon","species":{...}}},"path":[]}]}
--graphql--

              `}
        </CodePane>
        <Notes>
          - apollo client adds the multipart/mixed header to the request if it
          sees defer directive in the document
          <br /> - fetch API gives us a ReadableStream of byte data through the
          body property of our Response object
          <br /> - content-type header on the response is multipart/mixed which
          tells AC to parse the bytes in the ReadableStream chunks
          <br />- built using a delivery mechanism that leverages a content-type
          specified in 1992
        </Notes>
      </Slide>
      <Slide>
        <FlexBox flexDirection="column" justifyContent="center">
          <Heading>Content-Type: multipart/mixed</Heading>
          <img
            style={{ width: "60rem", marginTop: "0rem" }}
            alt=""
            src={multipartRFC}
          />
          <a
            style={{ display: "flex", marginTop: "1.5rem" }}
            href="https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html"
          >
            RFC1341 (1992)
          </a>
        </FlexBox>
        <Notes>
          - the idea of the configurable accept:multipart/mixed;boundary= string
          dates back to the original HTTP multipart protocol, before GraphQL
          <br />- since the boundary needs to be unambiguous, often a random
          string like --gc0p4Jq0M2Yt08jU534c0p is used --graphql works fine for
          GraphQL’s needs (no need for something uglier), for a specific reason:
          in GraphQL, we assume we’re only delivering JSON, and JSON never
          starts or ends with the unquoted characters graphql
        </Notes>
      </Slide>

      <Slide>
        <FlexBox flexDirection="column" justifyContent="center">
          <Heading>Content-Type: multipart/mixed</Heading>
          <img
            style={{ width: "60rem", marginTop: "2rem" }}
            alt=""
            src={multipartFormat}
          />
        </FlexBox>
        <Notes>
          - the idea of the configurable accept:multipart/mixed;boundary= string
          dates back to the original HTTP multipart protocol, before GraphQL
          <br />- since the boundary needs to be unambiguous, often a random
          string like --gc0p4Jq0M2Yt08jU534c0p is used --graphql works fine for
          GraphQL’s needs (no need for something uglier), for a specific reason:
          in GraphQL, we assume we’re only delivering JSON, and JSON never
          starts or ends with the unquoted characters graphql
        </Notes>
      </Slide>

      <Slide>
        <div className="explorer" style={{ height: "100%", margin: "1rem 0" }}>
          <ApolloExplorer
            style={{ height: "100%" }}
            graphRef="alessia-bellisarios-rfqf1c@main"
            persistExplorerState={false}
            initialState={{
              document: `query Pokemon($name: String!) {
  pokemon(name: $name) {
    abilities {
      ability {
        id
        name
      }
    }
  }
  regions {
    results {
      id
      name
    }
  }
}
           
`,
              variables: {
                name: "pikachu",
              },
              headers: {},
              displayOptions: {
                showHeadersAndEnvVars: true,
                docsPanelState: "closed",
                theme: "dark",
              },
            }}
          />
        </div>
      </Slide>

      <Slide>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            alt=""
            style={{ width: "70em", marginTop: "1em" }}
            src={deferNetworkTab}
          />
        </div>
      </Slide>

      <Slide>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            alt=""
            style={{ width: "70em", marginTop: "1em" }}
            src={deferNetworkTab2}
          />
        </div>
      </Slide>

      <Slide>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <video controls style={{ width: "90vw", marginTop: "-2rem" }}>
            <source src={devtoolsVideo} type="video/mp4" />
          </video>
        </div>
      </Slide>

      {/* https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html */}
      <Slide>
        <Heading>Caniuse? Yes! 🎉</Heading>
        <Text>
          <ul>
            <li>
              Apollo Router and entity-based @defer (
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.apollographql.com/blog/platform/fullstack-graphql-tutorial-defer-and-apollo-graphos/"
              >
                fullstack tutorial
              </a>
              )
            </li>
            <li>Apollo Client {">="} v3.7.0</li>
            <li>Many other servers and clients support @defer</li>
            <li>Compatibility: which version of the spec do they implement?</li>
            <li>
              A suspenseful useFragment hook for Apollo Client is coming soon in
              v3.9
            </li>
          </ul>
        </Text>
        <Notes>
          - GraphQL clients and servers near you will increasingly speak this
          incremental transfer protocol! <br />
          - there _will_ be changes to the draft spec before it is finalized,
          however Apollo Router and Client's @defer support is generally
          available: we will adapt library internals when the spec changes which
          will be opaque to users
          <br />- defer + Suspense! We're working on our suspense hooks, we have
          an open RFC and this will be really key when orchestrating loading
          states
        </Notes>
      </Slide>
      <SlideLayout.BigFact>
        <div>
          <Heading>Thank you!</Heading>
          <Text>
            Slides:{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/alessbell/defer-presentation"
            >
              github.com/alessbell/defer-presentation
            </a>
          </Text>

          <Text>
            Fullstack tutorial:{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://apollographql.com/blog/platform/fullstack-graphql-tutorial-defer-and-apollo-graphos/"
            >
              apollographql.com/blog/platform/fullstack-graphql-tutorial-defer-and-apollo-graphos/
            </a>
          </Text>
        </div>
      </SlideLayout.BigFact>
      <SlideLayout.FullBleedImage src={lastSlide} />
    </Deck>
  );
}

export default App;
