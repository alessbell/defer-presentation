import React from "react";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ApolloExplorer } from "@apollo/explorer/react";
import stateofjs1 from "./media/stateofjs1.png";
import stateofjs2 from "./media/stateofjs2.png";
import terminalizer from "./media/terminalizer.gif";

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
  // Stepper,
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
    // primary: "white",
    secondary: "#FFA3E0",
    tertiary: "#311C87",
  },
  backdropStyle: {
    background:
      "linear-gradient(135deg, rgba(10,6,30,1) 0%, rgba(19,11,56,1) 100%)",
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
    header: "IBM Plex Mono, sans-serif",
    text: "IBM Plex Sans, sans-serif",
    paragraph: "IBM Plex Sans, sans-serif",
  },
};

const backslash = String.raw`\\`.slice(1);

function IFrame({ src }) {
  return (
    <div
      className="embed"
      style={{
        height: "75vh",
        marginTop: "2rem",
        marginLeft: "-8rem",
        width: "190%",
        "-ms-zoom": 0.63,
        "-moz-transform": "scale(0.63)",
        "-moz-transform-origin": "0 0",
        "-o-transform": "scale(0.63)",
        "-o-transform-origin": "0 0",
        "-webkit-transform": "scale(0.63)",
        "-webkit-transform-origin": "0 0",
      }}
    >
      <iframe src={src} />
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
      <SlideLayout.Statement>
        <Heading fontSize="60px">⚡️ @defer all the slow things ⚡️</Heading>
        <Text textAlign="center">Alessia Bellisario, Apollo GraphQL</Text>
        <Notes>
          <ul>
            <li>
              thanks to Bitovi for hosting this event and to Heather for making
              this happen, I'm so happy to be here!
            </li>
          </ul>
        </Notes>
      </SlideLayout.Statement>

      <SlideLayout.VerticalImage
        objectFit="contain"
        listItems={[
          "Former: product engineer at startups & bigcos",
          "Current: staff engineer, maintainer of @apollo/client",
          "worked on @defer",
          "@alessbell on the internet",
        ]}
        src="https://avatars.githubusercontent.com/u/5139846?v=4"
      ></SlideLayout.VerticalImage>

      {/* why should JS devs care about this?
      - state of JS survey
      - state of graphql survey
      - graphql is part of how we build modern applications today
      - whether you use graphql as part of your day job or not, I hope you walk away with an understanding of defer and hopefully you can reach for it in the right moments in the future now that you're aware of what it is */}

      {/* I know what you're thinking: Alessia this is a JS meetup! */}
      <SlideLayout.FullBleedImage objectFit="contain" src={stateofjs1} />

      <SlideLayout.FullBleedImage objectFit="contain" src={stateofjs2} />

      <SlideLayout.BigFact>
        <div>🐌⏳</div>
        <Heading>The problem</Heading>
      </SlideLayout.BigFact>

      <SlideLayout.TwoColumn
        left={
          <div style={{ marginTop: "8rem" }}>
            <CodePane
              language="graphql"
              theme={nightOwl}
              showLineNumbers={false}
            >
              {`
                query CoworkerQuery($name: String!) {
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
            {/* <Heading>Before / after</Heading> */}
            {/* <img
              style={{ marginTop: "5rem" }}
              src={
                loading
                // "https://user-images.githubusercontent.com/5139846/185925857-2a020340-dba9-4ca6-976c-4739f14c1993.gif"
              }
            /> */}
            <IFrame src="https://defer-pokemon-app.vercel.app/" />

            {/* <video controls style={{ height: "37vh", marginTop: "5rem" }}>
              <source src={video} type="video/mp4" />
            </video> */}

            <Notes>
              <ul>
                <li>can only defer fragments, not individual fields</li>
                <li>
                  the beauty of GraphQL = a single query to describe all of your
                  UI's data needs poses challenges as queries grow larger and
                  some resolvers take longer to return their portion of the
                  query
                </li>
                <li>your query is as slow as your slowest field</li>
                <li>you can declaratively deprioritize part of the query</li>
              </ul>
            </Notes>
          </>
        }
      />

      {/* <Slide>
        <div className="embed">
          <iframe src="https://defer-pokemon-app.vercel.app/" />
        </div>
      </Slide> */}

      <SlideLayout.List
        title="A brief history"
        items={[
          <>
            @defer + @stream: first described by Lee Byron at{" "}
            <a
              target="_blank"
              href="https://www.youtube.com/watch?v=ViXL0YQnioU"
            >
              React Europe 2016
            </a>
          </>,
          // double check stream definition?
          "@stream: defers execution of fields that return lists",
          <>
            currently a{" "}
            <a
              target="_blank"
              href="https://github.com/graphql/graphql-spec/pull/742"
            >
              Stage 2 Draft Proposal
            </a>
            , libraries can implement as experimental
          </>,
        ]}
      />

      <Slide>
        <Heading>
          What <i>is</i> @defer?
        </Heading>
        <Text>
          <ul>
            <li>deprioritize some fields on a query</li>
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
              general mechanism that can be used to power multiple features:
              incremental delivery isn't inherently tied to “directives”
            </li>
          </ul>
        </Text>
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
          <Heading>Accept: multipart/mixed</Heading>
          <CodePane theme={nightOwl} showLineNumbers={false}>
            {`
curl --request POST ${backslash}
  --header 'content-type: application/json' ${backslash}
  --header 'accept: multipart/mixed;boundary="graphql";deferSpec=20220824' ${backslash}
  --url 'https://main--alessia-bellisarios-rfqf1c.apollographos.net/graphql' ${backslash}
  --data '{"variables": {"name": "charmander"},"operationName": "Pokemon","query":"query Pokemon($name: String!) {...PokemonDetails @defer regions { results { id name __typename } __typename }} fragment PokemonDetails on Query {  pokemon(name: $name) { species { id }  __typename}}"}'`}
          </CodePane>
        </div>
        <Notes>
          <ul>
            <li>
              apollo client adds the multipart/mixed header to the request if it
              sees defer directive in the document
            </li>
            <li>
              content-type header on the response is multipart/mixed which tells
              AC to parse the bytes in the ReadableStream chunks
            </li>
            <li>
              fetch API gives us a ReadableStream of byte data through the body
              property of a Response object
            </li>
          </ul>
        </Notes>
      </Slide>

      <Slide>
        <Heading>Accept: multipart/mixed</Heading>
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
      </Slide>
      <Slide>
        <Heading>Accept: multipart/mixed</Heading>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={terminalizer} />
        </div>
      </Slide>

      {/* https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html */}

      <SlideLayout.TwoColumn
        left={
          <div style={{ marginTop: "8rem" }}>
            <CodePane
              language="graphql"
              theme={nightOwl}
              showLineNumbers={false}
            >
              {`
                query CoworkerQuery($name: String!) {
                  ... @defer {
                    pokemon(name: $name) { # 🐌
                      stats
                      abilities
                      held_items
                    }
                  }
                  officeRegions { # ⚡️
                    name
                  }
                }
              `}
            </CodePane>
          </div>
        }
        right={
          <>
            {/* <Heading>Before / after</Heading> */}
            {/* <img
              style={{ marginTop: "5rem" }}
              src={
                loading
                // "https://user-images.githubusercontent.com/5139846/185925857-2a020340-dba9-4ca6-976c-4739f14c1993.gif"
              }
            /> */}
            <IFrame src="https://defer-pokemon-app.vercel.app/deferred" />
            {/* <video controls style={{ height: "37vh", marginTop: "5rem" }}>
              <source src={video} type="video/mp4" />
            </video> */}

            <Notes>
              <ul>
                <li>can only defer fragments, not individual fields</li>
                <li>
                  the beauty of GraphQL = a single query to describe all of your
                  UI's data needs poses challenges as queries grow larger and
                  some resolvers take longer to return their portion of the
                  query
                </li>
                <li>your query is as slow as your slowest field</li>
                <li>you can declaratively deprioritize part of the query</li>
              </ul>
            </Notes>
          </>
        }
      />
      <SlideLayout.TwoColumn
        left={
          <div style={{ marginTop: "5.5rem" }}>
            <CodePane language="jsx" theme={nightOwl} showLineNumbers={false}>
              {`
                function CoworkerDetails({ name }) {
                  const { data } = useQuery(query, {
                    variables: { name },
                  });
                
                  return (
                    <>
                      <Card
                        image={image}
                        pokemon={data?.pokemon}
                      />
                      <RegionList
                        regions={data?.regions}
                      />
                    </>
                  );
                }
              `}
            </CodePane>
          </div>
        }
        right={
          <>
            {/* <Heading>Before / after</Heading> */}
            {/* <img
              style={{ marginTop: "5rem" }}
              src={
                loading
                // "https://user-images.githubusercontent.com/5139846/185925857-2a020340-dba9-4ca6-976c-4739f14c1993.gif"
              }
            /> */}
            <IFrame src="https://defer-pokemon-app.vercel.app/deferred" />

            <Notes>
              <ul>
                <li>can only defer fragments, not individual fields</li>
                <li>
                  the beauty of GraphQL = a single query to describe all of your
                  UI's data needs poses challenges as queries grow larger and
                  some resolvers take longer to return their portion of the
                  query
                </li>
                <li>your query is as slow as your slowest field</li>
                <li>you can declaratively deprioritize part of the query</li>
              </ul>
            </Notes>
          </>
        }
      />

      <Slide>
        <Heading>Caniuse?</Heading>
        <Text>
          <ul>
            <li>various servers and clients claim to support @defer...</li>
            <li>compatibility: which version of the spec do they implement?</li>
            <li>
              Apollo Router and entity-based @defer (
              <a
                target="_blank"
                href="https://www.apollographql.com/blog/platform/fullstack-graphql-tutorial-defer-and-apollo-graphos/"
              >
                fullstack tutorial
              </a>
              )
            </li>
          </ul>
        </Text>
        <Notes>
          <ul>
            <li></li>
          </ul>
        </Notes>
      </Slide>

      <Slide>
        <div className="explorer" style={{ height: "100%", margin: "1rem 0" }}>
          <ApolloExplorer
            style={{ height: "100%" }}
            graphRef="alessia-bellisarios-rfqf1c@main"
            persistExplorerState={false}
            initialState={{
              document: `
query Pokemon($name: String!) {
  pokemon(name: $name) {
    species {
      id
      name
    }
    stats {
      base_stat
      effort
      stat {
        id
        name
      }
    }
    held_items {
      item {
        id
        url
        name
      }
    }
    abilities {
      ability {
        id
        url
        name
      }
    }
  }
  regions {
    count
    next
    previous
    results {
      id
      name
    }
    status
    message
  }
}
           
`,
              variables: {},
              headers: {},
              displayOptions: {
                showHeadersAndEnvVars: true,
                docsPanelState: "open",
                theme: "dark",
              },
            }}
          />
        </div>
      </Slide>

      <SlideLayout.BigFact>
        <div>
          <Heading>Thank you!</Heading>
          <Text>https://github.com/alessbell/defer-presentation</Text>
        </div>
      </SlideLayout.BigFact>
    </Deck>
  );
}

export default App;
