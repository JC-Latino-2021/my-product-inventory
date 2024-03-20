import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { ProductType } from "../types/product";
import styled from "styled-components";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
//import './ProductCard.css'

const Wrapper = styled.div`
  &:hover .Button-Styling {
    background-color: #111E90;
    color: #FFFFFF;
  }
  &:hover .Button-Styling-2 {
    background-color: #efefef;
    color: #000000;
    border: 2px solid red;
  }
`;

const handleAddRemoveFavourite = (event: React.MouseEvent) => {
  const id = event.currentTarget.getAttribute("id");
  const favouriteList = localStorage.getItem("favourite");
  const favouriteListJSON: string[] = favouriteList
    ? JSON.parse(favouriteList)
    : null;
  if (id && !favouriteListJSON) {
    localStorage.setItem("favourite", JSON.stringify([id]));
  } else if (id && favouriteListJSON) {
    if (favouriteListJSON.includes(id)) {
      favouriteListJSON.splice(favouriteListJSON.indexOf(id), 1);
      localStorage.setItem("favourite", JSON.stringify(favouriteListJSON));
      event.currentTarget.textContent = "Add to favourites";
    } else {
      favouriteListJSON.push(id);
      localStorage.setItem("favourite", JSON.stringify(favouriteListJSON));
      event.currentTarget.textContent = "Remove from favourites";
    }
  }
  location.reload();
};

const ProductCard = ({ id, title, price, description, image, category }: ProductType) => {
  return (
    <Card sx={{ maxWidth: 330, margin: '50px 16px 0px 16px', height: '660px', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}>
      <CardMedia sx={{ height: 200 }} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={({ height:'60px', whitespace: 'no-wrap', textoverflow: 'ellipsis', overflow: 'hidden', fontFamily:'Open Sans', fontSize: '22px', fontweight:'700', textAlign:'center' })}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={({ height:'90px', whitespace: 'no-wrap', textoverflow: 'ellipsis', overflow: 'hidden', fontFamily:'Open Sans', fontSize: '16px', lineHeight: '22px' })}>
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={({ fontFamily:'Open Sans', fontSize: '30px', lineHeight: '36px', fontWeight: 700, color:'#dc1f06', width: '100%', textAlign:'center', padding: '0% 30%', margin: '15px 0px 5px 0px' })}>
          ${price}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={({ fontFamily:'Open Sans', fontSize: '20px', lineHeight: '22px', fontWeight: '600', width: '100%', textAlign:'center', padding: '0% 25%' })}>
          {category}
        </Typography>
      </CardContent>
      <CardActions sx={({ width: '160px', textAlign:'center', margin: '0px 75px' })}>
        <Wrapper>
          <Button className="Button-Styling-2" id={id.toString()} onClick={handleAddRemoveFavourite} sx={({ fontFamily:'Open Sans', fontSize:'13px', lineHeight:'20px', fontWeight:'500', width:'160px', textAlign:'center', padding:'0px', backgroundColor:'white', color:'black', border:'2px solid red' })}>
            {localStorage.getItem("favourite") &&
            JSON.stringify(localStorage.getItem("favourite")).includes(
              id.toString()
            )
              ? <p style={{color:'red', fontWeight:700, fontSize:'15px', margin:'10px 0px'}}> <IoIosHeart size={30} style={{color:'red'}} /><br />Favourites</p>
              : <p style={{margin:'10px 0px'}}><IoIosHeartEmpty size={30} style={{color:'red'}} /><br />Add to Favourites</p>
            }
          </Button>
        </Wrapper>
      </CardActions>
      <CardActions sx={({ width: '160px', textAlign:'center', margin: '0px 75px' })}>
        <Wrapper>
          <Link to={`productDetail/${id}`}>
            <Button className="Button-Styling" size="small" sx={({ fontFamily:'Open Sans', fontSize:'15px', lineHeight:'20px', fontWeight:'600', width:'160px', textAlign:'center', padding:'10px', backgroundColor:'#FE4931', color:'white', marginTop:'15px' })}>View Details</Button>
          </Link>
        </Wrapper>
      </CardActions>
    </Card>
  );
};

export default ProductCard;