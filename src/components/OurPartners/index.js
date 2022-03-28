import React, {useEffect} from 'react';
import {Div, Grid, GridContainer} from '../Sections'
import {Colors, StyledBackgroundSection} from '../Styling';
import {H2, H3, H4, Title, Paragraph} from '../Heading'
import Link from 'gatsby-link'
import { smartRedirecting } from '../Landing'
import Card from '../Card';
import Fragment from "../Fragment"
import Marquee from '../Marquee';
import { GatsbyImage, getImage } from "gatsby-plugin-image"


// Display centered TITLE + PARAGRAPH
const Title_Paragraph = (props) => {

  return (
    <>
      <GridContainer margin="0 0 20px 0" background={props.background} >

        <Div
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding_tablet="0 4em"
          padding="0 10px"
        >
          {/*<H2 margin="0 0 15px 0" fontSize="15px" lineHeight="19px" fontWeight="900">{title}</H2>*/}
          <H2 
            type="h2"
            fontFamily="Lato"
            fontWeight="900"
            fontSize="15px"
            lineHeight="19px"
            letterSpacing="0.05em"
            color="#3A3A3A"
            width="100%"
            margin="0 0 15px 0"
            textTransform="uppercase"
            style={{fontStyle: "normal"}}
          >
            {props.title}
          </H2>

          {/*<Paragraph>{paragraph}</Paragraph>*/}
          <Paragraph fontFamily="Lato"
            fontWeight="normal"
            fontSize="15px"
            lineHeight="22px"
            padding="0"
            padding_tablet="0 14%"
            letterSpacing="0.05em"
            color="#3A3A3A"
            width="100%"
            margin="0 0 15px 0"
            style={{fontStyle: "normal"}}
          >
            {props.paragraph}
          </Paragraph>

        </Div>

      </GridContainer>
    </>
  )
}


//Images in slider
const Images_With_Slider = (props) => {
  return (
    <>
      <Div className="badge-slider" justifyContent="between" margin="0 0 50px 0" >
        {props.images.map((l, i) => {
          return (
            <GatsbyImage
              key={i}
              style={{height: "80px", minWidth: "120px", margin: "0 15px"}}
              imgStyle={{objectFit: "contain"}}
              alt={l.name}
              image={getImage(l.image.childImageSharp.gatsbyImageData)}
              // fluid={l.image.childImageSharp.fluid}
            />
          )
        })}
      </Div>
    </>
  )
}

//Images in marquee
const Images_With_Marquee = (props) => {
  let imgs = [];
  props.images.map((l, i) => {
    imgs.push(
      <GatsbyImage
        key={i}
        style={{minWidth: "120px", border: 0}}
        height="80px"
        objectFit="contain"
        alt={l.name}
        image={getImage(l.image.childImageSharp.gatsbyImageData)}
        onClick={(e)=>{
          if(l.link) smartRedirecting(e, l.link)
        }}
        // fluid={l.image.childImageSharp.fluid}
      />
    );
  });

  return (
    <Marquee config={{duration: 180, images: imgs, }} />
  )
}


//Funcion que muestra las imagenes en columna y centradas
const Images_Centered = (props) => {
  return (
    <Div
      display="flex"
      flexDirection="row"
      borderRadius="3px"
      style={{flexWrap: "wrap"}}
      // columnGap="70px"
      justifyContent="center"
      background={Colors.white}
      padding="25px 0 0 0"
      margin="0 0 50px 0" >

      {props.images.map((l, i) => {
        return (
          <Div
            key={`${i}-${l.name}`}
            margin="0 20px 40px 20px"
            margin_tablet={`0 ${i >= 4 ? '32px': "42px"} 30px ${i >= 4 ? '32px': "42px"}`}
          >
            <GatsbyImage
              key={i}
              style={{height: "60px", minWidth: "90px"}}
              imgStyle={{objectFit: "contain"}}
              alt={l.name}
              fluid={l.image.childImageSharp.fluid}
              image={getImage(l.image.childImageSharp.gatsbyImageData)}
            />
          </Div>
        )
      })}
    </Div>
  )
}


//Imagenes con propiedad featured==true
const Images_Featured = (props) => {
  const imagesFiltered = props.images.filter(f => f.featured === true)
  return (
    <>
      <GridContainer justifyItems="center" style={{justifyItems: 'center'}} justifyContentChild="center" columns_tablet={imagesFiltered.length <= 4 ? imagesFiltered.length : '3'} padding_tablet={props.paddingFeatured || "0"}>
        {(props.featuredImages ? props.featuredImages : imagesFiltered).map((m, i) => {
          return (
            <GatsbyImage
              key={i}
              style={{height: "55px", minWidth: "100px", width: "200px", margin: "23px 15px"}}
              imgStyle={{objectFit: "contain"}}
              alt={m.name}
              image={getImage(m.image.childImageSharp.gatsbyImageData)}
              // fluid={m.image.childImageSharp.fluid}
            />
          )
        })}
        {/* </Div> */}
      </GridContainer>
      {
        !props.withoutLine 
        && <GridContainer>
            <Div height="1px" background={Colors.lightGray} margin="30px 0" margin_tablet="60px 0" />
          </GridContainer>
      }
    </>
  )
}


//Punto de entrada al componente
const OurPartners = ({title, borderBottom, paragraph, margin, padding, paddingFeatured, background, link, showFeatured, featuredImages, images, withoutLine, slider, marquee, ...rest}) => {


  let FragmentStyle = {
    background: background,
    margin: `${margin || "40px 0 0 0"}`,
    padding: `${padding || "75px 0"}`,
    borderBottom: borderBottom,
  }


  //Renderized...
  return (
    <Fragment github="/components/partner" style={FragmentStyle}  >
      {
        title && <Title_Paragraph title={title} paragraph={paragraph} background={background} />
      }
      {
        showFeatured && <Images_Featured images={images} featuredImages={featuredImages} withoutLine={withoutLine} paddingFeatured={paddingFeatured} />
      }
      {
        slider ?
          <Images_With_Slider images={images} />
          :
          marquee ?
            <Images_With_Marquee images={images} />
            :
            <Images_Centered images={images} />
      }
      {
        link &&
        <Div gridArea_md="2/3/2/11" justifyContent="center" margin="50px 0 0 0">
          <Link to={rest.props.footer_link}><Paragraph color={Colors.blue}>{rest.props.footer_button}</Paragraph></Link>
        </Div>
      }
    </Fragment>
  )
};

export default OurPartners;