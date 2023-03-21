import React from "react";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ApolloExplorer } from "@apollo/explorer/react";
import stateofjs1 from "./media/stateofjs1.png";
import stateofjs2 from "./media/stateofjs2.png";
import multipartRFC1 from "./media/multipartRFC1.png";
import multipartRFC2 from "./media/multipartRFC2.png";
import codeGen from "./media/codeGen.png";
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
        marginTop: "2rem",
        marginLeft: "-10rem",
        width: "180%",
        "-ms-zoom": 0.69,
        "-moz-transform": "scale(0.69)",
        "-moz-transform-origin": "0 0",
        "-o-transform": "scale(0.69)",
        "-o-transform-origin": "0 0",
        "-webkit-transform": "scale(0.69)",
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
      <SlideLayout.Statement>
        <Heading fontSize="60px">⚡️ @defer all the slow things ⚡️</Heading>
        <Text textAlign="center">Alessia Bellisario, Apollo GraphQL</Text>
      </SlideLayout.Statement>

      <SlideLayout.VerticalImage
        objectFit="contain"
        imgContainerProps={{ padding: "7rem" }}
        listItems={[
          "Former: product engineer at startups & bigcos",
          "Current: staff engineer, maintainer of @apollo/client",
          "Worked on @defer in AC",
          "@alessbell on the internet",
        ]}
        src="https://avatars.githubusercontent.com/u/5139846?v=4"
      ></SlideLayout.VerticalImage>

      <SlideLayout.FullBleedImage
        imgContainerProps={{ padding: "7rem" }}
        objectFit="contain"
        src={stateofjs1}
      />

      <SlideLayout.FullBleedImage
        imgContainerProps={{ padding: "7rem" }}
        objectFit="contain"
        src={stateofjs2}
      />

      <SlideLayout.List
        title="A brief history"
        items={[
          <>
            @defer + @stream: first described by Lee Byron at{" "}
            <a
              target="_blank"
              rel="noreferrer"
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
              rel="noreferrer"
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
        right={<IFrame src="https://defer-pokemon-app.vercel.app/" />}
      />

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
      </Slide>

      <Slide>
        <FlexBox flexDirection="column" justifyContent="center">
          <Heading>Content-Type: multipart/mixed</Heading>
          <img
            style={{ width: "60rem", marginTop: "-3rem" }}
            alt=""
            src={multipartRFC1}
          />
          <a
            style={{ display: "flex", marginTop: "-2rem" }}
            href="https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html"
          >
            RFC1341 (1992)
          </a>
        </FlexBox>
      </Slide>

      <Slide>
        <FlexBox flexDirection="column" justifyContent="center">
          <Heading>Content-Type: multipart/mixed</Heading>
          <img
            style={{ width: "60rem", marginTop: "-3rem" }}
            alt=""
            src={multipartRFC2}
          />
          <a
            style={{ display: "flex", marginTop: "-2rem" }}
            href="https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html"
          >
            RFC1341 (1992)
          </a>
        </FlexBox>
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
      </Slide>
      <Slide>
        {/* <Heading>Accept: multipart/mixed</Heading> */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            alt=""
            style={{ width: "75em", marginTop: "5em" }}
            src={terminalizer}
          />
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
        right={<IFrame src="https://defer-pokemon-app.vercel.app/deferred" />}
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
                      <OfficeList
                        offices={data?.regions}
                      />
                    </>
                  );
                }
              `}
            </CodePane>
          </div>
        }
        right={<IFrame src="https://defer-pokemon-app.vercel.app/deferred" />}
      />

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
            <li>various servers and clients support @defer...</li>
            <li>compatibility: which version of the spec do they implement?</li>
          </ul>
        </Text>
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

      <Slide>
        <FlexBox
          flexDirection="column"
          justifyContent="center"
          // position="absolute"
          // bottom={0}
          // width={1}
        >
          <img
            alt=""
            style={{ marginTop: "1.5rem", width: "59rem" }}
            src={codeGen}
          />
          <a
            target="_blank"
            rel="noreferrer"
            style={{ display: "flex" }}
            href="https://github.com/dotansimha/graphql-code-generator/pull/8785"
          >
            graphql-code-generator PR #8785
          </a>
        </FlexBox>
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
            App:{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/alessbell/defer-pokemon-app"
            >
              github.com/alessbell/defer-pokemon-app
            </a>
          </Text>
          <Text>
            GraphOS:{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://studio.apollographql.com/public/alessia-bellisarios-rfqf1c"
            >
              studio.apollographql.com/public/alessia-bellisarios-rfqf1c
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
    </Deck>
  );
}

export default App;
