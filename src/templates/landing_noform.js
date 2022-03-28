import React, { useEffect } from "react";
import { graphql, navigate } from "gatsby";
import { landingSections } from "../components/Landing";
import FollowBar from "../components/FollowBar";
import { H1, H2, H4, Paragraph, Span } from "../components/Heading";
import {
    GridContainerWithImage,
    Div,
    GridContainer,
} from "../components/Sections";
import { Colors, StyledBackgroundSection, Img, Button } from "../components/Styling";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import BaseRender from "./_baseLandingLayout";
import { processFormEntry } from "../actions";
import { SessionContext } from "../session.js";
import LandingNavbar from "../components/NavbarDesktop/landing";
import LandingContainer from "../components/LandingContainer";

const Landing = (props) => {
    const { session, setLocation } = React.useContext(SessionContext);
    const { data, pageContext, yml, filteredPrograms } = props;
    const [components, setComponents] = React.useState({});
    const [inLocation, setInLocation] = React.useState("");

    const applySchollarship =
        data.allLandingYaml.edges.length !== 0
            ? data.allLandingYaml.edges[0].node?.apply_schollarship
            : data.allDownloadableYaml.edges[0].node?.apply_schollarship;

    const programs = filteredPrograms.map((p) => ({
        label: p.text,
        value: p.bc_slug,
    }));

    useEffect(() => {
        let _components = {};
        if (yml.components)
            yml.components.forEach(({ name, ...rest }) => {
                _components[name] = rest;
            });
        setComponents({ ...yml, ..._components });
    }, [yml]);
    useEffect(() => {
        if (yml.meta_info && yml.meta_info.utm_location)
            setLocation(yml.meta_info?.utm_location);

        const urlParams = new URLSearchParams(window.location.search);
        const _inLoc = urlParams.get("in") || null;
        if (_inLoc && _inLoc != "")
            setInLocation(_inLoc.replace(/^\w/, (c) => c.toUpperCase()) + " ");
    }, []);

    // data sent to the form already prefilled
    const preData = {
        course: {
            type: "hidden",
            value:
                programs.length <= 1
                    ? programs[0].value
                    : yml.meta_info?.utm_course,
            valid: true,
        },
        utm_location: {
            type: "hidden",
            value: yml.meta_info?.utm_location,
            valid: true,
        },
        utm_language: { type: "hidden", value: pageContext.lang, valid: true },
        automation: {
            type: "hidden",
            value: yml.meta_info.automation,
            valid: true,
        },
        tag: { type: "hidden", value: yml.meta_info.tag, valid: true },
        current_download: {
            type: "hidden",
            value: yml.meta_info.current_download,
            valid: true,
        },
        form_type: { type: "hidden", value: pageContext.type, valid: true },
    };

    const landingLocation =
        session &&
        session.locations?.find(
            (l) => l.breathecode_location_slug === yml.meta_info.utm_location
        );

    return (
        <>
            <LandingNavbar
                buttonText={
                    yml.navbar
                        ? yml.navbar.buttonText
                        : pageContext.lang === "us"
                        ? "Apply"
                        : "Solicita una plaza"
                }
                buttonUrl={yml.navbar?.buttonUrl}
                logoUrl={yml.navbar?.logoUrl}
                lang={pageContext.lang}
            />
            <FollowBar
                position={yml.follow_bar.position}
                showOnScrollPosition={400}
                buttonText={yml.follow_bar.button.text}
                phone={
                    yml.follow_bar.phone.number ||
                    (landingLocation && landingLocation.phone)
                }
                phoneText={yml.follow_bar.phone.text}
                link={yml.follow_bar.button.path}
            >
                <Paragraph
                    margin="0"
                    fontWeight="800"
                    alignSelf="center"
                    color={Colors.black}
                    textAlign="left"
                    fontSize_tablet={yml.follow_bar.content.font_size[0]}
                    fontSize={yml.follow_bar.content.font_size[4]}
                >
                    {yml.follow_bar.content.text.split("\n").map((c, i) => (
                        <span key={i} className="d-block d-xs-none w-100">
                            {c}
                        </span>
                    ))}
                    {yml.follow_bar.content.text_mobile &&
                        yml.follow_bar.content.text_mobile
                            .split("\n")
                            .map((c, i) => (
                                <span
                                    key={i}
                                    className="d-none d-xs-block w-100"
                                >
                                    {c}
                                </span>
                            ))}
                </Paragraph>
            </FollowBar>
            <LandingContainer
                filter={yml.header_data.image_filter}
                image={
                    yml.header_data?.background_image &&
                    yml.header_data.background_image.childImageSharp
                        .gatsbyImageData
                }
                badge={
                    yml.header_data?.badge &&
                    yml.header_data.badge.childImageSharp.gatsbyImageData
                }
                background={yml.header_data.background || Colors.white}
            >
                <GridContainer
                    containerGridGap="0"
                    containerColumns_tablet="repeat(1,0fr)"
                    padding_tablet="70px 0 40px 0"
                    columns_tablet="2"
                >
                    <Div
                        // display="none"
                        display_tablet="flex"
                        flexDirection="column"
                        width="100%"
                        size_tablet="10"
                        size="12"
                        alignItems="center"
                        alignItems_tablet="flex-start"
                        // borderRadius="0 0 0 1.25rem"
                        margin="0 0 35px auto"
                        padding={`80px 0 0 0`}
                        height="auto"
                        padding_tablet={`80px 0 0 20px`}
                    >
                        {yml.header_data.partner_logo_url && (
                            <>
                                <Div
                                    width="auto"
                                    flexDirection_tablet="column"
                                    height="70"
                                    padding="0 0 25px 0"
                                >
                                    <GatsbyImage
                                        loading="eager"
                                        imgStyle={{ objectFit: "contain" }}
                                        image={getImage(
                                            yml.header_data.partner_logo_url
                                                .childImageSharp.gatsbyImageData
                                        )}
                                        alt="4Geeks Logo"
                                    />
                                </Div>

                                <Div
                                    display="none"
                                    display_tablet="flex"
                                    background="#FFFFFF"
                                    width="calc(50% - 30px)"
                                    height="2px"
                                    margin="7px 0"
                                />
                            </>
                        )}
                        <H1
                            type="h1"
                            variant="main"
                            lineHeight="40px"
                            margin="20px 0"
                            padding="0 10px 0 0"
                            color={
                                yml.header_data.tagline_color ||
                                yml.header_data.background
                                    ? Colors.black
                                    : Colors.white
                            }
                            fontSize="38px"
                            fontSize_tablet="42px"
                            fontWeight="bolder"
                            textAlign="center"
                            textAlign_tablet="left"
                        >
                            {inLocation}
                            {yml.header_data.tagline}
                            {/* <Span animated color={Colors.yellow}>_</Span> */}
                        </H1>
                        {yml.header_data.sub_heading !== "" && (
                            <H2
                                type="h2"
                                textAlign="left"
                                fontSize="18px"
                                color={
                                    yml.header_data.background
                                        ? Colors.black
                                        : Colors.white
                                }
                                variant="main"
                                fontWeight="400"
                                margin_tablet="0px 0px 40px 0px"
                                margin="0 0 20px 30px"
                                maxWidth="350px"
                                // textShadow="0px 0px 4px black"
                            >
                                {yml.header_data.sub_heading}
                            </H2>
                        )}
                        {Array.isArray(yml.features.bullets) &&
                            yml.features.bullets.map((f, i) => (
                                <Paragraph
                                    key={i}
                                    // isActive
                                    style={JSON.parse(yml.features.styles)}
                                    margin="7px 0"
                                    padding="0px 20px"
                                    fontWeight="400"
                                    // textShadow="0px 0px 4px black"
                                    textAlign="left"
                                    color={
                                        yml.header_data.background
                                            ? Colors.black
                                            : Colors.white
                                    }
                                >
                                    {"• "}
                                    {f}
                                </Paragraph>
                            ))}
                        {yml.features.text && (
                            <Paragraph
                                isActive
                                style={JSON.parse(yml.features.styles)}
                                margin="7px 0"
                                padding_tablet="0px 0px"
                                padding="0px 20px"
                                // textShadow="0px 0px 4px black"
                                textAlign="left"
                                color={
                                    yml.header_data.background
                                        ? Colors.black
                                        : Colors.white
                                }
                                dangerouslySetInnerHTML={{ __html: yml.features.text }}
                            />
                        )}
                        {yml.features.button && (
                            <Button
                                outline
                                // width="250px"
                                colorHoverText={yml.features.button.hover_color || Colors.blue}
                                lineHeight="26px"
                                textColor={Colors[yml.features.button.color] || yml.features.button.color}
                                color={Colors[yml.features.button.color] || yml.features.button.color}
                                padding_tablet="0"
                                fontSize="15px"
                                style={yml.features.button.style ? JSON.parse(yml.features.button.style) : null}
                                background={Colors[yml.features.button.background] || yml.features.button.background}
                                // textAlign="left"
                                margin="2rem 0"
                                padding=".35rem.85rem"
                                onClick={() => {
                                    if (yml.features.button.path && yml.features.button.path.indexOf("http") > -1)
                                        window.open(yml.features.button.path);
                                    else navigate(yml.features.button.path);
                                }}
                            >
                                {yml.features.button.text}
                            </Button>
                        )}
                        {yml.short_badges && (
                            <Div
                                // className="badge-slider hideOverflowX__"
                                display="flex"
                                flexDirection="row"
                                width="100%"
                                margin="25px 0 0 0"
                                padding="24px 0 0 0"
                                justifyContent="between"
                                maxWidth="100vw"
                                gap="40px"
                                overflowX="auto"
                                // justifyContent="center"
                                // alignItems="center"
                            >
                                {yml.short_badges.map((l, i) => {
                                    return (
                                        i <= 3 && (
                                            <React.Fragment key={i}>
                                                <GatsbyImage
                                                    style={{
                                                        height: "65px",
                                                        minWidth: "165px",
                                                        width: "165px",
                                                    }}
                                                    imgStyle={{
                                                        objectFit: "contain",
                                                    }}
                                                    loading="eager"
                                                    // draggable={false}
                                                    // fadeIn={false}
                                                    alt={l.name}
                                                    image={getImage(
                                                        l.image.childImageSharp
                                                            .gatsbyImageData
                                                    )}
                                                    // fluid={l.image.childImageSharp.fluid}
                                                />
                                            </React.Fragment>
                                        )
                                    );
                                })}
                            </Div>
                        )}
                    </Div>
                    <Div
                        flexDirection="column"
                        justifyContent="center"
                        size="12"
                        size_tablet="10"
                        width="100%"
                        width_tablet="65%"
                        // size_lg="4"
                        // size_sm="6"
                        // size_xs="12"
                        margin="0"
                        textAlign_sm="center"
                        margin_md="0 auto 0 70px"
                    >
                        <GatsbyImage
                            loading="eager"
                            imgStyle={{ objectFit: "contain" }}
                            image={getImage(
                                yml.header_data.right_image.childImageSharp.gatsbyImageData
                            )}
                            alt="4Geeks Logo"
                        />
                        {/* <Img
                            src={yml.header_data.right_image.src}
                            style={
                                yml.header_data.right_image.style ? JSON.parse(yml.header_data.right_image.style) 
                                : null
                            }
                            // borderRadius={"1.25rem"}
                            // className="pointer"
                            alt={"4Geeks Academy Section"}
                            margin="auto"
                            width={"100%"}
                            height={"100%"}
                            backgroundSize={`contain`}
                        /> */}
                    </Div>
                </GridContainer>
            </LandingContainer>

            {Object.keys(components)
                .filter(
                    (name) =>
                        components[name] &&
                        (landingSections[name] ||
                            landingSections[components[name].layout])
                )
                .sort((a, b) =>
                    components[b].position > components[a].position ? -1 : 1
                )
                .map((name, index) => {
                    const layout = components[name].layout || name;
                    return landingSections[layout]({
                        ...props,
                        yml: components[name],
                        session,
                        course: yml.meta_info?.utm_course,
                        location: components.meta_info?.utm_location,
                        index: index,
                    });
                })}
            <div id="bottom"></div>

            
        </>
    );
};
export const query = graphql`
    query LandingNoformQuery(
        $file_name: String!
        $lang: String!
        $utm_course: String
    ) {
        allPageYaml(
            filter: {
                fields: {
                    file_name: { regex: "/geekpal/" }
                    lang: { eq: $lang }
                }
            }
        ) {
            edges {
                node {
                    list {
                        image {
                            childImageSharp {
                                gatsbyImageData(
                                    layout: CONSTRAINED
                                    width: 800
                                    placeholder: NONE
                                    quality: 100
                                )
                            }
                        }
                    }
                }
            }
        }
        allLandingYaml(
            filter: {
                fields: { file_name: { eq: $file_name }, lang: { eq: $lang } }
            }
        ) {
            edges {
                node {
                    meta_info {
                        title
                        description
                        image
                        keywords
                        utm_course
                        utm_location
                        automation
                        tag
                    }
                    follow_bar {
                        position
                        content {
                            text
                            text_mobile
                            font_size
                        }
                        button {
                            text
                            path
                        }
                        phone {
                            text
                            number
                        }
                    }
                    navbar {
                        logoUrl
                        buttonText
                        buttonUrl
                    }
                    form {
                        heading
                        motivation
                        redirect
                        fields
                        button_label
                    }
                    features {
                        marginTop
                        text
                        bullets
                        styles
                        button {
                            text
                            path
                            background
                            color
                            hover_color
                        }
                    }
                    badges {
                        position
                        heading
                    }
                    short_badges {
                        name
                        url
                        image {
                            childImageSharp {
                                gatsbyImageData(
                                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                    height: 120 # --> maxHeight
                                    quality: 100
                                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                                )
                            }
                        }
                    }
                    about4Geeks {
                        position
                        heading
                        sub_heading
                        list {
                            title
                        }
                        paragraph
                        button_text
                        button_link
                        image {
                            childImageSharp {
                                gatsbyImageData(
                                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                    width: 1200
                                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                                )
                            }
                        }
                        image_mobile {
                            childImageSharp {
                                gatsbyImageData(
                                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                    width: 800
                                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                                )
                            }
                        }
                    }
                    iconogram {
                        position
                        icons {
                            icon
                            title
                        }
                    }
                    in_the_news {
                        heading
                        position
                        filter
                    }
                    rating_reviews {
                        position
                        heading
                        rating_list {
                            alt
                            image {
                                childImageSharp {
                                    gatsbyImageData(
                                        layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                        width: 1200
                                        placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                                    )
                                }
                            }
                            rating
                            url
                        }
                    }
                    program_details {
                        position
                        heading
                        background
                        sub_heading
                    }
                    why_4geeks {
                        position
                        heading
                        sub_heading
                        footer {
                            text
                            text_link
                        }
                    }
                    alumni_projects {
                        position
                        heading
                        sub_heading
                    }
                    who_is_hiring {
                        position
                        heading
                        sub_heading
                        featured {
                            name
                            image {
                                childImageSharp {
                                    gatsbyImageData(
                                        layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                        width: 150
                                        placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                                    )
                                    # fluid(maxWidth: 150){
                                    #   ...GatsbyImageSharpFluid_withWebp
                                    # }
                                }
                            }
                            # featured
                        }
                    }
                    choose_your_program {
                        position
                        title
                        paragraph
                        programs {
                            text_link
                            link
                            sub_title
                            title
                            description
                            icon
                        }
                    }

                    why_python {
                        position
                        heading
                        sub_heading
                    }
                    apply_schollarship {
                        imageSide
                        image {
                            childImageSharp {
                                gatsbyImageData(
                                    layout: CONSTRAINED
                                    width: 800
                                    placeholder: NONE
                                    quality: 100
                                )
                            }
                        }
                    }
                    components {
                        name
                        position
                        background
                        swipable
                        proportions
                        layout
                        filter_indexes
                        image {
                            src
                            style
                            link
                        }
                        video
                        height
                        button {
                            text
                            color
                            path
                            background
                            hover_color
                        }
                        heading {
                            text
                            font_size
                        }
                        sub_heading {
                            text
                            font_size
                            style
                        }
                        bullets
                        background
                        content {
                            text
                            font_size
                            path
                        }
                        columns {
                            size
                            content {
                                text
                                font_size
                                style
                            }
                            image {
                                src
                                style
                            }
                        }
                    }
                    header_data {
                        background
                        tagline
                        tagline_color
                        sub_heading
                        image_filter
                        right_image {
                            childImageSharp {
                                gatsbyImageData(
                                    layout: FULL_WIDTH # --> CONSTRAINED || FIXED || FULL_WIDTH
                                    quality: 100
                                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                                )
                            }
                        }
                        partner_logo_url {
                            childImageSharp {
                                gatsbyImageData(
                                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                    height: 70
                                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                                )
                            }
                        }
                        background_image {
                            childImageSharp {
                                gatsbyImageData(
                                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                    width: 1000
                                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                                )
                                # fluid(maxWidth: 1000){
                                #   ...GatsbyImageSharpFluid_withWebp
                                # }
                            }
                        }
                        badge {
                            childImageSharp {
                                gatsbyImageData(
                                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                    width: 1000
                                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                                )
                            }
                        }
                    }
                    geeks_vs_others {
                        position
                        heading
                        paragraph
                        sub_heading
                        total_rows
                    }
                    testimonial {
                        position
                        heading
                        sub_heading
                        students {
                            name
                            sub_heading
                            comment
                            video
                        }
                    }
                }
            }
        }
        allDownloadableYaml(
            filter: {
                fields: { file_name: { eq: $file_name }, lang: { eq: $lang } }
            }
        ) {
            edges {
                node {
                    meta_info {
                        title
                        description
                        image
                        keywords
                        automation
                        tag
                        current_download
                    }
                    follow_bar {
                        position
                        content {
                            text
                            text_mobile
                            font_size
                        }
                        button {
                            text
                            path
                        }
                        phone {
                            text
                            number
                        }
                    }
                    navbar {
                        logoUrl
                        buttonText
                        buttonUrl
                    }
                    form {
                        heading
                        motivation
                        redirect
                        fields
                        button_label
                    }
                    features {
                        marginTop
                        text
                        bullets
                        styles
                    }
                    badges {
                        position
                        heading
                    }
                    about4Geeks {
                        position
                        heading
                        sub_heading
                        list {
                            title
                        }
                        paragraph
                        button_text
                        button_link
                        image {
                            childImageSharp {
                                gatsbyImageData(
                                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                    width: 1200
                                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                                )
                            }
                        }
                        image_mobile {
                            childImageSharp {
                                gatsbyImageData(
                                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                    width: 800
                                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                                )
                            }
                        }
                    }
                    iconogram {
                        position
                        icons {
                            icon
                            title
                        }
                    }
                    in_the_news {
                        heading
                        position
                        filter
                    }
                    rating_reviews {
                        position
                        heading
                        rating_list {
                            alt
                            image {
                                childImageSharp {
                                    gatsbyImageData(
                                        layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                        width: 1200
                                        placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                                    )
                                }
                            }
                            rating
                            url
                        }
                    }
                    program_details {
                        position
                        heading
                        background
                        sub_heading
                    }
                    why_4geeks {
                        position
                        heading
                        sub_heading
                        footer {
                            text
                            text_link
                        }
                    }
                    alumni_projects {
                        position
                        heading
                        sub_heading
                    }
                    who_is_hiring {
                        position
                        heading
                        sub_heading
                        featured {
                            name
                            image {
                                childImageSharp {
                                    gatsbyImageData(
                                        layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                        width: 150
                                        placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                                    )
                                    # fluid(maxWidth: 150){
                                    #   ...GatsbyImageSharpFluid_withWebp
                                    # }
                                }
                            }
                            # featured
                        }
                    }
                    choose_your_program {
                        position
                        title
                        paragraph
                        programs {
                            text_link
                            link
                            sub_title
                            title
                            description
                            icon
                        }
                    }

                    why_python {
                        position
                        heading
                        sub_heading
                    }
                    apply_schollarship {
                        imageSide
                        image {
                            childImageSharp {
                                gatsbyImageData(
                                    layout: CONSTRAINED
                                    width: 800
                                    placeholder: NONE
                                    quality: 100
                                )
                            }
                        }
                    }
                    components {
                        name
                        position
                        background
                        proportions
                        layout
                        image {
                            src
                            style
                            link
                        }
                        video
                        height
                        button {
                            text
                            color
                            path
                        }
                        heading {
                            text
                            font_size
                        }
                        sub_heading {
                            text
                            font_size
                        }
                        bullets
                        content {
                            text
                            font_size
                        }
                        columns {
                            size
                            content {
                                text
                                font_size
                            }
                            image {
                                src
                                style
                            }
                        }
                    }
                    header_data {
                        tagline
                        sub_heading
                        image_filter
                        partner_logo_url {
                            childImageSharp {
                                gatsbyImageData(
                                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                    width: 500
                                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                                )
                            }
                        }
                        image {
                            childImageSharp {
                                gatsbyImageData(
                                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                    width: 1000
                                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                                )
                            }
                        }
                        badge {
                            childImageSharp {
                                gatsbyImageData(
                                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                    width: 1000
                                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                                )
                            }
                        }
                    }
                    geeks_vs_others {
                        position
                        heading
                        paragraph
                        sub_heading
                        total_rows
                    }
                    testimonial {
                        position
                        heading
                        sub_heading
                        students {
                            name
                            sub_heading
                            comment
                            video
                        }
                    }
                }
            }
        }
        allCredentialsYaml(filter: { fields: { lang: { eq: $lang } } }) {
            edges {
                node {
                    credentials {
                        title
                        icon
                        value
                    }
                }
            }
        }
        allCourseYaml(
            filter: {
                fields: { file_name: { eq: $utm_course }, lang: { eq: $lang } }
            }
        ) {
            edges {
                node {
                    typical {
                        heading
                        sub_heading
                        schedule {
                            title
                            time
                            icon
                            content
                            step
                        }
                    }
                    alumni {
                        heading
                        sub_heading
                    }
                    details {
                        heading
                        sub_heading
                        left_labels {
                            description
                            projects
                            duration
                            skills
                        }
                        about {
                            title
                            sub_title
                            list {
                                label
                                content
                                link
                                link_text
                                icon
                            }
                        }
                        details_modules {
                            title
                            projects
                            slug
                            module_name
                            duration
                            description
                            step
                        }
                    }
                }
            }
        }
        allTestimonialsYaml(filter: { fields: { lang: { eq: $lang } } }) {
            edges {
                node {
                    testimonials {
                        student_name
                        testimonial_date
                        hidden
                        include_in_marquee
                        student_thumb {
                            childImageSharp {
                                gatsbyImageData(
                                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                    height: 200
                                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                                )
                                # fluid(maxHeight: 200){
                                #   ...GatsbyImageSharpFluid_withWebp
                                # }
                                # fixed(width: 250, height: 250) {
                                #   ...GatsbyImageSharpFixed
                                # }
                            }
                        }
                        content
                        source_url
                        source_url_text
                    }
                }
            }
        }
        allAlumniProjectsYaml(filter: { fields: { lang: { eq: $lang } } }) {
            edges {
                node {
                    header {
                        tagline
                        sub_heading
                    }
                    projects {
                        project_name
                        slug
                        project_image {
                            childImageSharp {
                                gatsbyImageData(
                                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                    width: 800
                                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                                )
                                # fluid(maxWidth: 800){
                                #   ...GatsbyImageSharpFluid_withWebp
                                # }
                            }
                        }
                        project_content
                        project_video
                        live_link
                        github_repo
                        alumni {
                            first_name
                            last_name
                            job_title
                            github
                            linkedin
                            twitter
                        }
                    }
                    button_section {
                        button_text
                        button_link
                    }
                }
            }
        }
        allPartnerYaml(filter: { fields: { lang: { eq: $lang } } }) {
            edges {
                node {
                    partners {
                        tagline
                        sub_heading
                        footer_tagline
                        footer_button
                        footer_link
                        images {
                            name
                            link
                            image {
                                childImageSharp {
                                    gatsbyImageData(
                                        layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                                        width: 150
                                        placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                                    )
                                    # fluid(maxWidth: 150){
                                    #   ...GatsbyImageSharpFluid_withWebp
                                    # }
                                }
                            }
                            featured
                        }
                    }
                }
            }
        }
        allChooseProgramYaml(filter: { fields: { lang: { eq: $lang } } }) {
            edges {
                node {
                    programs {
                        text
                        link
                        bc_slug
                        location_bc_slug
                        schedule
                    }
                }
            }
        }
    }
`;

export default BaseRender(Landing, {
    landingNavbar: true,
    landingFooter: true,
});
