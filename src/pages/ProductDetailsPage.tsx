import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  return <div>Product Details for ID: {id}</div>;
};

export default ProductDetailsPage;